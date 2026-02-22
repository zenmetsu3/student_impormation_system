const ghpages = require('gh-pages');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment...');

// Create .nojekyll file to prevent GitHub from treating it as a Jekyll site
const publicDir = path.join(__dirname, '../public');
const noJekyllPath = path.join(publicDir, '.nojekyll');

try {
    fs.writeFileSync(noJekyllPath, '');
    console.log('✅ Created .nojekyll file');
} catch (err) {
    console.error('❌ Error creating .nojekyll file:', err);
    process.exit(1);
}

// Deploy 'public' folder to 'gh-pages' branch
ghpages.publish(publicDir, {
    branch: 'gh-pages',
    message: 'Deploy frontend to GitHub Pages',
    dotfiles: true // Include .nojekyll
}, (err) => {
    if (err) {
        console.error('❌ Deployment failed:', err);
        process.exit(1);
    } else {
        console.log('✅ Deployment successful! Check your GitHub repository settings for the Pages URL.');
        console.log('⚠️  Note: This deployment only serves static files. API endpoints will NOT work on GitHub Pages.');
    }
});
