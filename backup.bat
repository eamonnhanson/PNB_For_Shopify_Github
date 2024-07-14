@echo off
rem Change directory to where the Theme Kit is installed and the theme configuration file is located
cd C:\Users\eamon\shopify\PNB_For_Shopify_Github

rem Download the theme files
theme download --env=development

rem Change to the directory where your Git repository is located
cd C:\Users\eamon\shopify\PNB_For_Shopify_Github

rem Add changes to Git
git add .
