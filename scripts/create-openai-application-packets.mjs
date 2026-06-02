import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("C:\\codebase\\sip_studies\\me\\applications", "openai-2026-05-27");
const GENERATED_AT = "May 27, 2026";

const contact = {
  name: "Jonathan Yu",
  line: "Las Vegas, NV | JonYu3@gmail.com | 617.637.0668 | SipStudies.com | Sipopedia.com",
  preference: "Remote US preferred; open to San Francisco relocation or hybrid for the right role."
};

const baseProof = [
  "Built Sip Studies as a React, TypeScript, Vite, Supabase, Stripe, and Edge Function platform across learning, tasting, terminology, maps, AI/news, events, and paid access.",
  "Created a 20,000-row Sipopedia terminology pipeline with review metadata, citations, source links, batch IDs, and import-ready structure.",
  "Developed AI/news routing, Daily Sip editorial automation, validation scripts, product documentation, and buyer-facing IP/valuation materials.",
  "Led Wine Walk Wednesdays for AARP Colorado, teaching 50+ active adults through live and recorded virtual wine education across all 50 states.",
  "Earned a Breakthru Beverage Sales Consultant Excellence Award, expanded 3,500+ placements, and increased wine revenue by $2.291M within Lee's Liquor.",
  "Wrote wine-class curriculum, instructed customers, trained staff, managed premium wine sales, and supported cellar design at Total Wine & More."
];

const roleSources = [
  {
    title: "Customer Education, Learning Experience & Curriculum Lead",
    team: "GTM Readiness",
    location: "San Francisco",
    url: "https://openai.com/careers/customer-education-learning-experience-and-curriculum-lead-san-francisco/",
    sourceNotes: [
      "OpenAI describes this role as owning strategy and execution for enterprise learning pathways and curriculum.",
      "The posting emphasizes curriculum writing, assessments, credential structure, AI-assisted course production, analytics, and alignment with Product and Technical Success."
    ]
  },
  {
    title: "AI Deployment Engineer- Codex",
    team: "Technical Success",
    location: "Remote - US",
    url: "https://openai.com/careers/ai-deployment-engineer-codex-remote-us/",
    sourceNotes: [
      "OpenAI describes this role as helping customers adopt coding tools throughout the software development lifecycle.",
      "The posting emphasizes demos, reference implementations, workflow automations, workshops, technical content, customer feedback, and Codex-powered prototyping."
    ]
  },
  {
    title: "AI Success Engineer - US Remote",
    team: "AI Success",
    location: "Remote - US",
    url: "https://openai.com/careers/ai-success-engineer-us-remote-remote-us/",
    sourceNotes: [
      "OpenAI describes this role as the primary post-sales point of contact for important customers.",
      "The posting emphasizes technical relationship ownership, adoption roadmaps, workflow mapping, configuration, KPI definition, value realization, and customer enablement."
    ]
  },
  {
    title: "AI Deployment Manager - Core Ecosystem, EDU",
    team: "Technical Success",
    location: "San Francisco and New York City",
    url: "https://openai.com/careers/ai-deployment-manager-core-ecosystem-edu-san-francisco/",
    sourceNotes: [
      "OpenAI describes this as a specialist post-sales enablement role for educational institutions.",
      "The posting emphasizes AI literacy, campus-wide adoption, live workshops, adoption interventions, enablement assets, playbooks, and product feedback loops."
    ]
  },
  {
    title: "Deployed Product Manager, Codex",
    team: "Codex - Engineering",
    location: "San Francisco",
    url: "https://openai.com/careers/deployed-product-manager-codex-san-francisco/",
    sourceNotes: [
      "OpenAI describes this role as the product counterpart to Deployment Engineers inside strategic customer accounts.",
      "The posting emphasizes product expansion, customer trust, technical blockers, integrations, MCPs, tooling, hands-on unblocking, and technical-founder style product judgment."
    ]
  },
  {
    title: "Product Marketing Manager, Codex",
    team: "Marketing",
    location: "Remote - US with regular travel to San Francisco",
    url: "https://openai.com/careers/product-marketing-manager-codex-remote-us/",
    sourceNotes: [
      "OpenAI describes this role as driving adoption and growth for Codex through developer-facing positioning and launch work.",
      "The posting emphasizes developer workflows, Codex messaging, launch content, technical narratives, sales enablement, developer research, and adoption metrics."
    ]
  }
];

const roles = [
  {
    rank: 1,
    folder: "01_Customer_Education_Learning_Experience_Curriculum_Lead",
    slug: "customer-education-learning-experience-curriculum-lead",
    title: roleSources[0].title,
    team: roleSources[0].team,
    location: roleSources[0].location,
    url: roleSources[0].url,
    headline: "Founder / AI Education Product Builder / Curriculum and Enablement Lead",
    fit: "Best overall qualification match; strongest education, curriculum, assessment, and AI-learning systems fit.",
    resumeSummary:
      "Founder-builder and beverage educator with 10+ years of sales, training, curriculum, and customer-facing education experience. Built Sip Studies and Sipopedia as AI-enabled learning systems with structured content, terminology operations, validation workflows, and multi-format educational assets. Strongest fit for OpenAI Customer Education work that turns AI products into durable skills, repeatable learning pathways, and measurable adoption.",
    strengths: [
      "Designed and shipped modular learning experiences across Sip Academy, Sipopedia, Beverage Quiz, maps, flavor tools, tasting journals, news workflows, and event surfaces.",
      "Built a 20,000-row terminology and learning-content pipeline with review metadata, citations, source links, batch IDs, and import-ready structure.",
      "Created education operations patterns: editorial automation, source review, QA checks, validation scripts, standards, and durable documentation.",
      "Taught live and recorded adult education through AARP Colorado and built customer/staff training materials at Total Wine & More.",
      "Combines practical AI tooling, instructional clarity, product ownership, and measurable field adoption."
    ],
    skills: [
      "Learning pathways and curriculum design",
      "AI-assisted content operations",
      "Assessment, credential, and review structures",
      "Technical writing and plain-language instruction",
      "Customer and staff enablement",
      "Learning analytics and outcome framing",
      "React, TypeScript, Supabase, Stripe, Edge Functions",
      "Workshop facilitation and education program delivery"
    ],
    sipBullets: [
      "Built Sip Studies as a full-stack AI beverage education platform spanning Learn, Taste, and Connect: Sip Academy, Sipopedia, Beverage Quiz, maps, flavor tools, tasting journals, AI/news workflows, and events.",
      "Created a 20,000-row Sipopedia terminology pipeline with review metadata, citation fields, source links, batch IDs, and database-import structure for scalable learning content.",
      "Developed Daily Sip editorial automation, AI/news routing, source review patterns, validation scripts, and product documentation to keep education materials current and auditable.",
      "Designed multimedia learning assets, character-guided education surfaces, maps, infographics, and assessment-style content for non-technical and technical audiences."
    ],
    coverFocus:
      "The role is the cleanest match between my work and OpenAI's needs: building learning pathways, writing curriculum, defining assessments, creating production standards, using AI throughout course work, and measuring whether education changes behavior.",
    planTheme: "AI-native learning pathways, curriculum standards, badging structure, analytics, and scalable course operations.",
    thirty: [
      "Map current Customer Education pathways, learner personas, high-priority product surfaces, and field feedback from Technical Success.",
      "Audit existing course templates, assessments, completion data, and update workflows for consistency and maintenance burden.",
      "Shadow customer education sessions and identify the top five skill gaps blocking enterprise adoption.",
      "Produce one lightweight curriculum improvement: objectives, lesson outline, practice task, quiz, rubric, and QA checklist."
    ],
    sixty: [
      "Build a modular pathway blueprint for one priority audience, from fundamentals through applied workflow practice.",
      "Create a reusable AI-assisted course production kit: prompt patterns, review checklist, example/test-case library, and update cadence.",
      "Pilot assessment and badge criteria that represent practical skill, not passive completion.",
      "Partner with Product and Technical Success to turn field blockers into curriculum backlog items."
    ],
    ninety: [
      "Launch a measurable learning pathway with baseline metrics, completion targets, practice performance, and downstream adoption signals.",
      "Publish standards for course scripts, exercises, rubrics, AI QA, release notes, and maintenance ownership.",
      "Create an operating dashboard for learning quality, freshness, and customer impact.",
      "Document repeatable practices so future pathways can be produced faster without lowering quality."
    ]
  },
  {
    rank: 2,
    folder: "02_AI_Deployment_Engineer_Codex_Remote_US",
    slug: "ai-deployment-engineer-codex-remote-us",
    title: roleSources[1].title,
    team: roleSources[1].team,
    location: roleSources[1].location,
    url: roleSources[1].url,
    headline: "Founder / AI Coding Workflow Builder / Technical Enablement Lead",
    fit: "Best remote-first fit; strongest match for hands-on AI coding workflows, demos, technical workshops, and customer enablement.",
    resumeSummary:
      "Founder-builder with hands-on React, TypeScript, Supabase, Stripe, Edge Function, validation, and AI workflow experience. Built Sip Studies as a production-minded AI education platform and used AI-assisted development practices to move from product ideas to working systems, documentation, and reviewable outputs. Strong fit for Codex deployment work that combines technical prototypes, workshops, customer workflow mapping, and practical adoption guidance.",
    strengths: [
      "Built and iterated a full-stack application with AI/news routing, terminology workflows, paid access, validation scripts, and product documentation.",
      "Uses AI-assisted coding and documentation workflows to turn ambiguous requirements into demos, artifacts, and operational runbooks.",
      "Can translate technical workflow changes into approachable training for non-technical, semi-technical, and technical audiences.",
      "Has customer-facing sales, enablement, and education experience across beverage, retail, distributor, and virtual learning contexts.",
      "Understands adoption as behavior change: workflow mapping, stakeholder trust, enablement, feedback, and measurable value."
    ],
    skills: [
      "AI coding workflows and prototyping",
      "Technical workshops and enablement",
      "React, TypeScript, Vite, Supabase",
      "Edge Functions, Stripe, auth flows",
      "Workflow automation and validation scripts",
      "Technical writing, guides, and runbooks",
      "Customer discovery and adoption roadmaps",
      "Product feedback and field-pattern synthesis"
    ],
    sipBullets: [
      "Built a React/TypeScript, Vite, Supabase, Stripe, and Edge Function workspace across learning, tasting, events, news, terminology, and paid-access product areas.",
      "Developed AI/news routing, Daily Sip automation, terminology workflows, auth/paywall logic, validation scripts, and buyer-facing product materials.",
      "Produced structured runbooks, review artifacts, and validation paths that made product behavior explainable, repeatable, and easier to improve.",
      "Used AI-assisted development workflows to accelerate implementation, troubleshooting, content operations, and artifact generation across the platform."
    ],
    coverFocus:
      "I am most interested in the remote Codex Deployment Engineer role because it blends hands-on building, customer workflow mapping, technical workshops, and practical adoption of AI coding tools.",
    planTheme: "Codex demos, customer SDLC mapping, workflow automations, technical enablement, and product-feedback loops.",
    thirty: [
      "Build fluency in OpenAI's Codex deployment patterns, current customer segmentation, safety guidance, and internal enablement materials.",
      "Shadow customer workshops and note where engineering teams stall: repo setup, review habits, security concerns, context management, or rollout governance.",
      "Create a personal demo library that shows Codex improving a real SDLC task from issue intake to tested pull request.",
      "Draft a reusable customer discovery worksheet for AI coding workflow maturity."
    ],
    sixty: [
      "Lead or co-lead workshops that help engineering teams redesign one narrow workflow with Codex, such as bug triage, test generation, migration support, or docs maintenance.",
      "Ship reference implementations and workflow automation examples that are clear enough for Sales, Solutions, and customer champions to reuse.",
      "Create field notes that separate product gaps, change-management gaps, and customer-environment blockers.",
      "Partner with Product and Applied Engineering on one product-feedback proposal grounded in customer deployment evidence."
    ],
    ninety: [
      "Own a portfolio slice with visible adoption metrics: activated teams, repeat usage, workshop conversion, and production workflow examples.",
      "Publish polished technical guidance or cookbook-style examples from repeated deployment patterns.",
      "Create an account rollout template that ties Codex use cases to governance, security review, developer experience, and measurable engineering impact.",
      "Deliver a quarterly field-pattern memo that helps Codex product teams prioritize high-leverage improvements."
    ]
  },
  {
    rank: 3,
    folder: "03_AI_Success_Engineer_US_Remote",
    slug: "ai-success-engineer-us-remote",
    title: roleSources[2].title,
    team: roleSources[2].team,
    location: roleSources[2].location,
    url: roleSources[2].url,
    headline: "Founder / Technical Customer Enablement Lead / AI Adoption Builder",
    fit: "Strong remote option; good match for adoption, customer enablement, KPI framing, and technical-business translation, with enterprise technical depth as the main stretch.",
    resumeSummary:
      "Customer-facing founder-builder with deep education, sales enablement, product implementation, and workflow adoption experience. Built Sip Studies as an AI-enabled learning and terminology platform while maintaining a decade-long record of customer, supplier, and stakeholder enablement in wine and spirits. Strong fit for AI Success work that requires technical-business translation, adoption planning, workshops, account health, and measurable value realization.",
    strengths: [
      "Combines hands-on technical product building with long-running customer-facing sales and education responsibilities.",
      "Can map ambiguous workflows into structured adoption plans, training materials, metrics, and operating rhythms.",
      "Has quantified business impact: 3,500+ placements and a $2.291M wine revenue lift at Lee's Liquor.",
      "Built platform systems touching auth, paid access, Supabase, Edge Functions, AI/news routing, validation, and documentation.",
      "Experienced at making complex product concepts useful to executives, managers, customers, and learners."
    ],
    skills: [
      "Customer adoption and value realization",
      "Technical enablement and configuration framing",
      "Workflow mapping and use-case validation",
      "Program management and stakeholder coordination",
      "KPI baselines and success metrics",
      "React, TypeScript, Supabase, Stripe, Edge Functions",
      "Executive and field communication",
      "Workshop design and internal enablement"
    ],
    sipBullets: [
      "Built Sip Studies as a full-stack AI education and beverage workflow platform with learning, terminology, journal, map, event, news, and paid-access product areas.",
      "Developed AI/news routing, validation scripts, auth/paywall architecture, and structured terminology operations across 20,000 candidate rows.",
      "Created buyer-facing valuation and IP materials, product documentation, and workflows that explain platform value to technical and non-technical stakeholders.",
      "Translated practical learner and business needs into product surfaces, educational content, and measurable operating artifacts."
    ],
    coverFocus:
      "The AI Success Engineer role matches the way I work: embed with a workflow, understand the real pain, design the adoption path, teach the system, measure the value, and feed product learnings back into the team.",
    planTheme: "Customer adoption roadmaps, technical readiness, account health, KPI baselines, enablement, and expansion signals.",
    thirty: [
      "Learn OpenAI's AI Success playbooks, account-health signals, product surfaces, and escalation paths with Solutions, Product, and Research.",
      "Shadow customer calls to understand recurring blockers in configuration, use-case selection, security review, and executive alignment.",
      "Build a use-case intake template that captures workflow, stakeholders, success metrics, data/security concerns, and first production milestone.",
      "Define a personal account-readiness checklist for adoption velocity, champion coverage, and measurable value."
    ],
    sixty: [
      "Own a small portfolio or workstream and convert customer goals into adoption roadmaps with sequence, milestones, owners, and KPIs.",
      "Facilitate workshops that help customer teams identify high-impact use cases and champion-building motions.",
      "Create value-realization reports that connect baseline, deployment activity, adoption depth, and business outcomes.",
      "Surface technical blockers and field patterns to Product and Solutions Architecture with concise evidence."
    ],
    ninety: [
      "Drive multiple accounts toward production adoption with clear account-health reporting and expansion opportunities.",
      "Standardize repeatable enablement assets for common customer workflows and product configurations.",
      "Deliver a portfolio impact readout covering activation, adoption depth, stakeholder alignment, and measurable value.",
      "Create a feedback loop that turns repeated customer blockers into product proposals, documentation improvements, or services motions."
    ]
  },
  {
    rank: 4,
    folder: "04_AI_Deployment_Manager_Core_Ecosystem_EDU",
    slug: "ai-deployment-manager-core-ecosystem-edu",
    title: roleSources[3].title,
    team: roleSources[3].team,
    location: roleSources[3].location,
    url: roleSources[3].url,
    headline: "AI Education Enablement Lead / Customer Workshop Facilitator / Founder",
    fit: "Excellent education and adoption match; location is hybrid SF/NYC rather than remote.",
    resumeSummary:
      "Educator, founder, and customer-enablement operator with a decade of training, sales, and live workshop experience. Built Sip Studies as an AI-enabled learning platform and led adult education through AARP Colorado while managing customer and supplier adoption in beverage sales. Strong fit for OpenAI EDU deployment work focused on AI literacy, campus adoption, workshops, repeatable enablement, and field feedback.",
    strengths: [
      "Designed education surfaces and learning assets for a full-stack AI-enabled platform.",
      "Led live and recorded virtual education for adults across all 50 states through AARP Colorado.",
      "Built terminology, maps, quizzes, journals, and AI/news workflows that convert domain knowledge into practical learning.",
      "Can facilitate workshops for non-technical, practitioner, and leadership audiences.",
      "Brings field-tested sales enablement, training, and adoption experience from Breakthru and Total Wine."
    ],
    skills: [
      "AI literacy and education adoption",
      "Live workshops and leadership briefings",
      "Instructional design and learning journeys",
      "Enablement assets, playbooks, and best practices",
      "Customer feedback synthesis",
      "Product fluency and practical workflow examples",
      "Cross-functional handoffs",
      "Measurable activation and sustained usage"
    ],
    sipBullets: [
      "Built Sip Studies as an AI beverage learning platform with education, terminology, tasting, map, quiz, news, and event workflows.",
      "Created a 20,000-row Sipopedia terminology pipeline and media-rich learning asset base for scalable education and content review.",
      "Developed Daily Sip automation, AI/news routing, validation scripts, and product workflows that connect content operations to user-facing learning.",
      "Translated domain expertise into accessible, modular learning experiences for students, professionals, and curious consumers."
    ],
    coverFocus:
      "I am drawn to the EDU Deployment Manager role because it sits at the same intersection I have been building toward: AI literacy, practical learning workflows, live enablement, and measurable adoption across an institution.",
    planTheme: "EDU adoption framework, campus AI literacy, workshops, enablement playbooks, activation, and feedback to Product.",
    thirty: [
      "Learn the current EDU customer journey, institution personas, adoption framework, product surfaces, and handoff points with Sales and AI Success.",
      "Shadow onboarding sessions, leadership briefings, and hands-on workshops for faculty, staff, students, and technical teams.",
      "Document repeated adoption blockers across teaching, learning, research, operations, IT, and instructional design.",
      "Draft a workshop map that links audience, learning objective, product capability, practice activity, and measurable next action."
    ],
    sixty: [
      "Co-lead or lead enablement sessions for one product area, adjusting examples for faculty, staff, and technical audiences.",
      "Build reusable workshop decks, facilitation notes, prompt/practice examples, and post-session activation checklists.",
      "Create a campus adoption scorecard that tracks activation, breadth, depth, champion coverage, and use-case progression.",
      "Synthesize field feedback into product and program insights with clear evidence from sessions."
    ],
    ninety: [
      "Own a repeatable EDU enablement package for a major workflow category, such as course design, staff operations, or research support.",
      "Deliver measurable adoption outcomes across onboarding, advanced training, and sustained usage.",
      "Publish an internal playbook of common EDU patterns, objections, demos, and facilitation moves.",
      "Establish a feedback rhythm with Product, Sales, AI Success, and Solutions to improve both product and deployment quality."
    ]
  },
  {
    rank: 5,
    folder: "05_Deployed_Product_Manager_Codex",
    slug: "deployed-product-manager-codex",
    title: roleSources[4].title,
    team: roleSources[4].team,
    location: roleSources[4].location,
    url: roleSources[4].url,
    headline: "Technical Founder / AI Product Builder / Customer Strategy Operator",
    fit: "Strong founder/product stretch; best if positioning around technical founder execution, customer strategy, hands-on unblocking, and product judgment.",
    resumeSummary:
      "Technical founder and product builder who turns ambiguous customer, education, and workflow needs into working systems, documentation, and measurable outcomes. Built Sip Studies as an AI-enabled product ecosystem with React, TypeScript, Supabase, Stripe, Edge Functions, AI/news routing, terminology operations, and paid-access workflows. Strong stretch fit for deployed product work that requires technical fluency, customer trust, product judgment, and hands-on unblocking.",
    strengths: [
      "Operates across product strategy, implementation, documentation, customer education, and business-value framing.",
      "Built a multi-surface product ecosystem rather than a single static site, including auth/paywall, AI/news, terminology, maps, journals, and events.",
      "Can translate field signals from sales, training, and users into product opportunities and adoption narratives.",
      "Has buyer-facing and strategic valuation experience around a $4.5M acquisition thesis.",
      "Comfortable moving between technical details, executive framing, and practical customer outcomes."
    ],
    skills: [
      "Technical founder product judgment",
      "Customer workflow discovery",
      "Product strategy and adoption planning",
      "Hands-on implementation and unblocking",
      "React, TypeScript, Supabase, Stripe, Edge Functions",
      "Executive communication and sales enablement",
      "Product feedback synthesis",
      "Ambiguous problem solving and ownership"
    ],
    sipBullets: [
      "Founded and built Sip Studies as a multi-surface AI beverage education product across Learn, Taste, Connect, terminology, maps, AI/news, events, and paid access.",
      "Implemented React/TypeScript, Supabase, Stripe, Edge Function, validation, and content-workflow foundations while iterating on user-facing product needs.",
      "Created buyer-facing valuation/IP materials around a $4.5M strategic acquisition thesis and translated product scope into business value.",
      "Built product documentation, runbooks, and review systems that helped convert ambiguous work into repeatable product decisions."
    ],
    coverFocus:
      "The Deployed Product Manager role appeals to me because it asks for the connective tissue between customer strategy, technical deployment, product judgment, and hands-on unblocking - the same operating mode I use building Sip Studies.",
    planTheme: "Strategic accounts, product expansion, customer blockers, technical workflow unblocking, and Codex feedback to core product teams.",
    thirty: [
      "Learn Codex product strategy, deployment engineering motions, account segmentation, and the most common blockers in strategic customer adoption.",
      "Shadow Deployment Engineers and GTM teams across customer calls to understand executive goals, engineering pain, technical constraints, and expansion openings.",
      "Build a blocker taxonomy separating product gaps, integration issues, security concerns, workflow design, and change-management friction.",
      "Create one lightweight account map format that ties customer goals to product surfaces, deployment path, and next best unblock."
    ],
    sixty: [
      "Partner on strategic accounts to identify deeper Codex deployment opportunities across teams, workflows, and integrations.",
      "Drive one hands-on unblock with a demo, prototype, MCP/tooling pattern, or workflow design that helps a customer move forward.",
      "Translate repeated customer blockers into clear product feedback and prioritization candidates.",
      "Create a shared account-growth artifact for Deployment Engineering, Product, Sales, and GTM alignment."
    ],
    ninety: [
      "Own product-side execution for a strategic deployment motion, including expansion thesis, stakeholder plan, blocker log, and product-feedback path.",
      "Deliver a field-informed product opportunity memo that turns account evidence into roadmap insight.",
      "Package a repeatable deployment play for a common Codex expansion path.",
      "Become a trusted internal partner who can move between customer rooms, product decisions, technical details, and execution follow-through."
    ]
  },
  {
    rank: 6,
    folder: "06_Product_Marketing_Manager_Codex_Stretch_Remote",
    slug: "product-marketing-manager-codex-stretch-remote",
    title: roleSources[5].title,
    team: roleSources[5].team,
    location: roleSources[5].location,
    url: roleSources[5].url,
    headline: "AI Product Storyteller / Technical Content and GTM Enablement Builder",
    fit: "Remote stretch option; credible on technical narratives and adoption content, but the 14+ years developer-marketing requirement is the main gap.",
    resumeSummary:
      "Founder-builder and technical communicator with hands-on AI product development, education, sales enablement, and content operations experience. Built Sip Studies as a full-stack AI-enabled product and created documentation, editorial automation, terminology systems, buyer materials, and training content. Stretch fit for Codex product marketing where the strongest angle is developer-workflow storytelling, technical demos, launch/enablement content, and adoption narratives.",
    strengths: [
      "Built and explained technical product systems across AI/news routing, content operations, terminology, auth/paywall, and learning workflows.",
      "Can convert complex domain workflows into clear messaging, guides, demos, and enablement materials.",
      "Has practical sales enablement experience from Breakthru and Total Wine, plus education content experience through AARP and Sip Studies.",
      "Understands how users discover, evaluate, learn, and repeatedly use tools when behavior change is required.",
      "Can position AI coding workflows from a builder's perspective, while acknowledging this is a stretch compared with formal developer-marketing requirements."
    ],
    skills: [
      "Technical content and narrative development",
      "Product positioning and adoption storytelling",
      "Sales and GTM enablement materials",
      "Developer-workflow research and demo framing",
      "Launch content and product education",
      "AI coding workflow literacy",
      "Customer voice and feedback synthesis",
      "Campaign impact and adoption metrics"
    ],
    sipBullets: [
      "Built Sip Studies as a full-stack AI education product with learning, terminology, maps, AI/news, journals, events, and paid-access surfaces.",
      "Created product documentation, Daily Sip editorial automation, terminology review systems, buyer-facing IP materials, and product narratives for multiple audiences.",
      "Developed AI-assisted content workflows and validation patterns that made technical product behavior easier to explain and maintain.",
      "Translated sales, education, and product signals into clearer user-facing experiences, training materials, and strategic positioning."
    ],
    coverFocus:
      "This is a stretch role, but I would position myself around practical builder credibility, Codex workflow storytelling, sales enablement, and the ability to translate technical work into adoption-focused narratives.",
    planTheme: "Codex positioning, developer workflow narratives, launch assets, sales enablement, and adoption measurement.",
    thirty: [
      "Learn current Codex positioning, launch history, developer segments, adoption metrics, competitive landscape, and Sales/Developer Experience needs.",
      "Review demos, docs, landing pages, sales materials, customer calls, and community feedback for friction in the adoption story.",
      "Map core developer workflows where Codex has a clear value story: code understanding, issue-to-PR, test generation, migration, review, and docs maintenance.",
      "Draft one concise messaging matrix linking audience, pain, workflow, proof, demo, and next action."
    ],
    sixty: [
      "Create a technical narrative package for one high-priority Codex use case: blog outline, demo script, landing-page angle, sales talk track, and FAQ.",
      "Partner with Developer Experience and Product to refine examples so they feel credible to hands-on engineers.",
      "Build a competitive-positioning brief focused on workflow reality rather than feature checklists.",
      "Define measurement for the package: developer engagement, trial activation, sales usage, and follow-on adoption."
    ],
    ninety: [
      "Ship a polished campaign or launch-support package for a Codex capability or use-case cluster.",
      "Create a reusable sales-enablement kit that helps GTM teams explain Codex in real developer workflows.",
      "Turn developer and customer feedback into a product-marketing insights memo for Product and Growth.",
      "Establish a repeatable rhythm for testing messaging against adoption, usage, and developer trust signals."
    ]
  }
];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function safeName(value) {
  return value
    .replace(/[^A-Za-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");
}

function wrapText(value, max) {
  const words = String(value).split(/\s+/).filter(Boolean);
  const lines = [];
  let line = "";
  for (const word of words) {
    if (word.length > max) {
      if (line) {
        lines.push(line);
        line = "";
      }
      for (let i = 0; i < word.length; i += max) lines.push(word.slice(i, i + max));
      continue;
    }
    const next = line ? `${line} ${word}` : word;
    if (next.length > max && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function mdList(items) {
  return items.map((x) => `- ${x}`).join("\n");
}

function resumeMarkdown(role) {
  return `# ${contact.name}

Target Role: ${role.title}
${role.headline}
${contact.line}
${contact.preference}

## Target Summary
${role.resumeSummary}

## Role-Aligned Strengths
${mdList(role.strengths)}

## Technical, Product, and Enablement Skills
${mdList(role.skills)}

## Experience

### Sip Studies - Founder, Product Lead, AI Education Platform Builder
2024 - Present
${mdList(role.sipBullets)}

### Breakthru Beverage Group - Sales Consultant - Off & On Premise Wine
Sep 2015 - Present
- Grew fine-wine placements, revived unsold SKUs, maintained supplier relationships, and applied independent-account sales discipline across grocery and on-premise opportunities.
- Earned 2018 Sales Consultant Excellence Award; expanded 3,500+ placements and increased wine revenue by $2.291M within Lee's Liquor.
- Built brand knowledge and portfolio adoption with colleagues and customers through education, merchandising, portfolio management, and account support.

### AARP Colorado - Wine Educator
Aug 2020 - 2024
- Led Wine Walk Wednesdays regional wine education for 50+ active adults across live and recorded streams, predominantly viewed in Colorado and spanning all 50 states.
- Taught region, terroir, grapes, styles, architecture, history, culture, and geography in an accessible virtual-learning format.

### Total Wine & More - Wine Associate
Sep 2013 - Sep 2015
- Managed high-end customer wine sales, portfolios, cellar design support, customer events, and premium cellar presentation.
- Wrote wine-class curriculum, instructed customers, tracked P&L, and trained staff on product knowledge, service, and sales execution.

### Architecture, Design & Drafting Foundation - Architectural Intern / Draftsman / AutoCAD Consultant
2008 - 2013
- Produced field investigations, as-builts, construction documents, reflected ceiling plans, signage drawings, 3D models, websites, marketing, interiors, and renovation documentation.
- Built a design foundation in structured problem solving, visual systems, technical documentation, and stakeholder communication.

## Education and Credentials
- Wentworth Institute of Technology - Bachelor of Science, Architecture
- MIT - AI: Implications for Business Strategy
- Society of Wine Educators - Certified Wine Educator and Certified Specialist of Spirits
- Court of Master Sommeliers - Certified Sommelier L2
- WSET - Level 3 Wine; WSET - Level 2 Spirits
- Wine Scholar Guild / Lustau - Certified Sherry Wine Specialist
- Cicerone - Certified Beer Server L1

## Selected Proof Points
${mdList(baseProof)}
`;
}

function coverLetterMarkdown(role) {
  const remoteLine = role.location.includes("Remote")
    ? "I am based in Las Vegas and prefer a Remote US role, with regular travel to San Francisco when useful."
    : "I am based in Las Vegas and open to relocating to San Francisco for the right role.";
  return `# ${contact.name} - Cover Letter

${GENERATED_AT}

OpenAI Hiring Team

Re: ${role.title}

Dear OpenAI Hiring Team,

I am applying for the ${role.title} role. ${remoteLine}

${role.coverFocus}

My strongest evidence is the work behind Sip Studies and Sipopedia. I built a React, TypeScript, Vite, Supabase, Stripe, and Edge Function platform across learning, tasting, maps, terminology, AI/news workflows, events, and paid access. I also created a 20,000-row Sipopedia terminology pipeline with citation, review, and source metadata, plus automation and validation patterns that make the system easier to maintain. That work is directly relevant to teams that need clear learning paths, practical demos, adoption programs, technical writing, and customer-facing enablement.

Before Sip Studies, I built more than a decade of customer-facing sales and education experience. At Breakthru Beverage Group, I expanded 3,500+ placements and contributed to a $2.291M wine revenue lift within Lee's Liquor. At AARP Colorado, I led live and recorded virtual education for adults across all 50 states. At Total Wine & More, I wrote curriculum, taught customers, and trained staff. That background matters because AI adoption is not only a technical problem. It requires trust, clear examples, stakeholder alignment, and a path from first use to durable behavior change.

I would bring OpenAI a practical builder's mindset: understand the workflow, build the example, teach the pattern, measure whether it works, and feed the learning back into the product or program. I am comfortable moving between hands-on product detail, customer enablement, executive framing, and careful documentation.

Thank you for considering my application. I would welcome the chance to discuss how my AI education platform work, customer enablement background, and hands-on product building can support OpenAI's deployment and adoption goals.

Sincerely,

${contact.name}
${contact.line}
`;
}

function planMarkdown(role) {
  return `# ${contact.name} - 30-60-90 Plan

Target Role: ${role.title}
Team: ${role.team}
Location: ${role.location}

## Operating Thesis
${role.planTheme}

The first 90 days should prove three things: fast product fluency, useful customer or learner empathy, and one repeatable operating asset that improves adoption beyond a single account or course.

## First 30 Days - Learn, Map, and Ship a Small Useful Artifact
${mdList(role.thirty)}

## Days 31-60 - Pilot, Package, and Measure
${mdList(role.sixty)}

## Days 61-90 - Scale the Pattern
${mdList(role.ninety)}

## How I Would Measure Early Success
- I can clearly explain the role's priority product surfaces, customer or learner personas, adoption blockers, and internal handoff model.
- I have shipped at least one artifact the team can reuse: a demo, template, pathway, checklist, playbook, messaging matrix, or account plan.
- My work produces evidence: workshop feedback, adoption movement, content quality improvement, product feedback, or clearer stakeholder alignment.
- I have built trust with the immediate team by being useful, precise, and willing to do the hands-on work.

## Source Posting
${role.url}
`;
}

function resultsMarkdown() {
  const lines = [
    "# OpenAI Application Target Results",
    "",
    `Prepared for: ${contact.name}`,
    `Prepared: ${GENERATED_AT}`,
    contact.line,
    "",
    "## Recommendation",
    "Best overall fit: Customer Education, Learning Experience & Curriculum Lead.",
    "Best remote-first fit: AI Deployment Engineer- Codex.",
    "",
    "The application packets below preserve both paths: the strongest qualification match if San Francisco relocation is acceptable, and the strongest remote-first route if location flexibility is limited.",
    "",
    "## Ranked Application Targets"
  ];
  for (const role of roles) {
    lines.push(
      "",
      `### ${role.rank}. ${role.title}`,
      `Team: ${role.team}`,
      `Location: ${role.location}`,
      `Posting: ${role.url}`,
      "",
      role.fit,
      "",
      "Posting signals:",
      ...roleSources.find((source) => source.title === role.title).sourceNotes.map((x) => `- ${x}`),
      "",
      "Resume alignment:",
      ...role.strengths.slice(0, 4).map((x) => `- ${x}`)
    );
  }
  lines.push(
    "",
    "## Application Folder Contents",
    "Each role folder contains:",
    "- Fine-tuned resume in PDF, DOCX, and Markdown",
    "- Cover letter in PDF, DOCX, and Markdown",
    "- 30-60-90 plan in PDF, DOCX, and Markdown",
    "",
    "## Notes",
    "- The Product Marketing Manager, Codex packet is included as a remote stretch option, but it has the largest formal requirement gap because the posting asks for deep technical product marketing or developer marketing tenure.",
    "- The Customer Education and EDU Deployment Manager packets should emphasize curriculum, live teaching, assessment, credentialing, AI literacy, and adoption operations.",
    "- The AI Deployment Engineer, AI Success Engineer, and Deployed Product Manager packets should emphasize technical workflow mapping, AI-assisted building, product fluency, customer enablement, and measurable adoption."
  );
  return `${lines.join("\n")}\n`;
}

function pdfEsc(value) {
  return String(value).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

const pdfColors = {
  paper: [0.973, 0.957, 0.918],
  ink: [0.078, 0.145, 0.169],
  muted: [0.325, 0.412, 0.435],
  teal: [0.02, 0.192, 0.231],
  teal2: [0.043, 0.267, 0.318],
  gold: [0.769, 0.569, 0.235],
  pale: [0.91, 0.851, 0.722],
  line: [0.713, 0.788, 0.784]
};

function pdfColor(c, op = "rg") {
  return `${c.map((n) => n.toFixed(3)).join(" ")} ${op}`;
}

function parseMarkdown(markdown) {
  return markdown.split(/\r?\n/).map((raw) => {
    const line = raw.trimEnd();
    if (!line.trim()) return { type: "blank", text: "" };
    if (line.startsWith("# ")) return { type: "title", text: line.slice(2).trim() };
    if (line.startsWith("## ")) return { type: "heading", text: line.slice(3).trim() };
    if (line.startsWith("### ")) return { type: "subheading", text: line.slice(4).trim() };
    if (line.startsWith("- ")) return { type: "bullet", text: line.slice(2).trim() };
    return { type: "paragraph", text: line.trim() };
  });
}

function renderPdf(markdown, outputPath) {
  const page = { width: 612, height: 792 };
  const sidebar = 88;
  const contentX = 112;
  const contentRight = 558;
  const bottom = 58;
  const width = contentRight - contentX;
  const pages = [];
  let cmds = [];
  let cursor = 88;
  let pageNumber = 0;

  function startPage() {
    if (cmds.length) pages.push(cmds.join("\n"));
    pageNumber += 1;
    cmds = [];
    rect(0, 0, page.width, page.height, pdfColors.paper);
    rect(0, 0, sidebar, page.height, pdfColors.teal);
    rect(sidebar, 0, 4, page.height, pdfColors.gold);
    drawText("SIP", 18, 36, 14, true, pdfColors.pale);
    drawText("STUDIES", 18, 52, 8.5, true, pdfColors.pale);
    drawText("OPENAI", 18, 88, 8.0, true, pdfColors.gold);
    drawText("APPLICATION", 18, 101, 7.4, false, pdfColors.pale);
    drawText(`PAGE ${pageNumber}`, 18, 730, 7.2, true, pdfColors.pale);
    drawText(contact.name, contentX, 31, 10.2, true, pdfColors.teal);
    drawText("OpenAI application packet", contentX, 47, 8.6, false, pdfColors.muted);
    drawText(contact.line, contentX, 60, 7.5, false, pdfColors.muted);
    rule(contentX, 72, contentRight, 72, pdfColors.gold, 0.9);
    cursor = 88;
  }

  function rect(x, yTop, w, h, fill, stroke = null) {
    const y = page.height - yTop - h;
    cmds.push("q");
    if (fill) cmds.push(pdfColor(fill, "rg"));
    if (stroke) cmds.push(pdfColor(stroke, "RG"));
    cmds.push(`${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re ${fill && stroke ? "B" : fill ? "f" : "S"}`);
    cmds.push("Q");
  }

  function rule(x1, yTop1, x2, yTop2, color, widthValue = 0.65) {
    const y1 = page.height - yTop1;
    const y2 = page.height - yTop2;
    cmds.push("q", pdfColor(color, "RG"), `${widthValue.toFixed(2)} w`, `${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`, "Q");
  }

  function drawText(text, x, yTop, size, bold, color) {
    const y = page.height - yTop - size;
    const font = bold ? "F2" : "F1";
    cmds.push("BT", pdfColor(color || pdfColors.ink, "rg"), `/${font} ${size.toFixed(1)} Tf`, `${x.toFixed(2)} ${y.toFixed(2)} Td`, `(${pdfEsc(text)}) Tj`, "ET");
  }

  function ensureSpace(h) {
    if (cursor + h > page.height - bottom) startPage();
  }

  function addWrapped(text, opts = {}) {
    const size = opts.size || 10;
    const indent = opts.indent || 0;
    const x = contentX + indent;
    const maxChars = Math.max(18, Math.floor((width - indent) / (size * 0.49)));
    const lines = wrapText(text, maxChars);
    const lineHeight = size * (opts.lineGap || 1.24);
    ensureSpace(lines.length * lineHeight + (opts.after || 0));
    for (const line of lines) {
      drawText(line, x, cursor, size, opts.bold, opts.color || pdfColors.ink);
      cursor += lineHeight;
    }
    cursor += opts.after || 0;
  }

  startPage();
  for (const item of parseMarkdown(markdown)) {
    if (item.type === "blank") {
      cursor += 5;
      continue;
    }
    if (item.type === "title") {
      cursor += 8;
      addWrapped(item.text, { size: 20, bold: true, color: pdfColors.teal, lineGap: 1.08, after: 7 });
      continue;
    }
    if (item.type === "heading") {
      cursor += 8;
      ensureSpace(28);
      addWrapped(item.text.toUpperCase(), { size: 11.3, bold: true, color: pdfColors.teal2, lineGap: 1.08, after: 3 });
      rule(contentX, cursor + 2, contentRight, cursor + 2, pdfColors.line, 0.65);
      cursor += 3;
      continue;
    }
    if (item.type === "subheading") {
      cursor += 4;
      addWrapped(item.text, { size: 10.5, bold: true, color: pdfColors.teal, lineGap: 1.12, after: 2 });
      continue;
    }
    if (item.type === "bullet") {
      const size = 9.2;
      const lines = wrapText(item.text, Math.floor((width - 18) / (size * 0.49)));
      const lineHeight = size * 1.22;
      ensureSpace(lines.length * lineHeight + 3);
      drawText("-", contentX + 6, cursor, size, true, pdfColors.gold);
      drawText(lines[0], contentX + 18, cursor, size, false, pdfColors.ink);
      cursor += lineHeight;
      for (const line of lines.slice(1)) {
        drawText(line, contentX + 18, cursor, size, false, pdfColors.ink);
        cursor += lineHeight;
      }
      cursor += 2;
      continue;
    }
    addWrapped(item.text, { size: 9.8, lineGap: 1.26, after: 4 });
  }
  pages.push(cmds.join("\n"));

  const objects = [];
  objects[1] = pdfObj(1, "<< /Type /Catalog /Pages 2 0 R >>");
  const pageIds = [];
  let nextId = 5;
  const contentIds = [];
  for (const pageContent of pages) {
    const contentId = nextId++;
    const pageId = nextId++;
    contentIds.push(contentId);
    pageIds.push(pageId);
    objects[contentId] = pdfStream(contentId, "", `${pageContent}\n`);
    objects[pageId] = pdfObj(pageId, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${page.width} ${page.height}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`);
  }
  objects[2] = pdfObj(2, `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] >>`);
  objects[3] = pdfObj(3, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects[4] = pdfObj(4, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");
  writePdfObjects(outputPath, objects);
}

function pdfObj(id, body) {
  const bodyBuffer = Buffer.isBuffer(body) ? body : Buffer.from(body, "utf8");
  return Buffer.concat([Buffer.from(`${id} 0 obj\n`, "utf8"), bodyBuffer, Buffer.from("\nendobj\n", "utf8")]);
}

function pdfStream(id, dict, dataValue) {
  const dataBuffer = Buffer.isBuffer(dataValue) ? dataValue : Buffer.from(dataValue, "utf8");
  return pdfObj(id, Buffer.concat([Buffer.from(`<< ${dict} /Length ${dataBuffer.length} >>\nstream\n`, "utf8"), dataBuffer, Buffer.from("\nendstream", "utf8")]));
}

function writePdfObjects(outputPath, objects) {
  const header = Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "binary");
  const chunks = [header];
  const offsets = [0];
  let offset = header.length;
  for (let i = 1; i < objects.length; i += 1) {
    offsets[i] = offset;
    chunks.push(objects[i]);
    offset += objects[i].length;
  }
  const xrefOffset = offset;
  const xref = ["xref", `0 ${objects.length}`, "0000000000 65535 f "];
  for (let i = 1; i < objects.length; i += 1) xref.push(`${String(offsets[i]).padStart(10, "0")} 00000 n `);
  chunks.push(Buffer.from(`${xref.join("\n")}\ntrailer\n<< /Size ${objects.length} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`, "utf8"));
  fs.writeFileSync(outputPath, Buffer.concat(chunks));
}

function xmlEsc(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function docPara(value, opts = {}) {
  const style = opts.style ? `<w:pStyle w:val="${opts.style}"/>` : "";
  const bullet = opts.bullet ? '<w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr>' : "";
  const shading = opts.shading ? `<w:shd w:val="clear" w:color="auto" w:fill="${opts.shading}"/>` : "";
  const spacing = opts.after ? `<w:spacing w:after="${opts.after}"/>` : "";
  const bold = opts.bold ? "<w:b/>" : "";
  const color = opts.color ? `<w:color w:val="${opts.color}"/>` : "";
  const size = opts.size ? `<w:sz w:val="${opts.size}"/><w:szCs w:val="${opts.size}"/>` : "";
  return `<w:p><w:pPr>${style}${bullet}${shading}${spacing}</w:pPr><w:r><w:rPr>${bold}${color}${size}</w:rPr><w:t xml:space="preserve">${xmlEsc(value)}</w:t></w:r></w:p>`;
}

function markdownToDocxXml(markdown) {
  const body = [
    docPara("SIP STUDIES | OPENAI APPLICATION PACKET", { bold: true, color: "E8D9B8", size: 17, shading: "05313B", after: 120 }),
    docPara(contact.line, { color: "53696F", size: 16, after: 160 })
  ];
  for (const item of parseMarkdown(markdown)) {
    if (item.type === "blank") {
      body.push("<w:p/>");
    } else if (item.type === "title") {
      body.push(docPara(item.text, { style: "Title" }));
    } else if (item.type === "heading") {
      body.push(docPara(item.text, { style: "Heading1" }));
    } else if (item.type === "subheading") {
      body.push(docPara(item.text, { style: "Heading2" }));
    } else if (item.type === "bullet") {
      body.push(docPara(item.text, { bullet: true }));
    } else {
      body.push(docPara(item.text));
    }
  }
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:background w:color="F8F4EA"/><w:body>${body.join("")}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="720" w:bottom="720" w:left="720" w:header="360" w:footer="360" w:gutter="0"/></w:sectPr></w:body></w:document>`;
}

function contentTypes() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/><Override PartName="/word/numbering.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml"/><Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/><Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/></Types>`;
}

function rootRels() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/><Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/></Relationships>`;
}

function styles() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:style w:type="paragraph" w:default="1" w:styleId="Normal"><w:name w:val="Normal"/><w:rPr><w:rFonts w:ascii="Aptos" w:hAnsi="Aptos"/><w:color w:val="14252B"/><w:sz w:val="20"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Title"><w:name w:val="Title"/><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="8" w:space="6" w:color="C4913C"/></w:pBdr></w:pPr><w:rPr><w:b/><w:color w:val="05313B"/><w:sz w:val="36"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading1"><w:name w:val="Heading 1"/><w:pPr><w:pBdr><w:bottom w:val="single" w:sz="4" w:space="4" w:color="B6C9C8"/></w:pBdr></w:pPr><w:rPr><w:b/><w:color w:val="0B4451"/><w:sz w:val="24"/></w:rPr></w:style><w:style w:type="paragraph" w:styleId="Heading2"><w:name w:val="Heading 2"/><w:rPr><w:b/><w:color w:val="05313B"/><w:sz w:val="22"/></w:rPr></w:style></w:styles>`;
}

function numbering() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:numbering xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:abstractNum w:abstractNumId="0"><w:lvl w:ilvl="0"><w:start w:val="1"/><w:numFmt w:val="bullet"/><w:lvlText w:val="-"/><w:pPr><w:ind w:left="360" w:hanging="180"/></w:pPr></w:lvl></w:abstractNum><w:num w:numId="1"><w:abstractNumId w:val="0"/></w:num></w:numbering>`;
}

function core(title) {
  const stamp = "2026-05-27T00:00:00Z";
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"><dc:title>${xmlEsc(title)}</dc:title><dc:creator>OpenAI Codex</dc:creator><cp:lastModifiedBy>OpenAI Codex</cp:lastModifiedBy><dcterms:created xsi:type="dcterms:W3CDTF">${stamp}</dcterms:created><dcterms:modified xsi:type="dcterms:W3CDTF">${stamp}</dcterms:modified></cp:coreProperties>`;
}

function app() {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"><Application>OpenAI Codex</Application><Company>Sip Studies</Company></Properties>`;
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function u16(v) {
  const b = Buffer.alloc(2);
  b.writeUInt16LE(v);
  return b;
}

function u32(v) {
  const b = Buffer.alloc(4);
  b.writeUInt32LE(v >>> 0);
  return b;
}

function zipStore(files) {
  const local = [];
  const central = [];
  let offset = 0;
  for (const [name, content] of files) {
    const nameBuffer = Buffer.from(name, "utf8");
    const dataBuffer = Buffer.isBuffer(content) ? content : Buffer.from(content, "utf8");
    const crc = crc32(dataBuffer);
    const localHeader = Buffer.concat([u32(0x04034b50), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(dataBuffer.length), u32(dataBuffer.length), u16(nameBuffer.length), u16(0), nameBuffer]);
    local.push(localHeader, dataBuffer);
    central.push(Buffer.concat([u32(0x02014b50), u16(20), u16(20), u16(0), u16(0), u16(0), u16(0), u32(crc), u32(dataBuffer.length), u32(dataBuffer.length), u16(nameBuffer.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBuffer]));
    offset += localHeader.length + dataBuffer.length;
  }
  const cd = Buffer.concat(central);
  return Buffer.concat([...local, cd, Buffer.concat([u32(0x06054b50), u16(0), u16(0), u16(files.length), u16(files.length), u32(cd.length), u32(offset), u16(0)])]);
}

function writeDocx(markdown, outputPath, title) {
  const files = [
    ["[Content_Types].xml", contentTypes()],
    ["_rels/.rels", rootRels()],
    ["docProps/core.xml", core(title)],
    ["docProps/app.xml", app()],
    ["word/document.xml", markdownToDocxXml(markdown)],
    ["word/styles.xml", styles()],
    ["word/numbering.xml", numbering()],
    ["word/_rels/document.xml.rels", `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/numbering" Target="numbering.xml"/></Relationships>`]
  ];
  fs.writeFileSync(outputPath, zipStore(files));
}

function writePacket(markdown, basePath, title, options = {}) {
  fs.writeFileSync(`${basePath}.md`, markdown, "utf8");
  renderPdf(markdown, `${basePath}.pdf`);
  if (!options.pdfOnly) writeDocx(markdown, `${basePath}.docx`, title);
}

function writeReadme() {
  const lines = [
    "# OpenAI Application Packets",
    "",
    `Generated: ${GENERATED_AT}`,
    "",
    `This folder contains application packets based on the OpenAI roles reviewed against ${contact.name}'s current v3 Sip Studies resume.`,
    "",
    "The packet PDFs and Word documents use the Sip Studies resume aesthetic: warm paper, dark teal structure, gold accents, muted metadata, and compact branded typography.",
    "",
    "## Contents",
    "- 00_Results: ranked role-fit summary in PDF and Markdown.",
    "- 01-06 role folders: each includes a tailored resume, cover letter, and 30-60-90 plan in PDF, DOCX, and Markdown.",
    "",
    "## Submit First",
    "1. AI Deployment Engineer- Codex if remote is the priority.",
    "2. Customer Education, Learning Experience & Curriculum Lead if San Francisco relocation is acceptable.",
    "3. AI Success Engineer - US Remote as the broader adoption and customer-success remote option.",
    "",
    "## Source Caveat",
    "These materials are tailored to the official postings checked on the generation date. Re-check OpenAI Careers before submitting because job pages can change."
  ];
  fs.writeFileSync(path.join(ROOT, "README.md"), `${lines.join("\n")}\n`, "utf8");
}

function cleanRoleFolder(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir)) {
    if (/^(Jon|Jonathan)_Yu_.*\.(docx|md|pdf)$/u.test(entry)) {
      fs.rmSync(path.join(dir, entry));
    }
  }
}

ensureDir(ROOT);
ensureDir(path.join(ROOT, "00_Results"));
writePacket(resultsMarkdown(), path.join(ROOT, "00_Results", "OpenAI_Position_Match_Results_2026-05-27"), "OpenAI Position Match Results", { pdfOnly: true });

for (const role of roles) {
  const dir = path.join(ROOT, role.folder);
  ensureDir(dir);
  cleanRoleFolder(dir);
  const prefix = `Jonathan_Yu_${safeName(role.title)}`;
  writePacket(resumeMarkdown(role), path.join(dir, `${prefix}_Resume`), `${contact.name} Resume - ${role.title}`);
  writePacket(coverLetterMarkdown(role), path.join(dir, `${prefix}_Cover_Letter`), `${contact.name} Cover Letter - ${role.title}`);
  writePacket(planMarkdown(role), path.join(dir, `${prefix}_30_60_90_Plan`), `${contact.name} 30-60-90 Plan - ${role.title}`);
}

writeReadme();

console.log(`Wrote OpenAI application packets to ${ROOT}`);
