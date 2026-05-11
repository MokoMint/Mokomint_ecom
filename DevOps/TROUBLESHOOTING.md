# Troubleshooting Guide

Common issues and their solutions when using the CI/CD pipeline.

---

## GitHub Actions Issues

### ❌ Workflow doesn't start on push

**Problem**: Push code to main, but workflow doesn't trigger

**Solutions**:
1. Check workflow file syntax
   ```bash
   # Verify file exists and is valid YAML
   ls -la .github/workflows/deploy-to-azure.yml
   ```

2. Check branch name is exactly `main`
   ```bash
   git branch -a
   ```

3. Re-run the workflow manually
   - Actions tab → Deploy to Azure Storage → Run workflow

4. Check for syntax errors in YAML
   - Use online YAML validator: https://www.yamllint.com/

---

### ❌ Build job fails with "npm ERR!"

**Problem**: Build fails during dependency installation

**Solutions**:
1. Test locally first
   ```powershell
   cd next-app
   npm install
   npm run build
   ```

2. Check Node.js version (must be 18+)
   ```bash
   node --version
   npm --version
   ```

3. Clear npm cache
   ```bash
   npm cache clean --force
   npm install
   ```

4. Check `package-lock.json` is committed
   ```bash
   git ls-files | grep package-lock.json
   ```

5. Review GitHub Actions logs for specific error

---

### ❌ Build succeeds but deployment approval never appears

**Problem**: Build completes but approval job is stuck

**Solutions**:
1. Verify Production environment exists
   - Settings → Environments
   - Should see "Production" listed

2. Check GitHub notifications
   - You should receive email from GitHub
   - Check spam folder
   - Review in GitHub UI: Settings → Notifications

3. Manually trigger review
   - Actions tab → Click workflow run
   - Look for "Review deployments" button
   - Select environment and approve

4. Check required reviewers
   - If set, make sure reviewers have access
   - They need push permissions on repo

---

### ❌ Deploy job fails with "authentication error"

**Problem**: Deploy fails during Azure authentication

**Solutions**:
1. Verify all 4 secrets are set
   ```
   Settings → Secrets and variables → Actions
   
   Required secrets:
   ✓ AZURE_CREDENTIALS (JSON object)
   ✓ AZURE_STORAGE_ACCOUNT (string)
   ✓ AZURE_STORAGE_CONTAINER (string)
   ✓ AZURE_RESOURCE_GROUP (string)
   ```

2. Check secret values have no extra spaces
   - Edit each secret
   - Verify no leading/trailing whitespace

3. Verify AZURE_CREDENTIALS format
   ```json
   {
     "clientId": "...",
     "clientSecret": "...",
     "subscriptionId": "...",
     "tenantId": "..."
   }
   ```
   - Not: `{"clientId"` should have proper formatting

4. Check service principal still exists
   ```powershell
   az ad sp list --query "[?displayName=='github-actions-Deploy']"
   ```

5. Verify service principal has permissions
   ```powershell
   az role assignment list --assignee <appId>
   ```

---

## Azure Storage Issues

### ❌ "Storage Blob Data Contributor" permission denied

**Problem**: Deploy fails with "permission denied" during upload

**Solutions**:
1. Verify role assignment
   ```powershell
   $appId = "your-service-principal-app-id"
   $rg = "your-resource-group"
   
   az role assignment list `
     --assignee $appId `
     --resource-group $rg
   ```

2. Add permissions if missing
   ```powershell
   $subId = az account show --query id -o tsv
   
   az role assignment create `
     --assignee $appId `
     --role "Storage Blob Data Contributor" `
     --scope /subscriptions/$subId/resourceGroups/$rg
   ```

3. Wait a few minutes for permissions to propagate

4. Retry deployment

---

### ❌ Files not appearing in container

**Problem**: Deployment succeeds but no files in Azure Storage

**Solutions**:
1. Check container exists and is accessible
   ```powershell
   az storage container exists `
     --account-name yourstorageaccount `
     --name website
   ```

2. Verify source directory has files
   ```powershell
   # After running npm run build locally
   ls -la next-app/out/
   ```

3. Check with Azure CLI
   ```powershell
   az storage blob list `
     --account-name yourstorageaccount `
     --container-name website
   ```

4. Review deployment logs in GitHub Actions for errors

---

### ❌ Backup folder not created

**Problem**: Deployment completes but backup/backup1 folder is empty

**Solutions**:
1. This is expected on FIRST deployment
   - First deployment has nothing to backup
   - On second deployment, backup1 will be created

2. Verify by running second deployment
   ```powershell
   # Make a small change in code
   git add .
   git commit -m "Test second deployment"
   git push origin main
   ```

3. Check backup was created
   ```powershell
   & '.\scripts\manage-storage.ps1' `
     -Operation ListBackups `
     -StorageAccount yourstorageaccount
   ```

---

## PowerShell Script Issues

### ❌ Script execution disabled

**Problem**: "cannot be loaded because running scripts is disabled"

**Solutions**:
1. Change execution policy (temporary for session)
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   ```

2. Run as Administrator
   - Right-click PowerShell
   - Run as administrator

3. Fully qualify the script
   ```powershell
   & '.\scripts\backup-and-deploy.ps1' -StorageAccount 'your-account' -ContainerName 'website' -SourcePath '.\out'
   ```

---

### ❌ Module not found error

**Problem**: "The term 'Get-AzStorageAccount' is not recognized"

**Solutions**:
1. Install Azure PowerShell module
   ```powershell
   Install-Module -Name Az.Storage -Force
   ```

2. Import the module
   ```powershell
   Import-Module Az.Storage
   ```

3. Verify installation
   ```powershell
   Get-Module -ListAvailable | grep Az.Storage
   ```

4. Close and reopen PowerShell terminal

---

### ❌ "Connection timeout" when running scripts

**Problem**: Script hangs or times out connecting to Azure

**Solutions**:
1. Authenticate first
   ```powershell
   Connect-AzAccount
   ```

2. Select correct subscription
   ```powershell
   Get-AzSubscription  # List all
   Select-AzSubscription -SubscriptionId 'your-subscription-id'
   ```

3. Check internet connection
   ```powershell
   Test-NetConnection -ComputerName 'azure.microsoft.com' -Port 443
   ```

4. Run test connection operation
   ```powershell
   & '.\scripts\manage-storage.ps1' `
     -Operation TestConnection `
     -StorageAccount yourstorageaccount
   ```

---

### ❌ Restore fails with "Blob not found"

**Problem**: Restore operation says backup doesn't exist

**Solutions**:
1. List available backups first
   ```powershell
   & '.\scripts\manage-storage.ps1' `
     -Operation ListBackups `
     -StorageAccount yourstorageaccount
   ```

2. Use correct backup number
   - If output shows `backup1`, `backup2`
   - Use correct numbers in restore

3. Verify backup has files
   ```powershell
   & '.\scripts\manage-storage.ps1' `
     -Operation ViewBackupSize `
     -StorageAccount yourstorageaccount `
     -BackupNumber 1
   ```

---

## Website Loading Issues

### ❌ Website loads but styling is broken

**Problem**: HTML loads but CSS/JS not working

**Solutions**:
1. Check content types are set correctly
   - Files may have wrong MIME type
   - Verify `backup-and-deploy.ps1` is running latest version
   - Check it includes content-type mapping

2. Verify files are uploaded
   ```powershell
   az storage blob list `
     --account-name yourstorageaccount `
     --container-name website `
     --query "[].{name:name, size:properties.contentLength}" -o table
   ```

3. Check browser console for 404 errors
   - F12 → Console tab
   - Look for failed requests
   - Verify path format

---

### ❌ Website returns 404

**Problem**: Storage URL doesn't work or shows 404

**Solutions**:
1. Verify container is publicly accessible
   ```powershell
   az storage container show `
     --name website `
     --account-name yourstorageaccount
   ```

2. Check correct URL format
   ```
   Wrong: https://yourstorageaccount.blob.core.windows.net/website
   Right: https://yourstorageaccount.blob.core.windows.net/website/index.html
   ```

3. Verify index.html exists
   ```powershell
   az storage blob exists `
     --account-name yourstorageaccount `
     --container-name website `
     --name index.html
   ```

4. Enable static website hosting
   ```powershell
   az storage blob service-properties update `
     --account-name yourstorageaccount `
     --static-website `
     --index-document index.html `
     --404-document 404.html
   ```

---

## Backup & Recovery Issues

### ❌ Running out of storage space

**Problem**: Storage costs increasing due to backups

**Solutions**:
1. Check current storage usage
   ```powershell
   az storage account show-usage `
     --name yourstorageaccount
   ```

2. List backup sizes
   ```powershell
   & '.\scripts\manage-storage.ps1' `
     -Operation ListBackups `
     -StorageAccount yourstorageaccount
   ```

3. Reduce retention period
   - Edit `.github/workflows/deploy-to-azure.yml`
   - Change `RetentionDays: 30` to `RetentionDays: 7`
   - This will delete backups older than 7 days

4. Manually delete old backups
   ```powershell
   & '.\scripts\manage-storage.ps1' `
     -Operation DeleteBackup `
     -StorageAccount yourstorageaccount `
     -BackupNumber 1
   ```

---

### ❌ Restore not working as expected

**Problem**: Restored files don't match what was expected

**Solutions**:
1. Verify you're restoring the correct backup
   ```powershell
   & '.\scripts\manage-storage.ps1' `
     -Operation ViewBackupSize `
     -StorageAccount yourstorageaccount `
     -BackupNumber <number>
   ```

2. Check creation date of backup
   - Lists show when backup was created
   - Pick the right one

3. Don't restore to production immediately
   - Test restore on staging first if possible
   - Or create new container to test

4. Review safety backup created
   ```powershell
   & '.\scripts\manage-storage.ps1' `
     -Operation ListBackups `
     -StorageAccount yourstorageaccount
   ```
   - A new backup is created BEFORE restore

---

## Performance Issues

### ❌ Deployment is very slow

**Problem**: Deployment job takes more than 10 minutes

**Solutions**:
1. Check what's taking time
   - Review GitHub Actions logs
   - Look for specific slow step

2. If build is slow
   - Reduce node_modules size
   - Use npm ci instead of npm install
   - Already configured in workflow

3. If upload is slow
   - Check file count and sizes
   - Large images slow down uploads
   - Consider optimizing images

4. If backup is slow
   - Large number of files = slow backup
   - Consider reducing backup retention

---

## General Debugging

### Get Detailed Logs

**From GitHub Actions**:
1. Actions tab → Workflow run
2. Click specific job
3. Expand each step to see logs
4. Copy full log output

**From Azure CLI**:
```powershell
# Get last 50 lines of operation
az storage blob upload `
  --file test.txt `
  --container-name website `
  --account-name yourstorageaccount `
  --verbose
```

**From PowerShell**:
```powershell
# Enable debug output
$DebugPreference = "Continue"

# Run script with verbose output
& '.\scripts\backup-and-deploy.ps1' `
  -StorageAccount yourstorageaccount `
  -ContainerName website `
  -SourcePath '.\out' `
  -Verbose
```

---

## Still Having Issues?

1. **Review Relevant Documentation**
   - [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
   - [scripts/README.md](./scripts/README.md)
   - [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)

2. **Check GitHub Actions Logs**
   - Most issues show clear error messages
   - Copy full error message
   - Search for solution online

3. **Test Components Individually**
   - Test `npm build` locally works
   - Test Azure authentication works
   - Test script parameters are correct

4. **Contact Support**
   - Azure Support: https://support.microsoft.com/
   - GitHub Support: https://support.github.com/
   - Include full error logs

---

## Getting Help

**Quick Questions?** Check [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)  
**Setup Help?** See [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)  
**Script Issues?** See [scripts/README.md](./scripts/README.md)  
**Implementation Details?** See [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)  

---

Last updated: 2026-04-26
