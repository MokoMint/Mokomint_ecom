# Setup Checklist ✅

Follow this checklist to set up your CI/CD pipeline from start to finish.

---

## Phase 1: Azure Setup (15-20 minutes)

### Create Azure Resources
- [ ] **Log in to Azure**
  ```powershell
  az login
  az account show
  ```

- [ ] **Create Resource Group** (if needed)
  ```powershell
  $rg = "your-resource-group"
  $location = "eastus"
  az group create --name $rg --location $location
  ```

- [ ] **Create Storage Account**
  ```powershell
  $storageAccount = "yourstorageaccount"
  az storage account create `
    --name $storageAccount `
    --resource-group $rg `
    --location $location `
    --sku Standard_LRS `
    --kind StorageV2
  ```

- [ ] **Create Container**
  ```powershell
  $container = "website"
  az storage container create `
    --account-name $storageAccount `
    --name $container `
    --public-access blob
  ```

- [ ] **Enable Static Website** (Optional)
  ```powershell
  az storage blob service-properties update `
    --account-name $storageAccount `
    --static-website `
    --index-document index.html `
    --404-document 404.html
  ```

### Create Service Principal
- [ ] **Get Subscription ID**
  ```powershell
  $subId = az account show --query id -o tsv
  Write-Output $subId
  ```

- [ ] **Create Service Principal**
  ```powershell
  $appName = "github-actions-Deploy"
  $sp = az ad sp create-for-rbac `
    --name $appName `
    --role "Storage Blob Data Contributor" `
    --scopes /subscriptions/$subId/resourceGroups/$rg `
    --json | ConvertFrom-Json
  $sp | ConvertTo-Json | Write-Output
  ```

- [ ] **Save Service Principal Output** (Copy entire JSON)
  ```
  {
    "appId": "xxxx",
    "displayName": "github-actions-Deploy",
    "password": "xxxx",
    "tenant": "xxxx"
  }
  ```

---

## Phase 2: GitHub Configuration (10-15 minutes)

### Add GitHub Secrets

- [ ] **Navigate to GitHub Secrets**
  - Go to your repository
  - Settings → Secrets and variables → Actions
  - Click "New repository secret"

- [ ] **Add AZURE_CREDENTIALS**
  - Name: `AZURE_CREDENTIALS`
  - Value: (Paste the entire JSON from service principal)
  ```json
  {
    "clientId": "xxxx",
    "clientSecret": "xxxx",
    "subscriptionId": "xxxx",
    "tenantId": "xxxx"
  }
  ```

- [ ] **Add AZURE_STORAGE_ACCOUNT**
  - Name: `AZURE_STORAGE_ACCOUNT`
  - Value: `yourstorageaccount` (just the name)

- [ ] **Add AZURE_STORAGE_CONTAINER**
  - Name: `AZURE_STORAGE_CONTAINER`
  - Value: `website` (or your container name)

- [ ] **Add AZURE_RESOURCE_GROUP**
  - Name: `AZURE_RESOURCE_GROUP`
  - Value: `your-resource-group` (your RG name)

### Configure Deployment Environment

- [ ] **Create Production Environment**
  - Settings → Environments → New environment
  - Name: `Production`

- [ ] **Configure Deployment Branches**
  - Click Production environment
  - Deployment branches: `main`

- [ ] **Add Reviewers** (Recommended)
  - Under "Required reviewers"
  - Add yourself and team members
  - This enforces approval gate

---

## Phase 3: Code Configuration (5 minutes)

### Verify Files Are in Place

- [ ] **Workflow File Exists**
  ```
  .github/workflows/deploy-to-azure.yml ✓
  ```

- [ ] **Deployment Scripts Exist**
  ```
  scripts/backup-and-deploy.ps1 ✓
  scripts/manage-storage.ps1 ✓
  scripts/README.md ✓
  ```

- [ ] **Documentation Files Exist**
  ```
  DEPLOYMENT_SETUP.md ✓
  QUICK_REFERENCE.md ✓
  IMPLEMENTATION_SUMMARY.md ✓
  ```

- [ ] **Next.js Config Updated**
  - Verify `next-app/next.config.mjs`
  - Contains: `output: 'export'`
  - Contains: `unoptimized: true` (in images)

---

## Phase 4: First Deployment (10 minutes)

### Push Code to GitHub

- [ ] **Stage All Changes**
  ```powershell
  cd d:\MokoMint\Website\Mokomint_ecom
  git add .
  ```

- [ ] **Create Commit**
  ```powershell
  git commit -m "Add CI/CD pipeline for Azure Storage deployment"
  ```

- [ ] **Push to Main**
  ```powershell
  git push origin main
  ```

### Monitor Workflow Execution

- [ ] **Watch Build Job**
  - GitHub repo → Actions tab
  - Select "Deploy to Azure Storage"
  - Watch build progress
  - Wait for "Build Artifacts" upload

- [ ] **Approve Deployment**
  - When build completes, approval job waits
  - You receive GitHub notification
  - Click "Review deployments"
  - Select "Production"
  - Click "Approve and deploy"

- [ ] **Monitor Deploy Job**
  - Watch deployment script execute
  - Verify success message
  - Total time: 3-5 minutes

### Verify Deployment

- [ ] **Check Azure Portal**
  - Storage Account → Containers
  - Select "website" container
  - Verify files appear:
    - `index.html`
    - `_next/` folder
    - `backup/backup1/` (backup created)

- [ ] **Test Website**
  - Get container endpoint:
    ```
    https://yourstorageaccount.blob.core.windows.net/website/index.html
    ```
  - Open in browser
  - Verify website loads correctly

- [ ] **Verify Backup**
  - In Azure Portal, check `backup/backup1/` folder
  - Should be empty on first deployment
  - On second deployment, will contain backup of first

---

## Phase 5: Testing & Validation (15 minutes)

### Test Local Backup Script
- [ ] **Authenticate to Azure**
  ```powershell
  Connect-AzAccount
  ```

- [ ] **List Backups**
  ```powershell
  & '.\scripts\manage-storage.ps1' `
    -Operation ListBackups `
    -StorageAccount 'yourstorageaccount'
  ```

- [ ] **Check Backup Size**
  ```powershell
  & '.\scripts\manage-storage.ps1' `
    -Operation ViewBackupSize `
    -StorageAccount 'yourstorageaccount' `
    -BackupNumber 1
  ```

### Test Second Deployment

- [ ] **Make a Minor Code Change**
  - Edit a file in `next-app/`
  - Example: Update text in home page

- [ ] **Commit and Push**
  ```powershell
  git add .
  git commit -m "Test second deployment"
  git push origin main
  ```

- [ ] **Approve Second Deployment**
  - Monitor Actions tab
  - Approve when prompted

- [ ] **Verify New Backup**
  ```powershell
  & '.\scripts\manage-storage.ps1' `
    -Operation ListBackups `
    -StorageAccount 'yourstorageaccount'
  ```
  - Should now show `backup1` and `backup2`

### Test Restore (Optional but Recommended)
- [ ] **Compare Versions**
  ```powershell
  & '.\scripts\manage-storage.ps1' `
    -Operation CompareVersions `
    -StorageAccount 'yourstorageaccount'
  ```

- [ ] **Test Restore** (non-production environment first if possible)
  ```powershell
  & '.\scripts\manage-storage.ps1' `
    -Operation RestoreBackup `
    -StorageAccount 'yourstorageaccount' `
    -BackupNumber 1
  ```

---

## Phase 6: Security & Best Practices

- [ ] **Enable Branch Protection** (Optional but Recommended)
  - Settings → Branches
  - Add rule for `main` branch
  - Require status checks to pass
  - Require code review before merge

- [ ] **Store Credentials Safely**
  - ✅ GitHub Secrets configured
  - ✅ Never commit secrets to git
  - ✅ Never share JSON credentials

- [ ] **Archive Service Principal Details**
  - Save JSON output securely
  - Document which account was used
  - Keep for disaster recovery

- [ ] **Configure Backup Retention**
  - Default: 30 days
  - Edit `.github/workflows/deploy-to-azure.yml` to change
  - Recommended: Keep 30-60 days

- [ ] **Plan Monitoring**
  - Check Actions tab regularly
  - Review backup folder monthly
  - Test restore quarterly

---

## Phase 7: Documentation & Handoff

- [ ] **Share Documentation**
  - Team members read QUICK_REFERENCE.md
  - Admin reads DEPLOYMENT_SETUP.md
  - Developers review IMPLEMENTATION_SUMMARY.md

- [ ] **Create Team Documentation**
  - Add workflow to team wiki/docs
  - Document approval process
  - Create incident response runbook

- [ ] **Set Up Notifications** (Optional)
  - GitHub: Watch repository
  - Email: Enable action failure notifications
  - Teams/Slack: Optional GitHub integration

- [ ] **Schedule Review**
  - 1 week after setup: Check pipeline is working
  - Monthly: Review backup retention
  - Quarterly: Test restore procedure

---

## Troubleshooting Checklist

If something doesn't work, verify:

- [ ] **Build Fails**
  - [ ] Check `npm install` works locally: `cd next-app && npm install`
  - [ ] Check `npm run build` works locally
  - [ ] Verify Node.js version 18+

- [ ] **Approval Stuck**
  - [ ] Verify Production environment exists
  - [ ] Check GitHub notifications
  - [ ] Review your email spam

- [ ] **Upload Fails**
  - [ ] Verify all 4 secrets are set correctly
  - [ ] Check secrets don't have extra spaces
  - [ ] Verify service principal has correct permissions
  - [ ] Test connection: `& '.\scripts\manage-storage.ps1' -Operation TestConnection -StorageAccount 'your-account'`

- [ ] **Backups Missing**
  - [ ] Verify container is accessible
  - [ ] Check you have write permissions
  - [ ] View logs in GitHub Actions

- [ ] **Restore Issues**
  - [ ] Always backup existing content first
  - [ ] Use ListBackups to verify backup exists
  - [ ] Check backup size is reasonable

---

## Success Criteria ✅

Your CI/CD setup is complete when:

✅ GitHub Actions workflow runs successfully  
✅ Manual approval gate works  
✅ Files deploy to Azure Storage  
✅ Backup folder created with backup1  
✅ Second deployment creates backup2  
✅ List backups shows all versions  
✅ Website is accessible from storage URL  
✅ Team understands the process  

---

## Next Steps After Setup

1. **Set up CDN** (Azure CDN) for better performance
2. **Configure custom domain** with HTTPS
3. **Set up monitoring** and alerts
4. **Create playbooks** for common operations
5. **Schedule backup reviews** (quarterly restore tests)

---

## Support Resources

📖 Full Setup: [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)  
⚡ Quick Ref: [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)  
🏗️ Summary: [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)  
🔧 Scripts: [scripts/README.md](./scripts/README.md)  

---

**Estimated Total Time: 60-90 minutes for complete setup** ⏱️
