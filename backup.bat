@echo off
rem Change directory to where the Theme Kit is installed and the theme configuration file is located
cd C:\Users\eamon\shopify\PNB_For_Shopify_Github

rem Download the theme files
theme download --env=development

rem Change to the directory where your Git repository is located
cd C:\Users\eamon\shopify\PNB_For_Shopify_Github

rem Add changes to Git
git add .

rem Commit changes to Git
git commit -m "Backup Shopify theme files"

rem Push changes to the remote repository
git push origin main
