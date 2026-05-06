# Sipopedia Workflow Runbook (Replit <-> GitHub <-> Local)

This is the exact order of operations to keep everything clean.

## Ground Rules

- Source of truth: `origin/main` on GitHub.
- Use one branch: `main`.
- Before publishing, always sync Replit to `origin/main`.
- If Replit says branches diverged, use the reset flow below.

---

## 0) One-time setup checks

### Local machine (PowerShell)

```powershell
cd "C:\codebase\sip_studies\actual\Sip-Studies"
git remote -v
git status
```

Expected remote:
- `origin https://github.com/Sip-Coder/Sipopedia.git`

### Replit Shell

```bash
git remote -v
git rev-parse --abbrev-ref HEAD
```

Expected:
- remote points to `https://github.com/Sip-Coder/Sipopedia.git`
- branch is `main`

---

## 1) Standard cycle (Recommended): Local -> GitHub -> Replit -> Publish

### Step 1. Sync local first

```powershell
cd "C:\codebase\sip_studies\actual\Sip-Studies"
git fetch origin
git pull --ff-only origin main
git status
```

### Step 2. Make local edits + test

```powershell
npm install
npm run dev
```

When done testing, stop dev server with `Ctrl + C`.

### Step 3. Commit + push local changes to GitHub

```powershell
git add -A
git commit -m "Describe your change"
git push origin main
```

### Step 4. Sync Replit to latest GitHub main

In Replit Shell:

```bash
git fetch origin
git checkout main
git reset --hard origin/main
git clean -fd
git rev-parse --short HEAD
npm install
npm run dev
```

- `git reset --hard` + `git clean -fd` removes uncommitted Replit changes.
- If you need to keep Replit edits, commit/push them before this step.

### Step 5. Publish from Replit

In Replit Publishing settings:
- Deployment type: `Static pages`
- Public directory: `dist`
- Build command: `npm run build`
- Deployment secrets:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`

Then click `Publish` (or `Republish`).

---

## 2) Alternate cycle: Replit edits first -> GitHub -> Local -> Publish

Use this only when you intentionally edit in Replit first.

### Step 1. Edit/test in Replit

```bash
npm install
npm run dev
```

### Step 2. Commit and push from Replit to GitHub

```bash
git add -A
git commit -m "Describe your Replit change"
git push origin main
```

### Step 3. Pull those updates to local

```powershell
cd "C:\codebase\sip_studies\actual\Sip-Studies"
git fetch origin
git pull --ff-only origin main
git status
```

### Step 4. Republish from Replit

- Open Publishing tab
- Click `Republish`

---

## 3) If Replit shows "Need to specify how to reconcile divergent branches"

Run this in Replit Shell:

```bash
git fetch origin
git checkout main
git reset --hard origin/main
git clean -fd
```

Then start app again:

```bash
npm install
npm run dev
```

---

## 4) If Preview shows host blocked error again

Run in Replit Shell:

```bash
git fetch origin
git checkout main
git reset --hard origin/main
npm install
npm run dev
```

Confirm commit includes latest Vite host fix:

```bash
git rev-parse --short HEAD
```

---

## 5) Domain checks after publish

- Open:
  - `https://sipopedia.com`
  - `https://www.sipopedia.com`
- If wrong version appears, click `Republish` and hard refresh browser (`Ctrl + Shift + R`).

---

## 6) Quick copy/paste daily checklist

### Local

```powershell
cd "C:\codebase\sip_studies\actual\Sip-Studies"
git fetch origin
git pull --ff-only origin main
npm install
npm run dev
# (edit/test)
git add -A
git commit -m "Update: ..."
git push origin main
```

### Replit

```bash
git fetch origin
git checkout main
git reset --hard origin/main
git clean -fd
npm install
npm run dev
# Publish -> Republish
```
