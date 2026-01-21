$dest = "packageSettings/pages"
if (-not (Test-Path $dest)) { New-Item -ItemType Directory -Force -Path $dest }
$folders = @("settings", "profile-edit", "general", "storage", "account-security", "phone-binding", "real-name", "login-devices", "account-recovery", "recovery-wechat", "recovery-idcard", "recovery-phone", "security-knowledge", "password", "account-binding", "account-cancellation", "privacy-permissions")
foreach ($f in $folders) { 
    if (Test-Path "pages/$f") { 
        Write-Host "Moving $f..."
        Move-Item -Path "pages/$f" -Destination "$dest/" 
    } 
}
Write-Host "Done."