<#
.SYNOPSIS
    Backs up existing content in Azure Storage and deploys new website.

.DESCRIPTION
    This script:
    1. Connects to Azure Storage Account
    2. Gets the latest backup number
    3. Backs up existing content to backup<incremental_no>
    4. Uploads new website files
    5. Cleans up old backups (optional)

.PARAMETER StorageAccount
    Name of the Azure Storage Account

.PARAMETER ContainerName
    Name of the container in the storage account

.PARAMETER BackupFolderName
    Name of the backup folder (default: 'backup')

.PARAMETER SourcePath
    Path to the new website files to deploy

.PARAMETER RetentionDays
    Number of days to retain backups (default: 30)

#>

param(
    [Parameter(Mandatory = $true)]
    [string]$StorageAccount,
    
    [Parameter(Mandatory = $true)]
    [string]$ContainerName,
    
    [Parameter(Mandatory = $false)]
    [string]$BackupFolderName = "backup",
    
    [Parameter(Mandatory = $true)]
    [string]$SourcePath,
    
    [Parameter(Mandatory = $false)]
    [int]$RetentionDays = 30
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Azure Storage Backup & Deploy Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

try {
    # Get storage context
    Write-Host "Getting storage account context..." -ForegroundColor Yellow
    $storageContext = (Get-AzStorageAccount -StorageAccountName $StorageAccount).Context
    
    if (-not $storageContext) {
        throw "Failed to get storage context for account: $StorageAccount"
    }
    
    # Get existing files (excluding backup folder)
    Write-Host "Fetching existing files from container..." -ForegroundColor Yellow
    $existingBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                     Where-Object { $_.Name -notlike "$BackupFolderName/*" }
    
    if ($existingBlobs.Count -gt 0) {
        Write-Host "Found $($existingBlobs.Count) existing files. Creating backup..." -ForegroundColor Yellow
        
        # Get the highest backup number
        $backupBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                       Where-Object { $_.Name -like "$BackupFolderName/backup[0-9]*/*" }
        
        $backupNumbers = @()
        foreach ($blob in $backupBlobs) {
            if ($blob.Name -match "$BackupFolderName/backup(\d+)/") {
                $backupNumbers += [int]$matches[1]
            }
        }
        
        $nextBackupNumber = 1
        if ($backupNumbers.Count -gt 0) {
            $nextBackupNumber = ([int]($backupNumbers | Measure-Object -Maximum).Maximum) + 1
        }
        
        $backupFolderPath = "$BackupFolderName/backup$nextBackupNumber"
        
        Write-Host "Creating backup to: $backupFolderPath" -ForegroundColor Green
        
        # Back up existing files
        $backupCount = 0
        foreach ($blob in $existingBlobs) {
            $backupBlobPath = "$backupFolderPath/$($blob.Name)"
            
            # Download blob to memory
            $stream = New-Object System.IO.MemoryStream
            $blob.ICloudBlob.DownloadToStream($stream)
            $stream.Seek(0, [System.IO.SeekOrigin]::Begin)
            
            # Upload to backup location
            Set-AzStorageBlobContent -File $blob.Name -Container $ContainerName `
                                     -Blob $backupBlobPath -Context $storageContext `
                                     -Force | Out-Null
            
            $stream.Dispose()
            $backupCount++
        }
        
        Write-Host "✅ Backed up $backupCount files to: $backupFolderPath" -ForegroundColor Green
    }
    else {
        Write-Host "No existing files found. Skipping backup." -ForegroundColor Gray
    }
    
    # Remove old files (excluding backup folder)
    Write-Host "Removing old files from container..." -ForegroundColor Yellow
    foreach ($blob in $existingBlobs) {
        Remove-AzStorageBlob -Blob $blob.Name -Container $ContainerName -Context $storageContext -Force | Out-Null
    }
    Write-Host "✅ Old files removed" -ForegroundColor Green
    
    # Upload new files
    Write-Host "Uploading new website files..." -ForegroundColor Yellow
    $files = Get-ChildItem -Path $SourcePath -Recurse -File
    $uploadCount = 0
    
    foreach ($file in $files) {
        $relativePath = $file.FullName.Substring($SourcePath.Length + 1).Replace('\', '/')
        
        # Determine content type
        $contentType = "application/octet-stream"
        switch ($file.Extension.ToLower()) {
            ".html" { $contentType = "text/html; charset=utf-8" }
            ".css" { $contentType = "text/css; charset=utf-8" }
            ".js" { $contentType = "application/javascript; charset=utf-8" }
            ".json" { $contentType = "application/json; charset=utf-8" }
            ".png" { $contentType = "image/png" }
            ".jpg" { $contentType = "image/jpeg" }
            ".jpeg" { $contentType = "image/jpeg" }
            ".gif" { $contentType = "image/gif" }
            ".svg" { $contentType = "image/svg+xml" }
            ".webp" { $contentType = "image/webp" }
            ".woff" { $contentType = "font/woff" }
            ".woff2" { $contentType = "font/woff2" }
            ".ttf" { $contentType = "font/ttf" }
            ".txt" { $contentType = "text/plain; charset=utf-8" }
        }
        
        Set-AzStorageBlobContent -File $file.FullName -Container $ContainerName `
                                 -Blob $relativePath -Context $storageContext `
                                 -Properties @{ ContentType = $contentType } `
                                 -Force | Out-Null
        
        $uploadCount++
    }
    
    Write-Host "✅ Uploaded $uploadCount files successfully" -ForegroundColor Green
    
    # Clean up old backups (keep only last N days)
    Write-Host "Cleaning up old backups (retention: $RetentionDays days)..." -ForegroundColor Yellow
    $cutoffDate = (Get-Date).AddDays(-$RetentionDays)
    
    $backupBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                   Where-Object { $_.Name -like "$BackupFolderName/backup[0-9]*/*" }
    
    $deletedCount = 0
    foreach ($blob in $backupBlobs) {
        if ($blob.LastModified -lt $cutoffDate) {
            Remove-AzStorageBlob -Blob $blob.Name -Container $ContainerName -Context $storageContext -Force | Out-Null
            $deletedCount++
        }
    }
    
    if ($deletedCount -gt 0) {
        Write-Host "✅ Deleted $deletedCount old backup files" -ForegroundColor Green
    }
    
    # Display summary
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Summary" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Storage Account: $StorageAccount" -ForegroundColor White
    Write-Host "Container: $ContainerName" -ForegroundColor White
    Write-Host "Files Uploaded: $uploadCount" -ForegroundColor Green
    Write-Host "Deployment Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor White
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
}
catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    exit 1
}
