#!/usr/bin/env node
/**
 * 🎨 TOEIC Vocabulary Image Batch Generator
 * 
 * Generates and saves high-quality visual anchor illustrations locally into /public/images/vocabulary/
 * based on each word's specific `imageDescription` (Visual Scene Description) and `imageKeyword`.
 * 
 * Usage:
 *   node scripts/generate-vocabulary-images.mjs [options]
 * 
 * Options:
 *   --engine <cloudflare|pollinations|pixabay|pexels|unsplash|wikimedia>  (default: cloudflare if keys exist, else pollinations)
 *   --category <category>   Filter words by category (e.g., finance, dining, communications)
 *   --word <word>           Target a specific word
 *   --id <id>               Target a specific word ID
 *   --limit <number>        Only process the first N words
 *   --force                 Overwrite existing local images
 *   --update-data           Update src/data/vocabulary/*.ts with imageUrl: '/images/vocabulary/<id>.jpg'
 *   --style <3d|photo|art>  Prompt style preset for AI generator (default: 3d)
 *   --delay <seconds>       Delay between requests in seconds (default: 46 for free pollinations, 1 for others)
 * 
 * API Keys (can also be set in .env or .env.local):
 *   POLLINATIONS_API_KEY    For unlimited fast Pollinations AI generations
 *   PIXABAY_API_KEY         For instant Pixabay stock photography / illustrations (5000 req/hr free)
 *   PEXELS_API_KEY          For Pexels stock photography (200 req/hr free)
 *   UNSPLASH_ACCESS_KEY     For Unsplash stock photography (50 req/hr free)
 */

import fs from 'fs';
import path from 'path';
import ts from 'typescript';

// 1. Load environment variables from .env or .env.local if present
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const envFile of envFiles) {
    const envPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      }
    }
  }
}

loadEnv();

// 2. Parse CLI Arguments
const args = process.argv.slice(2);
function getArg(flag, defaultValue = null) {
  const idx = args.indexOf(flag);
  if (idx !== -1 && idx + 1 < args.length) {
    return args[idx + 1];
  }
  return defaultValue;
}
const hasArg = (flag) => args.includes(flag);

const defaultEngine = (process.env.CLOUDFLARE_ACCOUNT_ID && process.env.CLOUDFLARE_API_TOKEN) ? 'cloudflare' : 'pollinations';
const ENGINE = getArg('--engine', defaultEngine).toLowerCase();
const CATEGORY = getArg('--category');
const TARGET_WORD = getArg('--word');
const TARGET_ID = getArg('--id');
const LIMIT = getArg('--limit') ? parseInt(getArg('--limit'), 10) : null;
const FORCE = hasArg('--force');
const UPDATE_DATA = hasArg('--update-data');
const STYLE = getArg('--style', '3d').toLowerCase();
const DELAY = getArg('--delay')
  ? parseFloat(getArg('--delay'))
  : ENGINE === 'cloudflare'
  ? 0.5
  : ENGINE === 'pollinations' && !process.env.POLLINATIONS_API_KEY
  ? 46 // Pollinations free tier rate limit: 1 request every 45s per IP
  : 1.2;

const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'vocabulary');
const VOCAB_DIR = path.join(process.cwd(), 'src', 'data', 'vocabulary');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 3. Load all vocabulary words using TypeScript compiler in memory
function loadAllVocabularyWords() {
  const files = fs.readdirSync(VOCAB_DIR).filter((f) => f.endsWith('.ts') && f !== 'index.ts');
  const allWords = [];

  for (const file of files) {
    const filePath = path.join(VOCAB_DIR, file);
    const code = fs.readFileSync(filePath, 'utf8');
    const jsCode = ts.transpileModule(code, {
      compilerOptions: { module: ts.ModuleKind.CommonJS },
    }).outputText;

    const mod = {};
    const fn = new Function('exports', 'require', jsCode);
    fn(mod, () => ({}));

    const wordList = Object.values(mod).find(Array.isArray) || [];
    for (const word of wordList) {
      allWords.push({
        ...word,
        _file: file,
        _filePath: filePath,
      });
    }
  }

  return allWords;
}

// 4. Style Prompt Formatter for AI Generation
function buildAiPrompt(word, description, keyword, stylePreset) {
  const baseDescription = description || keyword || word;

  let styleModifier = '';
  switch (stylePreset) {
    case 'realistic':
      styleModifier =
        'Award-winning documentary editorial photography, realistic workplace and daily life setting, cinematic natural lighting, 35mm lens, sharp focus, 8k, no text, no watermark, no blur';
      break;
    case 'art':
      styleModifier =
        'Vibrant digital concept illustration, clean modern vector art style, expressive composition, high resolution, no text, no watermark';
      break;
    case '3d':
    default:
      styleModifier =
        'Crisp 3D isometric conceptual illustration, educational visual anchor, Pixar Blender clay style, clean studio rim lighting, vivid colors, depth of field, 8k render, no text, no letters, no watermark';
      break;
  }

  return `${baseDescription}. ${styleModifier}`;
}

// 5. Engine Implementations
async function fetchImageBuffer(url, headers = {}) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`HTTP ${res.status}: ${res.statusText} - ${text.slice(0, 150)}`);
  }
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Engine: Cloudflare Workers AI
async function downloadFromCloudflare(wordObj) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) {
    throw new Error('CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN is not defined in .env.local');
  }

  const prompt = buildAiPrompt(
    wordObj.word,
    wordObj.visual?.imageDescription,
    wordObj.visual?.imageKeyword,
    STYLE
  );

  const model = process.env.CLOUDFLARE_AI_MODEL || '@cf/black-forest-labs/flux-1-schnell';
  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;

  const isFlux = model.includes('flux');
  const payload = {
    prompt,
    ...(isFlux ? { steps: 4 } : { num_steps: 4 }),
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Cloudflare AI error ${res.status}: ${errText.slice(0, 150)}`);
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (data.result?.image) {
      return Buffer.from(data.result.image, 'base64');
    }
  }

  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

// Engine: Pollinations.ai (Flux)
async function downloadFromPollinations(wordObj) {
  const prompt = buildAiPrompt(
    wordObj.word,
    wordObj.visual?.imageDescription,
    wordObj.visual?.imageKeyword,
    STYLE
  );

  const seed = Math.abs(
    (wordObj.id || wordObj.word).split('').reduce((acc, c) => (acc * 31 + c.charCodeAt(0)) | 0, 0) % 100000
  );

  const apiKey = process.env.POLLINATIONS_API_KEY;

  if (apiKey) {
    // Official Auth API endpoint with high performance & no IP rate-limit
    const queryParams = new URLSearchParams({
      width: '800',
      height: '450',
      seed: String(seed),
      model: 'black-forest-labs/flux.1-schnell',
    });

    const url = `https://gen.pollinations.ai/image/${encodeURIComponent(prompt)}?${queryParams.toString()}`;
    return await fetchImageBuffer(url, {
      'Authorization': `Bearer ${apiKey}`,
      'User-Agent': 'Mozilla/5.0',
    });
  } else {
    // Legacy anonymous endpoint
    const queryParams = new URLSearchParams({
      width: '800',
      height: '450',
      nologo: 'true',
      seed: String(seed),
      model: 'flux',
    });

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?${queryParams.toString()}`;
    return await fetchImageBuffer(url, {
      'User-Agent': 'Mozilla/5.0',
    });
  }
}

// Engine: Pixabay API
async function downloadFromPixabay(wordObj) {
  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) {
    throw new Error('PIXABAY_API_KEY is not defined. Please set it in .env.local or environment.');
  }

  const searchTerm = (wordObj.visual?.imageKeyword || wordObj.word)
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .slice(0, 3)
    .join(' ');

  const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    searchTerm
  )}&image_type=photo&orientation=horizontal&per_page=3&safesearch=true`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Pixabay API error: ${res.status}`);
  const data = await res.json();

  if (!data.hits || data.hits.length === 0) {
    throw new Error(`No image found on Pixabay for "${searchTerm}"`);
  }

  const photo = data.hits[0];
  const downloadUrl = photo.largeImageURL || photo.webformatURL;
  return await fetchImageBuffer(downloadUrl);
}

// Engine: Pexels API
async function downloadFromPexels(wordObj) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    throw new Error('PEXELS_API_KEY is not defined. Please set it in .env.local or environment.');
  }

  const searchTerm = (wordObj.visual?.imageKeyword || wordObj.word)
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .slice(0, 3)
    .join(' ');

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    searchTerm
  )}&per_page=3&orientation=landscape`;

  const res = await fetch(url, { headers: { Authorization: apiKey } });
  if (!res.ok) throw new Error(`Pexels API error: ${res.status}`);
  const data = await res.json();

  if (!data.photos || data.photos.length === 0) {
    throw new Error(`No image found on Pexels for "${searchTerm}"`);
  }

  const photo = data.photos[0];
  const downloadUrl = photo.src.large2x || photo.src.large || photo.src.medium;
  return await fetchImageBuffer(downloadUrl);
}

// Engine: Wikimedia Commons API
async function downloadFromWikimedia(wordObj) {
  const searchTerm = (wordObj.visual?.imageKeyword || wordObj.word)
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .slice(0, 3)
    .join(' ');

  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
    searchTerm
  )}&gsrnamespace=6&gsrlimit=1&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json`;

  const res = await fetch(url, { headers: { 'User-Agent': 'ToeicVocabMastery/1.0' } });
  if (!res.ok) throw new Error(`Wikimedia API error: ${res.status}`);
  const data = await res.json();

  const pages = data.query?.pages || {};
  const firstPage = Object.values(pages)[0];
  const imgInfo = firstPage?.imageinfo?.[0];
  const downloadUrl = imgInfo?.thumburl || imgInfo?.url;

  if (!downloadUrl) {
    throw new Error(`No image found on Wikimedia Commons for "${searchTerm}"`);
  }

  return await fetchImageBuffer(downloadUrl, { 'User-Agent': 'ToeicVocabMastery/1.0' });
}

// 6. Safe Update for TypeScript Data Files
function updateWordInTsFile(filePath, wordId, newImageUrl) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Find the word entry by its id: 'wordId' or id: "wordId"
  const idRegex = new RegExp(`(id:\\s*['"]${wordId}['"][\\s\\S]*?visual:\\s*\\{)([^}]+)(\\})`, 'm');
  const match = content.match(idRegex);

  if (!match) return false;

  const visualBlock = match[2];

  let newVisualBlock;
  if (/imageUrl:\s*['"][^'"]*['"]/.test(visualBlock)) {
    // Replace existing imageUrl
    newVisualBlock = visualBlock.replace(
      /imageUrl:\s*['"][^'"]*['"]/,
      `imageUrl: '${newImageUrl}'`
    );
  } else {
    // Append imageUrl before the closing bracket of visual
    newVisualBlock = visualBlock.trimEnd() + `\n      imageUrl: '${newImageUrl}',\n    `;
  }

  content = content.replace(match[0], match[1] + newVisualBlock + match[3]);
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

// 7. Main Runner
async function main() {
  console.log('='.repeat(70));
  console.log('🎨 TOEIC VOCABULARY LOCAL IMAGE GENERATOR');
  console.log('='.repeat(70));
  console.log(`• Engine:       ${ENGINE.toUpperCase()} (Style: ${STYLE})`);
  console.log(`• Output Dir:   ${OUTPUT_DIR}`);
  console.log(`• Delay:        ${DELAY}s per word`);
  console.log(`• Update Data:  ${UPDATE_DATA ? 'YES' : 'NO'}`);
  if (CATEGORY) console.log(`• Filter Cat:   ${CATEGORY}`);
  if (TARGET_WORD) console.log(`• Filter Word:  ${TARGET_WORD}`);
  if (LIMIT) console.log(`• Limit:        ${LIMIT} words`);
  console.log('='.repeat(70));

  const allWords = loadAllVocabularyWords();
  console.log(`\n📚 Total words in repository: ${allWords.length}`);

  let filteredWords = allWords;

  if (CATEGORY) {
    filteredWords = filteredWords.filter(
      (w) => w.category?.toLowerCase() === CATEGORY.toLowerCase() || w._file.startsWith(CATEGORY)
    );
  }
  if (TARGET_WORD) {
    filteredWords = filteredWords.filter(
      (w) => w.word.toLowerCase() === TARGET_WORD.toLowerCase()
    );
  }
  if (TARGET_ID) {
    filteredWords = filteredWords.filter((w) => w.id === TARGET_ID);
  }
  if (LIMIT && LIMIT > 0) {
    filteredWords = filteredWords.slice(0, LIMIT);
  }

  console.log(`🎯 Words to process in this run: ${filteredWords.length}\n`);

  if (filteredWords.length === 0) {
    console.log('⚠️ No words match your criteria.');
    return;
  }

  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < filteredWords.length; i++) {
    const wordObj = filteredWords[i];
    const safeFilename = `${wordObj.id.toLowerCase().replace(/[^a-z0-9_-]/g, '_')}.jpg`;
    const outputPath = path.join(OUTPUT_DIR, safeFilename);
    const progress = `[${i + 1}/${filteredWords.length}]`;

    // Check if already exists
    if (!FORCE && fs.existsSync(outputPath)) {
      const stats = fs.statSync(outputPath);
      if (stats.size > 3000) {
        console.log(`${progress} ⏩ SKIP "${wordObj.word}" (${wordObj.id}) - Already exists (${(stats.size / 1024).toFixed(1)} KB)`);
        skippedCount++;

        if (UPDATE_DATA) {
          updateWordInTsFile(wordObj._filePath, wordObj.id, `/images/vocabulary/${safeFilename}`);
        }
        continue;
      }
    }

    console.log(`${progress} ⏳ Generating "${wordObj.word}" (${wordObj.id})...`);
    console.log(`   📝 Scene: "${wordObj.visual?.imageDescription?.slice(0, 90)}..."`);

    let buffer = null;
    let attempts = 0;
    const maxAttempts = 3;

    while (attempts < maxAttempts && !buffer) {
      attempts++;
      try {
        if (ENGINE === 'cloudflare') {
          buffer = await downloadFromCloudflare(wordObj);
        } else if (ENGINE === 'pixabay') {
          buffer = await downloadFromPixabay(wordObj);
        } else if (ENGINE === 'pexels') {
          buffer = await downloadFromPexels(wordObj);
        } else if (ENGINE === 'wikimedia') {
          buffer = await downloadFromWikimedia(wordObj);
        } else {
          buffer = await downloadFromPollinations(wordObj);
        }
      } catch (err) {
        const errMsg = err.message || '';
        // If 402 Free Limit on Pollinations, wait with a countdown and retry
        if (errMsg.includes('402') || errMsg.includes('FREE_LIMIT')) {
          console.warn(`   ⚠️ Pollinations free rate limit hit (402). Waiting 48s for cooldown...`);
          for (let s = 48; s > 0; s -= 5) {
            process.stdout.write(`   ⏳ Resuming in ${s}s... \r`);
            await new Promise((r) => setTimeout(r, 5000));
          }
          console.log('\n   🔄 Retrying now...');
        } else {
          console.error(`   ❌ Attempt ${attempts} failed:`, errMsg);
          if (attempts < maxAttempts) {
            await new Promise((r) => setTimeout(r, 2000));
          }
        }
      }
    }

    if (buffer && buffer.length > 1000) {
      fs.writeFileSync(outputPath, buffer);
      console.log(`   ✅ SAVED ${safeFilename} (${(buffer.length / 1024).toFixed(1)} KB)`);
      successCount++;

      if (UPDATE_DATA) {
        const updated = updateWordInTsFile(wordObj._filePath, wordObj.id, `/images/vocabulary/${safeFilename}`);
        if (updated) {
          console.log(`   📝 Updated ${wordObj._file} with imageUrl: '/images/vocabulary/${safeFilename}'`);
        }
      }

      // Delay between words to stay respectful of free API tiers
      if (i < filteredWords.length - 1 && DELAY > 0) {
        await new Promise((r) => setTimeout(r, DELAY * 1000));
      }
    } else {
      console.error(`   ❌ Failed to generate image for "${wordObj.word}"`);
      failedCount++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log('🎉 BATCH GENERATION COMPLETED');
  console.log(`• Success:  ${successCount}`);
  console.log(`• Skipped:  ${skippedCount}`);
  console.log(`• Failed:   ${failedCount}`);
  console.log(`• Folder:   ${OUTPUT_DIR}`);
  console.log('='.repeat(70));
}

main().catch((err) => {
  console.error('\n💥 Fatal Error:', err);
  process.exit(1);
});
