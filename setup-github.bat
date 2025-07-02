@echo off
echo ========================================
echo    CODSOFT GitHub Repository Setup
echo ========================================
echo.
echo Step 1: Create Repository on GitHub
echo -----------------------------------
echo 1. Go to: https://github.com/new
echo 2. Repository name: CODSOFT
echo 3. Description: CODSOFT Web Development Internship Projects
echo 4. Make it PUBLIC
echo 5. DO NOT initialize with README
echo 6. Click "Create repository"
echo.
echo Step 2: After creating the repository, run these commands:
echo --------------------------------------------------------
echo git remote remove origin
echo git remote add origin https://github.com/sanjayrockerz/CODSOFT.git
echo git push -u origin main
echo.
echo Step 3: Enable GitHub Pages
echo --------------------------
echo 1. Go to repository Settings
echo 2. Click "Pages" in sidebar
echo 3. Source: Deploy from branch
echo 4. Branch: main
echo 5. Folder: / (root)
echo 6. Click Save
echo.
echo Your projects will be live at:
echo - Landing Page: https://sanjayrockerz.github.io/CODSOFT/Task1-Landing-Page/
echo - Portfolio: https://sanjayrockerz.github.io/CODSOFT/Task2-Portfolio-Website/
echo.
echo ========================================
echo     Ready for CODSOFT Submission! 
echo ========================================
pause
