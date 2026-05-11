# Deployment Scripts Guide

## Overview

This directory contains PowerShell scripts for automated and manual Azure Storage deployment operations.

---

## Scripts

### 1. `backup-and-deploy.ps1`
**Purpose**: Automated backup and deployment script  
**Usage**: Called automatically by GitHub Actions workflow

#### Parameters:
```powershell
-StorageAccount       [Required] Name of Azure Storage Account
-ContainerName        [Required] Container name in storage account
-BackupFolderName     [Optional] Backup folder name (default: 'backup')
-SourcePath           [Required] Path to new website files
-RetentionDays        [Optional] Days to retain backups (default: 30)
```

#### Example (Manual Use):
```powershell
& '.\scripts\backup-and-deploy.ps1' `
  -StorageAccount 'yourstorageaccount' `
  -ContainerName 'website' `
  -SourcePath './out' `
  -BackupFolderName 'backup' `
  -RetentionDays 30
```

#### What It Does:
1. ✅ Connects to Azure Storage
2. ✅ Backs up all existing files to `backup/backup<N>`
3. ✅ Removes old live files
4. ✅ Uploads new website files
5. ✅ Deletes backups older than retention period
6. ✅ Sets correct content types for all files

---

### 2. `manage-storage.ps1`
**Purpose**: Local management and recovery operations  
**Usage**: Manual administration tasks

#### Supported Operations:

##### `ListBackups`
Lists all available backups with file count and size.
```powershell
& '.\scripts\manage-storage.ps1' `
  -Operation ListBackups `
  -StorageAccount 'yourstorageaccount'
```

##### `RestoreBackup`
Restores a specific backup version, creating a safety backup first.
```powershell
& '.\scripts\manage-storage.ps1' `
  -Operation RestoreBackup `
  -StorageAccount 'yourstorageaccount' `
  -BackupNumber 2
```
⚠️ **Warning**: Creates safety backup before restoring.

##### `DeleteBackup`
Permanently deletes a backup.
```powershell
& '.\scripts\manage-storage.ps1' `
  -Operation DeleteBackup `
  -StorageAccount 'yourstorageaccount' `
  -BackupNumber 1
```

##### `ViewBackupSize`
Shows detailed size and file information for a backup.
```powershell
& '.\scripts\manage-storage.ps1' `
  -Operation ViewBackupSize `
  -StorageAccount 'yourstorageaccount' `
  -BackupNumber 3
```

##### `CompareVersions`
Compares current live version with latest backup.
```powershell
& '.\scripts\manage-storage.ps1' `
  -Operation CompareVersions `
  -StorageAccount 'yourstorageaccount'
```

##### `TestConnection`
Verifies connection to storage account.
```powershell
& '.\scripts\manage-storage.ps1' `
  -Operation TestConnection `
  -StorageAccount 'yourstorageaccount'
```

---

## Prerequisites

- **PowerShell 5.1+** (Windows)
- **Azure PowerShell Module**: `Install-Module -Name Az.Storage -Force`
- **Azure CLI**: For initial setup only
- **Authenticated Azure Account**: `Connect-AzAccount`

---

## Installation

### 1. Install Azure PowerShell Module
```powershell
Install-Module -Name Az.Storage -Force -AllowClobber
Import-Module Az.Storage
```

### 2. Authenticate to Azure
```powershell
Connect-AzAccount
Select-AzSubscription -SubscriptionId 'your-subscription-id'
```

### 3. Verify modules are loaded
```powershell
Get-Module | grep Az
```

---

## Examples

### Example 1: Deploy locally
```powershell
# Navigate to project directory
cd 'D:\MokoMint\Website\Mokomint_ecom'

# Build Next.js site
cd next-app
npm run build
cd ..

# Deploy to Azure
& '.\scripts\backup-and-deploy.ps1' `
  -StorageAccount 'mokomintstore' `
  -ContainerName 'website' `
  -SourcePath './next-app/out'
```

### Example 2: Check backup history
```powershell
& '.\scripts\manage-storage.ps1' `
  -Operation ListBackups `
  -StorageAccount 'mokomintstore'
```

### Example 3: Restore previous version
```powershell
# First, list available backups
& '.\scripts\manage-storage.ps1' `
  -Operation ListBackups `
  -StorageAccount 'mokomintstore'

# Restore backup 2
& '.\scripts\manage-storage.ps1' `
  -Operation RestoreBackup `
  -StorageAccount 'mokomintstore' `
  -BackupNumber 2
```

### Example 4: Clean up old backups manually
```powershell
# View all backups
& '.\scripts\manage-storage.ps1' `
  -Operation ListBackups `
  -StorageAccount 'mokomintstore'

# Delete backup 1
& '.\scripts\manage-storage.ps1' `
  -Operation DeleteBackup `
  -StorageAccount 'mokomintstore' `
  -BackupNumber 1
```

---

## Troubleshooting

### Issue: "Connect-AzAccount : The term 'Connect-AzAccount' is not recognized"
**Solution**: Install and import Azure PowerShell module
```powershell
Install-Module -Name Az.Storage -Force
Import-Module Az.Storage
```

### Issue: "Insufficient permissions to complete the operation"
**Solution**: Ensure your account has "Storage Blob Data Contributor" role
```powershell
# Verify your roles
Get-AzRoleAssignment -SignInName (Get-AzContext).Account.Id
```

### Issue: "No backups found"
**Solution**: This occurs on first deployment. Run the deployment script once to create initial backup.

### Issue: "Blob not found" when restoring
**Solution**: Verify backup number exists using ListBackups operation first.

---

## File Type Mappings

The deployment script automatically sets correct content types:

| Extension | Content-Type |
|-----------|----------------|
| `.html` | `text/html; charset=utf-8` |
| `.css` | `text/css; charset=utf-8` |
| `.js` | `application/javascript; charset=utf-8` |
| `.json` | `application/json; charset=utf-8` |
| `.png` | `image/png` |
| `.jpg` | `image/jpeg` |
| `.webp` | `image/webp` |
| `.woff2` | `font/woff2` |

---

## Best Practices

✅ Always run `ListBackups` before `RestoreBackup`  
✅ Test locally with `npm run build` before deploying  
✅ Keep at least 2-3 backups for emergency recovery  
✅ Document manual deployment operations  
✅ Monitor backup storage size regularly  
✅ Test restore operations in staging environment first  

---

## Security

⚠️ These scripts require:
- **Active Azure authentication** (don't share credentials)
- **Proper RBAC permissions** (Storage Blob Data Contributor minimum)
- **Safe storage of connection strings** (never commit to git)

Never run these scripts with elevated privileges unless necessary.

---

## Support

For issues with Azure Storage, refer to:
- [Azure Storage Documentation](https://docs.microsoft.com/en-us/azure/storage/)
- [Azure PowerShell Documentation](https://docs.microsoft.com/en-us/powershell/azure/)
- [Backup & Recovery Best Practices](https://docs.microsoft.com/en-us/azure/storage/common/storage-disaster-recovery-guidance)
