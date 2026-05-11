# Requires ImportExcel module
# Install once:
# Install-Module ImportExcel -Scope CurrentUser

param(
    [string]$ExcelFile = ".\products-data.xlsx",
    [string]$OutputJson = ".\products.json"
)

Import-Module ImportExcel

# =========================
# LOAD SCHEMA SHEET
# =========================

$schemaRows = Import-Excel -Path $ExcelFile -WorksheetName "Schema"

$schemaMap = @{}

foreach ($schema in $schemaRows) {
    $schemaMap[$schema.fieldName] = $schema.fieldType
}

# =========================
# LOAD DATA SHEET
# =========================

$dataRows = Import-Excel -Path $ExcelFile -WorksheetName "Data"

$result = @()

foreach ($row in $dataRows) {

    $item = [ordered]@{}

    foreach ($property in $row.PSObject.Properties) {

        $fieldName = $property.Name
        $value = $property.Value

        # Skip empty fields
        if ($null -eq $value -or $value -eq "") {
            continue
        }

        # Get field type from schema
        $fieldType = $schemaMap[$fieldName]

        switch ($fieldType) {

            # =========================
            # STRING
            # =========================
            "string" {
                $item[$fieldName] = [string]$value
            }

            # =========================
            # NUMBER
            # =========================
            "number" {
                $item[$fieldName] = [decimal]$value
            }

            # =========================
            # BOOLEAN
            # =========================
            "boolean" {
                $item[$fieldName] = [bool]$value
            }

            # =========================
            # SIMPLE ARRAY
            # Example:
            # Red|Blue|Green
            # =========================
            "array" {
                $item[$fieldName] = ($value -split '\|').ForEach({ $_.Trim() })
            }

            # =========================
            # IMAGE ARRAY
            # Example:
            # /img/a.jpg|/img/b.jpg
            # =========================
            "imageArray" {

                $images = @()
                $imageList = $value -split '\|'

                $sequence = 1

                foreach ($img in $imageList) {

                    $images += [ordered]@{
                        url = $img.Trim()
                        sequence = $sequence
                    }

                    $sequence++
                }

                $item[$fieldName] = $images
            }

            # =========================
            # AUTO-DETECT (Fallback)
            # =========================
            default {

                if ($value -match '^(true|false)$') {
                    $item[$fieldName] = [bool]$value
                }
                elseif ($value -match '^\d+(\.\d+)?$') {
                    $item[$fieldName] = [decimal]$value
                }
                else {
                    $item[$fieldName] = [string]$value
                }
            }
        }
    }

    $result += $item
}

# =========================
# GENERATE JSON
# =========================

$json = $result | ConvertTo-Json -Depth 20

# Save output file
$json | Out-File $OutputJson -Encoding utf8

Write-Host "JSON generated successfully: $OutputJson"
