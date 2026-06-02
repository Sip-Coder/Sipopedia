# Git LFS Note (For Later)

Git LFS (Large File Storage) stores large binary files outside normal Git object storage.

How it works:
- Git commits a small pointer file.
- Actual file content is stored in LFS storage on the Git host.
- Clones and pulls fetch LFS content separately.

Why we may use it here:
- Large asset folders (like `public/game`) can make normal pushes slow or timeout.
- LFS keeps repo history lighter and improves reliability for big binaries.

When ready, run:

```bash
git lfs install
git lfs track "public/game/**/*.png"
git add .gitattributes
git add public/game
git commit -m "Track game assets with Git LFS"
git push origin main
```

Notes:
- Do this after manual repo cleanup.
- Decide final file patterns before tracking to avoid unnecessary churn.
