const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('d:/MindCare1/frontend/src/pages', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Remove imports
    content = content.replace(/import\s+Navbar\s+from\s+['"][^'"]+Navbar['"];?\n?/g, '');
    content = content.replace(/import\s+Footer\s+from\s+['"][^'"]+Footer['"];?\n?/g, '');
    
    // Remove tags (allowing potential preceding whitespace)
    content = content.replace(/^\s*<Navbar\s*\/>\r?\n/gm, '');
    content = content.replace(/^\s*<Footer\s*\/>\r?\n/gm, '');
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed ' + filePath);
    }
  }
});
