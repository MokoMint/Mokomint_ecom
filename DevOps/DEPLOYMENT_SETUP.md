# Azure Storage Static Website Deployment - Setup Guide

## Overview
This guide will help you set up a CI/CD pipeline using GitHub Actions to automatically deploy your Next.js website to Azure Storage with versioned backups.

### Features
✅ Automated builds on push to main branch  
✅ Manual approval gate before deployment  
✅ Automatic backup of existing content with incremental numbering  
✅ Static site generation with Next.js  
✅ Content-type aware file uploads  
✅ Automatic cleanup of old backups (configurable retention)  

---

## Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **Azure Account**: An active Azure subscription
3. **Azure Storage Account**: A storage account with a container for your website
4. **Azure Service Principal**: For GitHub Actions authentication

---

## Step 1: Create Azure Resources

### 1.1 Create a Storage Account
```powershell
$resourceGroup = "your-resource-group"
$storageAccountName = "yourstorageaccount"
$location = "eastus"

az storage account create `
  --name $storageAccountName `
  --resource-group $resourceGroup `
  --location $location `
  --sku Standard_LRS `
  --kind StorageV2
```

### 1.2 Create a Container
```powershell
az storage container create `
  --account-name $storageAccountName `
  --name "website" `
  --public-access blob
```

### 1.3 Enable Static Website (Optional - if not using CDN)
```powershell
az storage blob service-properties update `
  --account-name $storageAccountName `
  --static-website `
  --index-document index.html `
  --404-document 404.html
```

---

## Step 2: Create Azure Service Principal

```powershell
$subscriptionId = az account show --query id -o tsv
$appName = "github-actions-Deploy"

# Create service principal
$sp = az ad sp create-for-rbac `
  --name $appName `
  --role "Storage Blob Data Contributor" `
  --scopes /subscriptions/$subscriptionId/resourceGroups/$resourceGroup `
  --json | ConvertFrom-Json

Write-Output $sp | ConvertTo-Json
```

**Save the output** - you'll need these values:
- `clientId` (app ID)
- `clientSecret` (password)
- `subscriptionId`
- `tenantId`

---

## Step 3: Configure GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Add the following secrets:

| Secret Name | Value |
|---|---|
| `AZURE_CREDENTIALS` | JSON output from service principal (entire object) |
| `AZURE_STORAGE_ACCOUNT` | Storage account name |
| `AZURE_STORAGE_CONTAINER` | Container name (e.g., "website") |
| `AZURE_RESOURCE_GROUP` | Resource group name |

**AZURE_CREDENTIALS format:**
```json
{
  "clientId": "xxxx",
  "clientSecret": "xxxx",
  "subscriptionId": "xxxx",
  "tenantId": "xxxx"
}
```

---

## Step 4: Configure Deployment Environment

1. Go to **Settings** → **Environments**
2. Click **New environment**
3. Name it: `Production`
4. Add **Deployment branches** filter: `main`
5. (Optional) Add **Required reviewers** for approval gate

---

## Step 5: Customize the Workflow (Optional)

Edit [.github/workflows/deploy-to-azure.yml](.github/workflows/deploy-to-azure.yml):

### Change Node.js version:
```yaml
node-version: '20'  # Change to 18, 19, 20, etc.
```

### Change backup retention:
```yaml
AZURE_RETENTION_DAYS: 30  # Change to desired days
```

### Monitor specific branches:
```yaml
on:
  push:
    branches:
      - main
      - production  # Add more branches as needed
```

---

## Step 6: Trigger Your First Deployment

1. **Ensure your code is committed** to the `main` branch
2. **Push to main**:
   ```bash
   git add .
   git commit -m "Enable CI/CD pipeline"
   git push origin main
   ```

3. **GitHub Actions Workflow starts**:
   - Go to **Actions** tab in GitHub
   - Watch the build job execute
   - When build completes, the approval job awaits review
   
4. **Approve Deployment**:
   - In the Actions workflow, click the approval review button
   - Confirm your approval (GitHub will notify you)
   
5. **Deployment executes**:
   - Script backs up existing files to `backup/backup1`, `backup/backup2`, etc.
   - New files are uploaded
   - Old backups (>30 days) are cleaned up

---

## Backup Folder Structure

After first deployment:
```
$web/
  ├── index.html
  ├── about/
  ├── shop/
  ├── ...
  └── backup/
      ├── backup1/          (First backup)
      │   ├── index.html
      │   ├── about/
      │   └── ...
      ├── backup2/          (Second backup)
      │   ├── index.html
      │   └── ...
      └── backup3/          (And so on...)
```

---

## Workflow Stages Explained

### Stage 1: Build
- Checks out your code
- Installs dependencies
- Builds Next.js static site
- Uploads `out` folder as artifact

### Stage 2: Approval
- Waits for manual approval by a configured reviewer
- Cannot proceed without approval

### Stage 3: Deploy
- Downloads build artifact
- Authenticates to Azure
- Backs up existing files
- Uploads new files
- Cleans up old backups
- Verifies deployment

---

## Manual Deployment

You can manually trigger the workflow without waiting for a push:

1. Go to **Actions** tab
2. Select **Deploy to Azure Storage** workflow
3. Click **Run workflow** dropdown
4. Click **Run workflow** on `main` branch

---

## Troubleshooting

### Issue: "Failed to get storage context"
**Solution**: Verify `AZURE_CREDENTIALS` and `AZURE_STORAGE_ACCOUNT` secrets are correctly set.

### Issue: "Deployment failed - permission denied"
**Solution**: Ensure the service principal has "Storage Blob Data Contributor" role on the storage account.

### Issue: "Approval job stuck"
**Solution**: Check Settings → Environments → Production for required reviewers configuration.

### Issue: "Out folder not found"
**Solution**: Verify `next.config.mjs` has `output: 'export'` configured.

---

## Monitoring & Logs

1. **View workflow logs**: Actions tab → Select workflow → Click run
2. **Storage backup history**: Azure Portal → Storage Account → Containers → Inspect `backup/backup*` folders
3. **Failed deployments**: Check job logs for errors and rerun

---

## Security Best Practices

✅ Store secrets securely in GitHub  
✅ Use service principal with minimal required permissions  
✅ Enable branch protection on `main`  
✅ Require approval for deployments  
✅ Regularly rotate service principal credentials  
✅ Monitor storage account access logs  

---

## Next Steps

- Set up CDN (Azure CDN) in front of storage account for better performance
- Configure custom domain with HTTPS
- Set up monitoring/alerts for failed deployments
- Implement disaster recovery plan using backups

---

## Support

For issues or questions, refer to:
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/)
- [Next.js Static Export](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)
