# CI/CD Deployment - Quick Reference

## 🚀 Quick Start (TL;DR)

### For Azure Admin (One-time setup):
```powershell
# 1. Create storage account and container
az storage account create --name yourstorageaccount --resource-group your-rg --sku Standard_LRS --kind StorageV2
az storage container create --account-name yourstorageaccount --name website

# 2. Create service principal
az ad sp create-for-rbac --name github-actions-Deploy --role "Storage Blob Data Contributor" --scopes /subscriptions/{subId}/resourceGroups/{rg}

# 3. Copy the JSON output and save as AZURE_CREDENTIALS secret in GitHub
```

### For GitHub Admin (One-time setup):
1. Add **4 secrets** in `Settings → Secrets and variables → Actions`:
   - `AZURE_CREDENTIALS` (JSON from service principal)
   - `AZURE_STORAGE_ACCOUNT` (e.g., "yourstorageaccount")
   - `AZURE_STORAGE_CONTAINER` (e.g., "website")
   - `AZURE_RESOURCE_GROUP` (e.g., "your-rg")

2. Create **Production environment** in `Settings → Environments`

### For Developers:
```bash
# Make changes and push to main
git add .
git commit -m "Update website"
git push origin main

# Watch Actions tab for build completion
# Approve deployment when prompted
# Your site is live! 🎉
```

---

## 📁 Backup Structure

Every deployment automatically creates a backup:
```
container/
├── [your website files]
└── backup/
    ├── backup1/  ← First deployment backup
    ├── backup2/  ← Second deployment backup  
    ├── backup3/  ← Third deployment backup
    └── ...
```

Backups older than **30 days** are automatically deleted.

---

## ⚙️ Configuration Files

| File | Purpose |
|------|---------|
| `.github/workflows/deploy-to-azure.yml` | Main CI/CD workflow |
| `scripts/backup-and-deploy.ps1` | Backup & deployment script |
| `next-app/next.config.mjs` | Next.js config (export: 'export' added) |

---

## 🔄 Manual Deployment

1. Go to GitHub **Actions** tab
2. Select **Deploy to Azure Storage** workflow
3. Click **Run workflow**
4. Approve when prompted

---

## 🐛 Common Issues

| Issue | Solution |
|-------|----------|
| Build fails | Check `npm install` works locally |
| Approval stuck | Ensure environment is configured |
| Upload fails | Verify secrets are correct |
| Backups missing | Check container has "Storage Blob Data Contributor" role |

---

## 📊 Monitoring

- **View logs**: Actions tab → Select workflow run
- **Check backups**: Azure Portal → Storage Account → Containers → backup folder
- **Verify live**: Open your storage account endpoint

---

## 🔐 Security Checklist

- [ ] Secrets are set in GitHub (not in code!)
- [ ] Service principal has minimal permissions
- [ ] Main branch is protected
- [ ] Approval reviewers are configured
- [ ] No credentials in repository

---

## 📞 Help

- Full setup guide: See `DEPLOYMENT_SETUP.md`
- Workflow file: See `.github/workflows/deploy-to-azure.yml`
- Deployment script: See `scripts/backup-and-deploy.ps1`
