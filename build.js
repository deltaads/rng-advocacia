const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src');
const DIST = path.join(__dirname, 'dist');
const LOGO = '<img src="./images/logo/logo.webp" alt="RNG Advocacia" class="h-10 w-auto">';

function loadSection(name) {
  const filePath = path.join(SRC, 'sections', name + '.html');
  return fs.readFileSync(filePath, 'utf-8').replace('{{logo}}', LOGO);
}

function resolveImages(html) {
  const localImages = {
    hero: { file: 'hero.jpg', local: './images/hero/hero.jpg', fallback: 'https://picsum.photos/seed/rng-law-office/1920/1080' },
    about: { file: 'about.jpg', local: './images/about/about.jpg', fallback: 'https://picsum.photos/seed/rng-escritorio/700/850' },
    cta: { file: 'cta.jpg', local: './images/cta/cta.jpg', fallback: 'https://picsum.photos/seed/rng-cta/1920/800' },
  };
  return html.replace(/\{\{img:([^}]+)\}\}/g, (_, key) => {
    const img = localImages[key];
    if (!img) return '';
    const localPath = path.join(__dirname, 'images', key, img.file);
    return fs.existsSync(localPath) ? img.local : img.fallback;
  });
}

if (!fs.existsSync(DIST)) fs.mkdirSync(DIST, { recursive: true });

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

const imagesDest = path.join(DIST, 'images');
if (fs.existsSync(path.join(__dirname, 'images'))) copyDir(path.join(__dirname, 'images'), imagesDest);

const template = fs.readFileSync(path.join(SRC, 'template.html'), 'utf-8');

const sections = ['navbar', 'hero', 'sobre', 'numeros', 'areas', 'depoimentos', 'cta', 'footer']
  .map(loadSection)
  .join('\n');

const css = fs.readFileSync(path.join(SRC, 'css', 'style.css'), 'utf-8');
const js = fs.readFileSync(path.join(SRC, 'js', 'main.js'), 'utf-8');

let html = template
  .replace('{{title}}', 'RNG Advocacia | Soluções Jurídicas em Gravataí | Direito Previdenciário, Trabalhista e Cível')
  .replace('{{description}}', 'RNG Advocacia em Gravataí/RS — desde 2005 oferecendo soluções jurídicas diferenciadas em Direito Previdenciário, Trabalhista e Cível. Atendimento personalizado e online em todo Brasil.')
  .replace('{{sections}}', sections)
  .replace('{{css}}', css)
  .replace('{{js}}', js);

html = resolveImages(html);

fs.writeFileSync(path.join(DIST, 'index.html'), html, 'utf-8');

console.log('Build concluido! -> dist/index.html');
