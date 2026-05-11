<#
.SYNOPSIS
    Azure Storage Management utility for backups and deployments.

.DESCRIPTION
    Tools for testing, restoring from backups, and managing Azure Storage deployments locally.

#>

param(
    [Parameter(Mandatory = $true)]
    [ValidateSet("ListBackups", "RestoreBackup", "DeleteBackup", "ViewBackupSize", "CompareVersions", "TestConnection")]
    [string]$Operation,
    
    [Parameter(Mandatory = $false)]
    [string]$StorageAccount,
    
    [Parameter(Mandatory = $false)]
    [string]$ContainerName = "website",
    
    [Parameter(Mandatory = $false)]
    [string]$BackupNumber,
    
    [Parameter(Mandatory = $false)]
    [string]$BackupFolderName = "backup"
)

$ErrorActionPreference = "Stop"

function Test-AzureConnection {
    param(
        [string]$StorageAccount
    )
    
    Write-Host "Testing Azure connection..." -ForegroundColor Cyan
    
    try {
        $storageContext = (Get-AzStorageAccount -StorageAccountName $StorageAccount -ErrorAction Stop).Context
        Write-Host "✅ Successfully connected to storage account: $StorageAccount" -ForegroundColor Green
        return $storageContext
    }
    catch {
        Write-Host "❌ Failed to connect to storage account" -ForegroundColor Red
        Write-Host "Error: $_" -ForegroundColor Red
        exit 1
    }
}

function List-Backups {
    param(
        [string]$StorageAccount,
        [string]$ContainerName,
        [string]$BackupFolderName
    )
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Available Backups" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    $storageContext = Test-AzureConnection -StorageAccount $StorageAccount
    
    $backupBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                   Where-Object { $_.Name -like "$BackupFolderName/backup[0-9]*/*" }
    
    if ($backupBlobs.Count -eq 0) {
        Write-Host "No backups found." -ForegroundColor Yellow
        return
    }
    
    $backupNumbers = @()
    foreach ($blob in $backupBlobs) {
        if ($blob.Name -match "$BackupFolderName/backup(\d+)/") {
            $backupNumbers += [int]$matches[1]
        }
    }
    
    $uniqueBackups = $backupNumbers | Sort-Object -Unique
    
    Write-Host "Backup Numbers: $($uniqueBackups -join ', ')`n" -ForegroundColor Green
    
    foreach ($backupNum in ($uniqueBackups | Sort-Object)) {
        $backupBlobsForNum = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                             Where-Object { $_.Name -like "$BackupFolderName/backup$backupNum/*" }
        
        $totalSize = ($backupBlobsForNum | Measure-Object -Property "Length" -Sum).Sum
        $fileCount = $backupBlobsForNum.Count
        
        Write-Host "  Backup $backupNum" -ForegroundColor Yellow
        Write-Host "    Files: $fileCount" -ForegroundColor Gray
        Write-Host "    Size: $(FormatBytes $totalSize)" -ForegroundColor Gray
        Write-Host "    Created: $($backupBlobsForNum[0].LastModified)" -ForegroundColor Gray
        Write-Host ""
    }
}

function View-BackupSize {
    param(
        [string]$StorageAccount,
        [string]$ContainerName,
        [string]$BackupNumber,
        [string]$BackupFolderName
    )
    
    Write-Host "`nCalculating backup size for backup$BackupNumber..." -ForegroundColor Cyan
    
    $storageContext = Test-AzureConnection -StorageAccount $StorageAccount
    
    $backupBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                   Where-Object { $_.Name -like "$BackupFolderName/backup$BackupNumber/*" }
    
    if ($backupBlobs.Count -eq 0) {
        Write-Host "❌ Backup $BackupNumber not found" -ForegroundColor Red
        return
    }
    
    $totalSize = ($backupBlobs | Measure-Object -Property "Length" -Sum).Sum
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Backup Details: backup$BackupNumber" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    Write-Host "Total Files: $($backupBlobs.Count)" -ForegroundColor White
    Write-Host "Total Size: $(FormatBytes $totalSize)" -ForegroundColor Green
    Write-Host "Created: $($backupBlobs[0].LastModified)" -ForegroundColor White
}

function Restore-Backup {
    param(
        [string]$StorageAccount,
        [string]$ContainerName,
        [string]$BackupNumber,
        [string]$BackupFolderName
    )
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Restore Backup" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    $storageContext = Test-AzureConnection -StorageAccount $StorageAccount
    
    Write-Host "⚠️  WARNING: This will overwrite current live files!" -ForegroundColor Red
    $confirm = Read-Host "Type 'YES' to confirm restoring backup$BackupNumber"
    
    if ($confirm -ne "YES") {
        Write-Host "Restore cancelled." -ForegroundColor Yellow
        return
    }
    
    # Get backup files
    $backupBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                   Where-Object { $_.Name -like "$BackupFolderName/backup$BackupNumber/*" }
    
    if ($backupBlobs.Count -eq 0) {
        Write-Host "❌ Backup $BackupNumber not found" -ForegroundColor Red
        return
    }
    
    # Create new backup of current live files before restoring
    Write-Host "Creating backup of current live files..." -ForegroundColor Yellow
    $currentBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                    Where-Object { $_.Name -notlike "$BackupFolderName/*" }
    
    $maxBackupNum = 1
    $allBackups = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                  Where-Object { $_.Name -like "$BackupFolderName/backup[0-9]*/*" }
    
    foreach ($blob in $allBackups) {
        if ($blob.Name -match "$BackupFolderName/backup(\d+)/") {
            $num = [int]$matches[1]
            if ($num -gt $maxBackupNum) {
                $maxBackupNum = $num
            }
        }
    }
    
    $safetyBackupNum = $maxBackupNum + 1
    $safetyBackupPath = "$BackupFolderName/backup$safetyBackupNum"
    
    foreach ($blob in $currentBlobs) {
        $backupBlobPath = "$safetyBackupPath/$($blob.Name)"
        
        $stream = New-Object System.IO.MemoryStream
        $blob.ICloudBlob.DownloadToStream($stream)
        $stream.Seek(0, [System.IO.SeekOrigin]::Begin)
        
        Set-AzStorageBlobContent -File $blob.Name -Container $ContainerName `
                                 -Blob $backupBlobPath -Context $storageContext `
                                 -Force | Out-Null
        
        $stream.Dispose()
    }
    
    Write-Host "✅ Created safety backup at: $safetyBackupPath" -ForegroundColor Green
    
    # Remove current live files
    foreach ($blob in $currentBlobs) {
        Remove-AzStorageBlob -Blob $blob.Name -Container $ContainerName -Context $storageContext -Force | Out-Null
    }
    
    # Restore from backup
    Write-Host "Restoring files from backup$BackupNumber..." -ForegroundColor Yellow
    $restoreCount = 0
    
    foreach ($blob in $backupBlobs) {
        $newPath = $blob.Name -replace "^$BackupFolderName/backup$BackupNumber/", ""
        
        $stream = New-Object System.IO.MemoryStream
        $blob.ICloudBlob.DownloadToStream($stream)
        $stream.Seek(0, [System.IO.SeekOrigin]::Begin)
        
        Set-AzStorageBlobContent -File $newPath -Container $ContainerName `
                                 -Blob $newPath -Context $storageContext `
                                 -Force | Out-Null
        
        $stream.Dispose()
        $restoreCount++
    }
    
    Write-Host "`n✅ Restore completed!" -ForegroundColor Green
    Write-Host "Files restored: $restoreCount" -ForegroundColor Green
    Write-Host "Safety backup created: $safetyBackupPath" -ForegroundColor Green
}

function Delete-Backup {
    param(
        [string]$StorageAccount,
        [string]$ContainerName,
        [string]$BackupNumber,
        [string]$BackupFolderName
    )
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Delete Backup" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    $storageContext = Test-AzureConnection -StorageAccount $StorageAccount
    
    Write-Host "⚠️  WARNING: This will permanently delete backup$BackupNumber!" -ForegroundColor Red
    $confirm = Read-Host "Type 'YES' to confirm deletion"
    
    if ($confirm -ne "YES") {
        Write-Host "Deletion cancelled." -ForegroundColor Yellow
        return
    }
    
    $backupBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                   Where-Object { $_.Name -like "$BackupFolderName/backup$BackupNumber/*" }
    
    if ($backupBlobs.Count -eq 0) {
        Write-Host "❌ Backup $BackupNumber not found" -ForegroundColor Red
        return
    }
    
    $deleteCount = 0
    foreach ($blob in $backupBlobs) {
        Remove-AzStorageBlob -Blob $blob.Name -Container $ContainerName -Context $storageContext -Force | Out-Null
        $deleteCount++
    }
    
    Write-Host "✅ Deleted $deleteCount files from backup$BackupNumber" -ForegroundColor Green
}

function Compare-Versions {
    param(
        [string]$StorageAccount,
        [string]$ContainerName,
        [string]$BackupFolderName
    )
    
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Version Comparison" -ForegroundColor Cyan
    Write-Host "========================================`n" -ForegroundColor Cyan
    
    $storageContext = Test-AzureConnection -StorageAccount $StorageAccount
    
    # Get current files
    $currentBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                    Where-Object { $_.Name -notlike "$BackupFolderName/*" }
    
    Write-Host "Current Live Version:" -ForegroundColor Yellow
    Write-Host "  Files: $($currentBlobs.Count)" -ForegroundColor White
    $currentSize = ($currentBlobs | Measure-Object -Property "Length" -Sum).Sum
    Write-Host "  Size: $(FormatBytes $currentSize)" -ForegroundColor White
    
    # Get latest backup
    $backupBlobs = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                   Where-Object { $_.Name -like "$BackupFolderName/backup[0-9]*/*" }
    
    if ($backupBlobs.Count -eq 0) {
        Write-Host "`nNo backups available for comparison." -ForegroundColor Yellow
        return
    }
    
    $backupNumbers = @()
    foreach ($blob in $backupBlobs) {
        if ($blob.Name -match "$BackupFolderName/backup(\d+)/") {
            $backupNumbers += [int]$matches[1]
        }
    }
    
    $latestBackupNum = ($backupNumbers | Sort-Object | Select-Object -Last 1)
    
    $latestBackups = Get-AzStorageBlob -Container $ContainerName -Context $storageContext | `
                     Where-Object { $_.Name -like "$BackupFolderName/backup$latestBackupNum/*" }
    
    Write-Host "`nLatest Backup (backup$latestBackupNum):" -ForegroundColor Yellow
    Write-Host "  Files: $($latestBackups.Count)" -ForegroundColor White
    $backupSize = ($latestBackups | Measure-Object -Property "Length" -Sum).Sum
    Write-Host "  Size: $(FormatBytes $backupSize)" -ForegroundColor White
    Write-Host "  Created: $($latestBackups[0].LastModified)" -ForegroundColor White
}

function FormatBytes {
    param([long]$bytes)
    if ($bytes -lt 1KB) { return "$bytes B" }
    elseif ($bytes -lt 1MB) { return "{0:N2} KB" -f ($bytes / 1KB) }
    elseif ($bytes -lt 1GB) { return "{0:N2} MB" -f ($bytes / 1MB) }
    else { return "{0:N2} GB" -f ($bytes / 1GB) }
}

# Main execution
switch ($Operation) {
    "ListBackups" {
        if (-not $StorageAccount) { throw "StorageAccount parameter is required" }
        List-Backups -StorageAccount $StorageAccount -ContainerName $ContainerName -BackupFolderName $BackupFolderName
    }
    
    "RestoreBackup" {
        if (-not $StorageAccount -or -not $BackupNumber) { throw "StorageAccount and BackupNumber parameters are required" }
        Restore-Backup -StorageAccount $StorageAccount -ContainerName $ContainerName -BackupNumber $BackupNumber -BackupFolderName $BackupFolderName
    }
    
    "DeleteBackup" {
        if (-not $StorageAccount -or -not $BackupNumber) { throw "StorageAccount and BackupNumber parameters are required" }
        Delete-Backup -StorageAccount $StorageAccount -ContainerName $ContainerName -BackupNumber $BackupNumber -BackupFolderName $BackupFolderName
    }
    
    "ViewBackupSize" {
        if (-not $StorageAccount -or -not $BackupNumber) { throw "StorageAccount and BackupNumber parameters are required" }
        View-BackupSize -StorageAccount $StorageAccount -ContainerName $ContainerName -BackupNumber $BackupNumber -BackupFolderName $BackupFolderName
    }
    
    "CompareVersions" {
        if (-not $StorageAccount) { throw "StorageAccount parameter is required" }
        Compare-Versions -StorageAccount $StorageAccount -ContainerName $ContainerName -BackupFolderName $BackupFolderName
    }
    
    "TestConnection" {
        if (-not $StorageAccount) { throw "StorageAccount parameter is required" }
        Test-AzureConnection -StorageAccount $StorageAccount | Out-Null
    }
}
