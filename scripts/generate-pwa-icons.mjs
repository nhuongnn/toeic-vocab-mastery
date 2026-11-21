import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ICONS_DIR = path.resolve('public/icons');
const SCREENSHOTS_DIR = path.resolve('public/screenshots');

if (!fs.existsSync(ICONS_DIR)) fs.mkdirSync(ICONS_DIR, { recursive: true });
if (!fs.existsSync(SCREENSHOTS_DIR)) fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

function createSvg(size, maskable = false) {
  const padding = maskable ? size * 0.1 : 0;
  const innerSize = size - padding * 2;
  const radius = maskable ? 0 : size * 0.22;
  const cx = size / 2;

  const sparkleSize = innerSize * 0.28;
  const titleFontSize = Math.round(innerSize * 0.23);
  const subFontSize = Math.round(innerSize * 0.095);

  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#312e81" />
        <stop offset="35%" stop-color="#4f46e5" />
        <stop offset="75%" stop-color="#7c3aed" />
        <stop offset="100%" stop-color="#db2777" />
      </linearGradient>
      <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="100%" stop-color="#e0e7ff" />
      </linearGradient>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="${Math.max(1, size * 0.02)}" stdDeviation="${Math.max(2, size * 0.03)}" flood-color="#000000" flood-opacity="0.4" />
      </filter>
    </defs>
    
    <!-- Background -->
    <rect x="${padding}" y="${padding}" width="${innerSize}" height="${innerSize}" rx="${radius}" fill="url(#grad)" />
    
    <!-- Decorative subtle inner glow border -->
    <rect x="${padding + 3}" y="${padding + 3}" width="${innerSize - 6}" height="${innerSize - 6}" rx="${Math.max(0, radius - 3)}" fill="none" stroke="rgba(255,255,255,0.22)" stroke-width="${Math.max(1.5, size * 0.015)}" />

    <!-- Center Emblem: Stylized Sparkle Symbol -->
    <g transform="translate(${cx}, ${size * 0.35})">
      <!-- 4-point Sparkle Star -->
      <path d="M 0, -${sparkleSize * 0.65} Q 0, 0 ${sparkleSize * 0.65}, 0 Q 0, 0 0, ${sparkleSize * 0.65} Q 0, 0 -${sparkleSize * 0.65}, 0 Q 0, 0 0, -${sparkleSize * 0.65} Z" fill="url(#sparkleGrad)" filter="url(#shadow)" />
      <!-- Secondary diagonal smaller sparkle -->
      <path d="M 0, -${sparkleSize * 0.25} Q 0, 0 ${sparkleSize * 0.25}, 0 Q 0, 0 0, ${sparkleSize * 0.25} Q 0, 0 -${sparkleSize * 0.25}, 0 Q 0, 0 0, -${sparkleSize * 0.25} Z" fill="#ffffff" transform="rotate(45)" opacity="0.9" />
      <!-- Center dot -->
      <circle cx="0" cy="0" r="${sparkleSize * 0.09}" fill="#ffffff" />
    </g>
    
    <!-- Wordmark: TOEIC -->
    <text x="50%" y="${size * 0.67}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="${titleFontSize}" fill="#ffffff" text-anchor="middle" dominant-baseline="middle" letter-spacing="${size * 0.025}" filter="url(#shadow)">
      TOEIC
    </text>

    <!-- Subtitle: MASTERY -->
    <text x="50%" y="${size * 0.83}" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="${subFontSize}" fill="#c7d2fe" text-anchor="middle" dominant-baseline="middle" letter-spacing="${size * 0.04}" opacity="0.95">
      MASTERY
    </text>
  </svg>
  `;
}

function createBadgeSvg(size) {
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="#6366f1" />
    <text x="50%" y="54%" font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="bold" font-size="${size * 0.5}" fill="#ffffff" text-anchor="middle" dominant-baseline="middle">
      T
    </text>
  </svg>
  `;
}

function createScreenshotSvg(width, height, title, subtitle) {
  return `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#090d16" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)" />
    <rect x="20" y="40" width="${width - 40}" height="100" rx="16" fill="#1e1b4b" stroke="#312e81" stroke-width="2" />
    <text x="40" y="85" font-family="system-ui, sans-serif" font-weight="800" font-size="28" fill="#ffffff">
      TOEIC Deep Mastery
    </text>
    <text x="40" y="115" font-family="system-ui, sans-serif" font-weight="500" font-size="16" fill="#818cf8">
      ${title}
    </text>

    <!-- Content cards -->
    <rect x="20" y="160" width="${width - 40}" height="180" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <text x="40" y="210" font-family="system-ui, sans-serif" font-weight="700" font-size="22" fill="#38bdf8">
      ${subtitle}
    </text>
    <rect x="40" y="240" width="220" height="40" rx="8" fill="#4f46e5" />
    <text x="150" y="265" font-family="system-ui, sans-serif" font-weight="600" font-size="16" fill="#ffffff" text-anchor="middle">
      Bắt đầu ngay
    </text>

    <rect x="20" y="360" width="${width - 40}" height="280" rx="16" fill="#0f172a" stroke="#1e293b" stroke-width="2" />
    <circle cx="70" cy="420" r="30" fill="#3b82f6" fill-opacity="0.2" />
    <text x="70" y="426" font-family="system-ui, sans-serif" font-weight="800" font-size="20" fill="#60a5fa" text-anchor="middle">TOEIC</text>
    <text x="120" y="415" font-family="system-ui, sans-serif" font-weight="700" font-size="18" fill="#f8fafc">Hệ thống đề thi chuẩn</text>
    <text x="120" y="440" font-family="system-ui, sans-serif" font-size="14" fill="#94a3b8">Mini Reading, Full Reading &amp; Part 5-7</text>
  </svg>
  `;
}

async function run() {
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  for (const size of sizes) {
    const svg = createSvg(size, false);
    await sharp(Buffer.from(svg))
      .png()
      .toFile(path.join(ICONS_DIR, `icon-${size}.png`));
    console.log(`Generated icon-${size}.png`);
  }

  // Maskable 512
  const maskableSvg = createSvg(512, true);
  await sharp(Buffer.from(maskableSvg))
  .png()
  .toFile(path.join(ICONS_DIR, 'icon-512-maskable.png'));
  console.log('Generated icon-512-maskable.png');

  // Notification icons in public/
  const notifSvg = createSvg(192, false);
  await sharp(Buffer.from(notifSvg))
    .png()
    .toFile(path.resolve('public/notification-icon-192.png'));
  console.log('Generated public/notification-icon-192.png');

  const badgeSvg = createBadgeSvg(72);
  await sharp(Buffer.from(badgeSvg))
    .png()
    .toFile(path.resolve('public/notification-badge-72.png'));
  console.log('Generated public/notification-badge-72.png');

  // Screenshots
  const ss1 = createScreenshotSvg(390, 844, 'Học 3,675 từ vựng TOEIC với SRS', 'Chinh phục mọi thang điểm mục tiêu (550 - 990)');
  await sharp(Buffer.from(ss1))
    .png()
    .toFile(path.join(SCREENSHOTS_DIR, 'mobile-home.png'));

  const ss2 = createScreenshotSvg(390, 844, 'Luyện đề Mock Test TOEIC', 'Mô phỏng kỳ thi thật chuẩn format');
  await sharp(Buffer.from(ss2))
    .png()
    .toFile(path.join(SCREENSHOTS_DIR, 'mobile-practice.png'));

  console.log('Done generating all PWA and notification assets.');
}

run().catch(console.error);
