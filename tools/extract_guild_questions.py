import hashlib
import json
import re
import zlib
from pathlib import Path

PDF_DIR = Path("src/assets/guild_exam_info")
OUT_FILE = Path("src/data/guildExtractedQuestions.ts")

QUESTION_START_PATTERN = re.compile(r"^(?:q(?:uestion)?\s*)?(\d{1,3})[).:]\s*(.+)$", re.I)
QUESTION_NUMBER_ONLY_PATTERN = re.compile(r"^(?:q(?:uestion)?\s*)?(\d{1,3})[).:]$", re.I)
OPTION_START_PATTERN = re.compile(r"^([a-d])[).:]\s*(.+)$", re.I)
OPTION_LABEL_ONLY_PATTERN = re.compile(r"^([a-d])[).:]?$", re.I)
TEXT_BLOCK_PATTERN = re.compile(r"BT(.*?)ET", re.S)


def decode_pdf_literal(payload: str) -> str:
    raw = payload.encode("latin1", errors="ignore")
    output = bytearray()
    index = 0

    while index < len(raw):
        value = raw[index]
        if value != 92:
            output.append(value)
            index += 1
            continue

        index += 1
        if index >= len(raw):
            break
        escape = raw[index]

        if escape == ord("n"):
            output.extend(b"\n")
            index += 1
        elif escape == ord("r"):
            output.extend(b"\r")
            index += 1
        elif escape == ord("t"):
            output.extend(b"\t")
            index += 1
        elif escape == ord("b"):
            output.extend(b"\b")
            index += 1
        elif escape == ord("f"):
            output.extend(b"\f")
            index += 1
        elif escape in (ord("("), ord(")"), ord("\\")):
            output.append(escape)
            index += 1
        elif 48 <= escape <= 55:
            digits = [escape]
            index += 1
            for _ in range(2):
                if index < len(raw) and 48 <= raw[index] <= 55:
                    digits.append(raw[index])
                    index += 1
                else:
                    break
            output.append(int(bytes(digits), 8))
        else:
            output.append(escape)
            index += 1

    return output.decode("latin1", errors="ignore")


def _noise_score(value: str) -> int:
    return value.count("Ã") + value.count("Â") + value.count("â") + value.count("�")


def fix_mojibake(value: str) -> str:
    if not any(marker in value for marker in ("Ã", "Â", "â", "�")):
        return value
    try:
        repaired = value.encode("latin1", errors="ignore").decode("utf-8", errors="ignore")
    except Exception:
        return value
    if repaired and _noise_score(repaired) < _noise_score(value):
        return repaired
    return value


def normalize_line(value: str) -> str:
    value = fix_mojibake(value)
    value = " ".join(value.replace("\u00a0", " ").split())
    return value.strip()


def classify_beverages(text: str):
    lowered = text.lower()
    beverages = set()
    if re.search(r"\b(beer|ale|lager|stout|pilsner|bock|ipa|sake)\b", lowered):
        beverages.add("beer")
    if re.search(r"\b(spirit|spirits|vodka|rum|brandy|tequila|whisk(?:e)?y|gin|cognac|armagnac|mezcal|liqueur)\b", lowered):
        beverages.add("spirits")
    if re.search(r"\b(coffee|espresso|arabica|robusta)\b", lowered):
        beverages.add("coffee")
    if re.search(r"\b(tea|oolong|sencha|matcha|darjeeling|assam)\b", lowered):
        beverages.add("tea")
    if re.search(r"\b(grape|variety|fruit|berry|citrus|orchard|tropical)\b", lowered):
        beverages.add("fruit")
    if re.search(r"\b(wine|chardonnay|riesling|pinot|cabernet|merlot|syrah|champagne|rioja|bordeaux|burgundy|aop|doc|docg|ava|dop)\b", lowered):
        beverages.add("wine")
    if not beverages:
        beverages.add("wine")
    return sorted(beverages)


def classify_standard(text: str):
    lowered = text.lower()
    if re.search(r"\b(pair|food|meat|cheese|fatty|dish)\b", lowered):
        return "Pairing"
    if re.search(r"\b(corked|fault|volatile|taint|vinegar|nail polish|must|defect)\b", lowered):
        return "Quality"
    if re.search(r"\b(serve|service|decanter|bottle|guest|table|temperature|underliner|glass)\b", lowered):
        return "Service"
    if re.search(r"\b(aroma|flavor|acidity|tannin|body|finish|rich|texture|color)\b", lowered):
        return "Sensory"
    if re.search(r"\b(fermentation|climate|grape|variety|vineyard|aging|method|production|region|aop|doc|ava|dop|closure|distill)\b", lowered):
        return "Production"
    return "Foundations"


def extract_answer_key(lines):
    answer_map = {}
    answer_start = None
    for index, line in enumerate(lines):
        if "answer key" in line.lower():
            answer_start = index + 1
            break
    if answer_start is None:
        return answer_map

    index = answer_start
    while index < len(lines):
        line = normalize_line(lines[index]).upper()
        combo_match = re.match(r"^(\d{1,3})[).:]?\s*([A-D])$", line)
        if combo_match:
            answer_map[int(combo_match.group(1))] = combo_match.group(2)
            index += 1
            continue

        number_match = re.match(r"^(\d{1,3})[).:]$", line)
        if number_match and index + 1 < len(lines):
            maybe_answer = normalize_line(lines[index + 1]).upper()
            if re.match(r"^[A-D]$", maybe_answer):
                answer_map[int(number_match.group(1))] = maybe_answer
                index += 2
                continue

        index += 1

    return answer_map


def read_pdf_literal(text: str, start: int):
    if start >= len(text) or text[start] != "(":
        return None, start
    index = start + 1
    escaped = False
    depth = 1
    payload = []
    while index < len(text):
        char = text[index]
        if escaped:
            payload.append(char)
            escaped = False
            index += 1
            continue
        if char == "\\":
            payload.append(char)
            escaped = True
            index += 1
            continue
        if char == "(":
            depth += 1
            payload.append(char)
            index += 1
            continue
        if char == ")":
            depth -= 1
            if depth == 0:
                return "".join(payload), index + 1
            payload.append(char)
            index += 1
            continue
        payload.append(char)
        index += 1
    return None, start + 1


def parse_text_block(block: str):
    rows = []
    index = 0
    length = len(block)

    while index < length:
        char = block[index]

        if char == "(":
            payload, end = read_pdf_literal(block, index)
            if payload is None:
                index += 1
                continue
            probe = end
            while probe < length and block[probe].isspace():
                probe += 1
            if block.startswith("Tj", probe):
                rows.append(decode_pdf_literal(payload))
                index = probe + 2
            else:
                index = end
            continue

        if char == "[":
            fragments = []
            cursor = index + 1
            while cursor < length:
                inner = block[cursor]
                if inner == "(":
                    payload, end = read_pdf_literal(block, cursor)
                    if payload is None:
                        cursor += 1
                        continue
                    fragments.append(decode_pdf_literal(payload))
                    cursor = end
                    continue
                if inner == "]":
                    probe = cursor + 1
                    while probe < length and block[probe].isspace():
                        probe += 1
                    if block.startswith("TJ", probe) and fragments:
                        rows.append("".join(fragments))
                        index = probe + 2
                    else:
                        index = cursor + 1
                    break
                cursor += 1
            else:
                index += 1
            continue

        index += 1

    return [normalize_line(row) for row in rows if normalize_line(row)]


def extract_rows(raw: bytes):
    rows = []
    for match in re.finditer(rb"stream\r?\n", raw):
        start = match.end()
        end = raw.find(b"endstream", start)
        if end < 0:
            continue
        stream = raw[start:end].rstrip(b"\r\n")
        try:
            data = zlib.decompress(stream)
        except Exception:
            continue
        if b"BT" not in data:
            continue
        text = data.decode("latin1", errors="ignore")
        for block_match in TEXT_BLOCK_PATTERN.finditer(text):
            rows.extend(parse_text_block(block_match.group(1)))
    return rows


def stable_key(value: str):
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def slugify(value: str):
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "guild-source"


def normalize_path(path: Path):
    return str(path).replace("\\", "/")


def source_category_for_file(source_file: Path):
    relative = source_file.relative_to(PDF_DIR)
    if len(relative.parts) > 1:
        return relative.parts[0]
    return "General"


def build_questions(lines, source_file: Path, answer_key):
    rows = []
    current = None
    active_option_index = None
    next_implicit_number = 1

    def finalize_current():
        if current and len(current["options"]) >= 2:
            rows.append(current)

    index = 0
    while index < len(lines):
        line = lines[index]
        lowered_line = line.lower()
        if (
            "answer key" in lowered_line
            or "introductory sommelier course practice examination" in lowered_line
            or lowered_line.startswith("last name:")
            or lowered_line.startswith("first name:")
        ):
            index += 1
            continue
        if re.match(r"^\d{1,2}$", line):
            index += 1
            continue

        question_match = QUESTION_START_PATTERN.match(line)
        if question_match:
            finalize_current()
            source_number = int(question_match.group(1))
            next_implicit_number = max(next_implicit_number, source_number + 1)
            current = {
                "number": source_number,
                "question": question_match.group(2).strip(),
                "options": [],
            }
            active_option_index = None
            index += 1
            continue

        number_only_match = QUESTION_NUMBER_ONLY_PATTERN.match(line)
        if number_only_match:
            finalize_current()
            source_number = int(number_only_match.group(1))
            next_implicit_number = max(next_implicit_number, source_number + 1)
            current = {
                "number": source_number,
                "question": "",
                "options": [],
            }
            active_option_index = None
            index += 1
            continue

        option_match = OPTION_START_PATTERN.match(line)
        if option_match and current is not None:
            current["options"].append(option_match.group(2).strip())
            active_option_index = len(current["options"]) - 1
            index += 1
            continue

        option_label_only_match = OPTION_LABEL_ONLY_PATTERN.match(line)
        if option_label_only_match and current is not None:
            current["options"].append("")
            active_option_index = len(current["options"]) - 1
            index += 1
            continue

        implicit_question = (
            line.endswith("?")
            and index + 1 < len(lines)
            and OPTION_START_PATTERN.match(lines[index + 1]) is not None
        )
        if implicit_question:
            finalize_current()
            current = {
                "number": next_implicit_number,
                "question": line,
                "options": [],
            }
            active_option_index = None
            next_implicit_number += 1
            index += 1
            continue

        if current is None:
            index += 1
            continue

        if active_option_index is not None and active_option_index < len(current["options"]):
            if current["options"][active_option_index]:
                if len(current["options"][active_option_index]) < 260:
                    current["options"][active_option_index] = f"{current['options'][active_option_index]} {line}".strip()
            else:
                current["options"][active_option_index] = line
        elif current["options"]:
            if len(current["options"][-1]) < 260:
                current["options"][-1] = f"{current['options'][-1]} {line}".strip()
        else:
            if not current["question"]:
                current["question"] = line
            elif len(current["question"]) < 650:
                current["question"] = f"{current['question']} {line}".strip()

        index += 1

    finalize_current()

    source_slug = slugify(source_file.stem)
    cleaned = []
    seen_in_file = set()
    id_counts = {}

    for row in rows:
        stem = normalize_line(re.split(r"\s+(?:q(?:uestion)?\s*)?\d{1,3}[).:]\s+", row["question"], flags=re.I)[0].strip())
        if len(stem) < 8:
            continue
        if len(stem) > 280:
            continue
        options = [normalize_line(re.split(r"\s+[a-d][).:]\s+", option, flags=re.I)[0].strip()) for option in row["options"]]
        options = [option for option in options if option]
        options = list(dict.fromkeys(options))[:4]
        if len(options) < 2:
            continue
        if any(len(option) > 170 for option in options):
            continue
        question_like = ("?" in stem) or ("___" in stem) or re.search(r"^(which|what|where|when|who|why|how)\b", stem.lower())
        if not question_like:
            continue

        dedupe_key = stable_key(f"{stem}|{'|'.join(options)}")
        if dedupe_key in seen_in_file:
            continue
        seen_in_file.add(dedupe_key)

        full_text = f"{stem} {' '.join(options)}"
        stem_hash = hashlib.sha1(stem.encode("utf-8")).hexdigest()[:10]
        base_id = f"{source_slug}-{row['number']}-{stem_hash}"
        suffix_count = id_counts.get(base_id, 0) + 1
        id_counts[base_id] = suffix_count
        row_id = base_id if suffix_count == 1 else f"{base_id}-{suffix_count}"

        correct_option_index = None
        if row["number"] in answer_key:
            candidate = ord(answer_key[row["number"]]) - ord("A")
            if 0 <= candidate < len(options):
                correct_option_index = candidate

        cleaned.append(
            {
                "id": row_id,
                "sourceFile": normalize_path(source_file),
                "sourceCategory": source_category_for_file(source_file),
                "sourceNumber": row["number"],
                "question": stem,
                "options": options,
                "correctOptionIndex": correct_option_index,
                "beverages": classify_beverages(full_text),
                "standard": classify_standard(full_text),
            }
        )
    return cleaned


def dedupe_global(questions):
    seen = set()
    unique = []
    for row in questions:
        key = stable_key(f"{row['question']}|{'|'.join(row['options'])}")
        if key in seen:
            continue
        seen.add(key)
        unique.append(row)
    return unique


def main():
    source_pdfs = sorted(PDF_DIR.rglob("*.pdf"), key=lambda path: normalize_path(path).lower())
    if not source_pdfs:
        raise SystemExit(f"No PDF sources found in {PDF_DIR}")

    all_questions = []
    for source_pdf in source_pdfs:
        lines = extract_rows(source_pdf.read_bytes())
        answer_key = extract_answer_key(lines)
        extracted = build_questions(lines, source_pdf, answer_key)
        all_questions.extend(extracted)
        print(
            f"{source_pdf.name}: parsed {len(lines)} text rows, extracted {len(extracted)} questions, answer key entries {len(answer_key)}"
        )

    questions = dedupe_global(all_questions)
    questions.sort(key=lambda row: (row["sourceFile"], row["sourceNumber"], row["id"]))
    source_catalog = [
        {
            "sourceFile": normalize_path(path),
            "sourceCategory": source_category_for_file(path),
        }
        for path in source_pdfs
    ]

    with OUT_FILE.open("w", encoding="utf-8", newline="\n") as output:
        output.write("export type ExtractedGuildQuestion = {\n")
        output.write(
            "  id: string;\n  sourceFile: string;\n  sourceCategory: string;\n  sourceNumber: number;\n  question: string;\n  options: string[];\n"
        )
        output.write("  correctOptionIndex: number | null;\n")
        output.write('  beverages: Array<"wine" | "beer" | "spirits" | "coffee" | "tea" | "fruit">;\n')
        output.write('  standard: "Foundations" | "Production" | "Sensory" | "Service" | "Pairing" | "Quality";\n};\n\n')
        output.write("export type GuildReferenceCatalogEntry = {\n")
        output.write("  sourceFile: string;\n  sourceCategory: string;\n};\n\n")
        output.write("export const guildReferenceCatalog: GuildReferenceCatalogEntry[] = ")
        json.dump(source_catalog, output, ensure_ascii=False, indent=2)
        output.write(";\n\n")
        output.write("export const extractedGuildQuestions: ExtractedGuildQuestion[] = ")
        json.dump(questions, output, ensure_ascii=False, indent=2)
        output.write(";\n")

    print(f"Generated {len(questions)} unique extracted questions into {OUT_FILE}")


if __name__ == "__main__":
    main()
