const { execSync } = require('child_process');
const fs = require('fs');
try {
  const result = execSync('npm run build', { encoding: 'utf-8' });
  fs.writeFileSync('build-out.txt', result);
} catch (e) {
  fs.writeFileSync('build-out.txt', (e.stdout || '') + '\n' + (e.stderr || '') + '\n' + (e.message || ''));
}
