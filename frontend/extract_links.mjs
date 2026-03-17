import fs from 'fs';
import path from 'path';

const srcDir = 'd:/MindCare1/frontend/src';
const routes = [];
const navigation = [];

const appContent = fs.readFileSync(path.join(srcDir, 'App.tsx'), 'utf-8');
const appLines = appContent.split('\n');
appLines.forEach((line, i) => {
  if (line.includes('path=') || line.match(/path\s*:/)) {
    routes.push(`${i+1} => ${line.trim()}`);
  }
});
fs.writeFileSync('d:/MindCare1/frontend/extracted_routes.txt', routes.join('\n'));

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      walk(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
      lines.forEach((line, i) => {
        if (/navigate\(|to=\{?["'`]|href=/.test(line)) {
           if (line.includes('import ') && line.includes('from ')) return;
           const normPath = filePath.replace(/\\/g, '/').replace(srcDir, '');
           navigation.push(`${normPath}:${i+1} => ${line.trim()}`);
        }
      });
    }
  }
}

walk(srcDir);
fs.writeFileSync('d:/MindCare1/frontend/navigation_links.txt', navigation.join('\n'));
console.log('Routes: ' + routes.length + ', Navigation: ' + navigation.length);
