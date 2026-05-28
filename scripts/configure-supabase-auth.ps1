# Configure Supabase Auth for TOLD Brand (project elwqdulkxprjmkejwcai — MCP / Vercel)
# Requires: Supabase Personal Access Token → https://supabase.com/dashboard/account/tokens
#
# Usage:
#   $env:SUPABASE_ACCESS_TOKEN = "sbp_..."
#   $env:GOOGLE_CLIENT_ID = "....apps.googleusercontent.com"
#   $env:GOOGLE_CLIENT_SECRET = "GOCSPX-..."
#   .\scripts\configure-supabase-auth.ps1

$ErrorActionPreference = "Stop"
$ProjectRef = "elwqdulkxprjmkejwcai"

if (-not $env:SUPABASE_ACCESS_TOKEN) {
  Write-Host "Set SUPABASE_ACCESS_TOKEN (https://supabase.com/dashboard/account/tokens)" -ForegroundColor Red
  exit 1
}

$headers = @{
  Authorization = "Bearer $($env:SUPABASE_ACCESS_TOKEN)"
  "Content-Type" = "application/json"
}

$body = @{
  site_url = "https://toldbrand.fr"
  uri_allow_list = "https://toldbrand.fr/auth/callback,http://localhost:3000/auth/callback"
  external_apple_enabled = $false
}

if ($env:GOOGLE_CLIENT_ID -and $env:GOOGLE_CLIENT_SECRET) {
  $body.external_google_enabled = $true
  $body.external_google_client_id = $env:GOOGLE_CLIENT_ID
  $body.external_google_secret = $env:GOOGLE_CLIENT_SECRET
}

$json = $body | ConvertTo-Json -Compress

Write-Host "PATCH auth config for $ProjectRef ..."
$response = Invoke-RestMethod `
  -Method PATCH `
  -Uri "https://api.supabase.com/v1/projects/$ProjectRef/config/auth" `
  -Headers $headers `
  -Body $json

Write-Host "OK — Site URL, redirect URLs, Apple disabled."
if ($env:GOOGLE_CLIENT_ID) {
  Write-Host "OK — Google provider enabled."
} else {
  Write-Host "Tip: set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google via API."
}

Write-Host ""
Write-Host "Google Cloud — Authorized redirect URI (one line):"
Write-Host "  https://$ProjectRef.supabase.co/auth/v1/callback"
