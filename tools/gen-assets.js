/* Генератор SVG-иллюстраций-заглушек для галереи свадебного сайта. */
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'assets');
fs.mkdirSync(outDir, { recursive: true });

const W = 800, H = 800;

const defs = `
  <filter id="grain" x="0" y="0">
    <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" result="n"/>
    <feColorMatrix in="n" type="saturate" values="0"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.06"/></feComponentTransfer>
  </filter>`;

function frame(inner, w, h) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img">
<defs>${defs}${inner.defs || ''}</defs>
${inner.bg || ''}
${inner.body}
<rect width="${w}" height="${h}" filter="url(#grain)" opacity="0.5"/>
</svg>`;
}

/* --- 1. Первое фото: солнце, сердце, веточки --- */
const photo1 = frame({
  defs: `<linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fdf1ea"/><stop offset="0.55" stop-color="#f6dbd2"/><stop offset="1" stop-color="#e9c2b8"/></linearGradient>`,
  bg: `<rect width="${W}" height="${H}" fill="url(#g1)"/>`,
  body: `
  <circle cx="400" cy="330" r="180" fill="#f8e3c4" opacity="0.85"/>
  <g fill="none" stroke="#c98c8c" stroke-width="4" stroke-linecap="round" opacity="0.85">
    <path d="M400 610C330 555 285 505 285 455c0-38 28-66 63-66 22 0 41 11 52 28 11-17 30-28 52-28 35 0 63 28 63 66 0 50-45 100-115 155z" fill="#e8a9a1" stroke="none"/>
  </g>
  <g stroke="#7d9479" stroke-width="3.5" fill="none" opacity="0.7" stroke-linecap="round">
    <path d="M120 720c60-40 120-160 128-300"/>
    <path d="M150 640c-30-14-44-40-44-70 30 4 46 26 50 52"/>
    <path d="M178 560c-28-16-40-42-38-72 30 6 44 28 46 54"/>
    <path d="M680 720c-60-40-120-160-128-300"/>
    <path d="M650 640c30-14 44-40 44-70-30 4-46 26-50 52"/>
    <path d="M622 560c28-16 40-42 38-72-30 6-44 28-46 54"/>
  </g>
  <text x="400" y="700" text-anchor="middle" font-family="Georgia, serif" font-size="34" fill="#8a7466" letter-spacing="6">СЧАСТЬЕ</text>
  <text x="400" y="742" text-anchor="middle" font-family="Georgia, serif" font-size="22" fill="#a8917f" letter-spacing="10">together</text>`
}, W, H);

/* --- 2. Помолвка: кольца --- */
const photo2 = frame({
  defs: `<linearGradient id="g2" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#f7efe7"/><stop offset="1" stop-color="#e3d3c4"/></linearGradient>`,
  bg: `<rect width="${W}" height="${H}" fill="url(#g2)"/>`,
  body: `
  <circle cx="400" cy="400" r="240" fill="#fff" opacity="0.35"/>
  <g fill="none" stroke="#c9a227" stroke-width="12">
    <circle cx="345" cy="415" r="105"/>
    <circle cx="455" cy="415" r="105" stroke="#d8b44a"/>
  </g>
  <g fill="none" stroke="#c9a227" stroke-width="9" stroke-linejoin="round">
    <path d="M455 300l22 34h-44z" fill="#f4e2b3"/>
    <circle cx="455" cy="352" r="12" fill="#f8edcf"/>
  </g>
  <g stroke="#b9c9b6" stroke-width="3" fill="none" opacity="0.8" stroke-linecap="round">
    <path d="M140 660c40-20 90-60 120-120"/>
    <path d="M660 660c-40-20-90-60-120-120"/>
  </g>
  <text x="400" y="700" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#8a7466" letter-spacing="8">ПОМОЛВКА</text>`
}, W, H);

/* --- 3. Путешествие: море и солнце --- */
const photo3 = frame({
  defs: `<linearGradient id="sky3" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f6e6d4"/><stop offset="1" stop-color="#e6cdbe"/></linearGradient>
   <linearGradient id="sea3" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#9fb7b3"/><stop offset="1" stop-color="#7d9a98"/></linearGradient>`,
  bg: `<rect width="${W}" height="${H}" fill="url(#sky3)"/><rect y="470" width="${W}" height="330" fill="url(#sea3)"/>`,
  body: `
  <circle cx="400" cy="380" r="120" fill="#f0c9a0" opacity="0.95"/>
  <g stroke="#f6e6d4" stroke-width="5" fill="none" opacity="0.55" stroke-linecap="round">
    <path d="M120 540h180M300 585h240M180 630h200M420 670h260M60 600h120"/>
  </g>
  <g fill="#5f7a78" opacity="0.9">
    <path d="M330 470l34-70 34 70z"/><path d="M380 470l40-96 40 96z"/><rect x="360" y="470" width="20" height="14"/>
  </g>
  <text x="400" y="120" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#8a7466" letter-spacing="8">ПУТЕШЕСТВИЯ</text>`
}, W, H);

/* --- 4. Осень --- */
const photo4 = frame({
  defs: `<linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#fbeedf"/><stop offset="1" stop-color="#e7c9ae"/></linearGradient>`,
  bg: `<rect width="${W}" height="${H}" fill="url(#g4)"/>`,
  body: `
  <circle cx="400" cy="380" r="210" fill="#fff" opacity="0.28"/>
  <g fill="#c98c6b" opacity="0.9">
    <ellipse cx="300" cy="330" rx="46" ry="26" transform="rotate(-25 300 330)"/>
    <ellipse cx="470" cy="300" rx="40" ry="22" transform="rotate(20 470 300)"/>
    <ellipse cx="520" cy="430" rx="44" ry="24" transform="rotate(-10 520 430)"/>
    <ellipse cx="270" cy="470" rx="38" ry="21" transform="rotate(35 270 470)"/>
    <ellipse cx="400" cy="500" rx="42" ry="23" transform="rotate(-40 400 500)"/>
  </g>
  <g stroke="#8a6a4f" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.8">
    <path d="M400 540c-30-70-14-140 20-190"/>
  </g>
  <text x="400" y="690" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#8a7466" letter-spacing="8">ОСЕНЬ</text>`
}, W, H);

/* --- 5. Праздник: бокалы --- */
const photo5 = frame({
  defs: `<linearGradient id="g5" x1="0" y1="1" x2="1" y2="0">
    <stop offset="0" stop-color="#f8ece4"/><stop offset="1" stop-color="#eadfd6"/></linearGradient>`,
  bg: `<rect width="${W}" height="${H}" fill="url(#g5)"/>`,
  body: `
  <circle cx="400" cy="390" r="230" fill="#fff" opacity="0.32"/>
  <g fill="none" stroke="#b08a52" stroke-width="8" stroke-linejoin="round" stroke-linecap="round">
    <path d="M320 250h100l-14 110a36 36 0 0 1-72 0z"/>
    <path d="M370 396v130M330 540h80"/>
    <path d="M470 290h100l-14 110a36 36 0 0 1-72 0z" stroke="#c9a227"/>
    <path d="M520 436v130M480 580h80"/>
  </g>
  <g fill="#f4e2b3" opacity="0.85">
    <circle cx="640" cy="270" r="7"/><circle cx="190" cy="330" r="6"/>
    <circle cx="600" cy="480" r="5"/><circle cx="230" cy="520" r="6"/>
  </g>
  <text x="400" y="700" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#8a7466" letter-spacing="8">ПРАЗДНИК</text>`
}, W, H);

/* --- 6. Мы вдвоём: силуэты --- */
const photo6 = frame({
  defs: `<linearGradient id="g6" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#f6e2dc"/><stop offset="1" stop-color="#dcc3bb"/></linearGradient>`,
  bg: `<rect width="${W}" height="${H}" fill="url(#g6)"/>`,
  body: `
  <circle cx="400" cy="300" r="150" fill="#fdf3ec" opacity="0.8"/>
  <g fill="#7c6a5e" opacity="0.92">
    <circle cx="352" cy="330" r="42"/>
    <path d="M352 380c-46 0-74 40-78 120h96c-2-46 10-80 34-104-14-10-32-16-52-16z"/>
    <circle cx="452" cy="316" r="45"/>
    <path d="M452 370c-22 0-40 7-54 18 22 24 34 60 32 112h94c-6-84-32-130-72-130z"/>
  </g>
  <path d="M406 470c-14-22-8-46 8-58 16 12 22 36 8 58z" fill="#c9a227"/>
  <g stroke="#b9c9b6" stroke-width="3" fill="none" opacity="0.7" stroke-linecap="round">
    <path d="M120 720c70-30 130-110 150-210"/>
    <path d="M680 720c-70-30-130-110-150-210"/>
  </g>
  <text x="400" y="700" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#6f5d51" letter-spacing="8">МЫ ВДВОЁМ</text>`
}, W, H);

/* --- Favicon --- */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
<rect width="64" height="64" rx="14" fill="#fdfaf7"/>
<circle cx="32" cy="30" r="14" fill="none" stroke="#c9a227" stroke-width="3"/>
<path d="M32 48c-8-6-13-11-13-16a7 7 0 0 1 13-4 7 7 0 0 1 13 4c0 5-5 10-13 16z" fill="#e8a9a1" opacity="0.9"/>
</svg>`;

const files = {
  'photo-1.svg': photo1,
  'photo-2.svg': photo2,
  'photo-3.svg': photo3,
  'photo-4.svg': photo4,
  'photo-5.svg': photo5,
  'photo-6.svg': photo6,
  'favicon.svg': favicon
};

for (const [name, content] of Object.entries(files)) {
  fs.writeFileSync(path.join(outDir, name), content, 'utf8');
  console.log('written', name, content.length, 'bytes');
}
