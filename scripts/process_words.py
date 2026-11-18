import json
import re
import os
import asyncio

SCHEMA = {
    "type": "object",
    "properties": {
        "words": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "id": {"type": "string"},
                    "word": {"type": "string"},
                    "partOfSpeech": {"type": "array", "items": {"type": "string"}},
                    "category": {"type": "string"},
                    "level": {"type": "string", "enum": ["essential", "intermediate", "advanced"]},
                    "toeicFrequency": {"type": "number"},
                    "pronunciation": {
                        "type": "object",
                        "properties": {
                            "ipa": {"type": "string"},
                            "audioUrl": {"type": "string"},
                            "syllableBreakdown": {"type": "string"},
                            "stressPattern": {"type": "string"},
                            "commonMistakes": {"type": "string"}
                        },
                        "required": ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
                    },
                    "etymology": {
                        "type": "object",
                        "properties": {
                            "origin": {"type": "string"},
                            "rootWord": {"type": "string"},
                            "rootMeaning": {"type": "string"},
                            "evolution": {"type": "string"},
                            "relatedLanguages": {"type": "array", "items": {"type": "string"}},
                            "firstRecordedUse": {"type": "string"}
                        },
                        "required": ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
                    },
                    "deepMeaning": {
                        "type": "object",
                        "properties": {
                            "coreConcept": {"type": "string"},
                            "spatialContext": {"type": "string"},
                            "temporalContext": {"type": "string"},
                            "emotionalTone": {"type": "string"},
                            "formalityLevel": {"type": "string", "enum": ["formal", "neutral", "informal"]},
                            "connotation": {"type": "string", "enum": ["positive", "neutral", "negative"]}
                        },
                        "required": ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
                    },
                    "nativeMindset": {
                        "type": "object",
                        "properties": {
                            "howNativesThink": {"type": "string"},
                            "mentalImage": {"type": "string"},
                            "whenToUse": {"type": "string"},
                            "whenNotToUse": {"type": "string"},
                            "culturalContext": {"type": "string"}
                        },
                        "required": ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
                    },
                    "examples": {
                        "type": "object",
                        "properties": {
                            "daily": {"type": "array", "items": {"type": "string"}},
                            "business": {"type": "array", "items": {"type": "string"}},
                            "conversation": {"type": "array", "items": {"type": "string"}},
                            "collocations": {"type": "array", "items": {"type": "string"}}
                        },
                        "required": ["daily", "business", "conversation", "collocations"]
                    },
                    "wordFamily": {
                        "type": "object",
                        "properties": {
                            "noun": {"type": "string"},
                            "verb": {"type": "string"},
                            "adjective": {"type": "string"},
                            "adverb": {"type": "string"}
                        }
                    },
                    "visual": {
                        "type": "object",
                        "properties": {
                            "imageKeyword": {"type": "string"},
                            "imageDescription": {"type": "string"},
                            "mnemonic": {"type": "string"}
                        },
                        "required": ["imageKeyword", "imageDescription", "mnemonic"]
                    },
                    "video": {
                        "type": "object",
                        "properties": {
                            "description": {"type": "string"}
                        },
                        "required": ["description"]
                    },
                    "toeicContext": {
                        "type": "object",
                        "properties": {
                            "commonParts": {"type": "array", "items": {"type": "number"}},
                            "exampleQuestion": {"type": "string"},
                            "tips": {"type": "string"}
                        },
                        "required": ["commonParts", "exampleQuestion", "tips"]
                    },
                    "synonyms": {"type": "array", "items": {"type": "string"}},
                    "antonyms": {"type": "array", "items": {"type": "string"}},
                    "relatedWords": {"type": "array", "items": {"type": "string"}}
                },
                "required": [
                    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
                    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
                    "examples", "wordFamily", "visual", "video", "toeicContext",
                    "synonyms", "antonyms", "relatedWords"
                ]
            }
        }
    },
    "required": ["words"]
}

BASE_PROMPT = """
You are an expert native lexicographer and elite TOEIC exam designer.
For each given word in the list, produce a complete, 100% genuine, deeply researched, contextually accurate dictionary entry in JSON format according to the schema.

STRICT LINGUISTIC RULES:
1. ABSOLUTELY NO generic templates, repetitive placeholder phrases, or boilerplate text (DO NOT write "... factor", "manage the...", "documentation for... is ready for the board meeting", or generic boardroom sentences).
2. The core meaning, native mindset, visual description, daily examples, and TOEIC context MUST strictly reflect the actual nature of the concept:
   - Physical objects / stationery (e.g. archival box, tape): describe physical appearance, materials, purpose, storage, dimensions.
   - Facility / HVAC equipment (e.g. air conditioning): describe temperature control, thermostats, maintenance, building engineering.
   - People / organizational roles (e.g. assistant manager, administrator): describe hierarchy, job duties, delegation, reporting lines.
   - Organizational processes / systems (e.g. alphabetical filing, answering service): describe workflow mechanics, practical operation.
3. Pronunciation: accurate IPA transcription, correct hyphenated syllable breakdown, clear stress pattern, common learner pronunciation mistakes.
4. Etymology: authentic historical linguistic roots (Latin, Germanic, Greek, Old French, Anglo-Norman, or historical compounding details), chronological evolution, first recorded usage period, and genuine foreign language cognates (French, Spanish, German, Italian).
5. Deep Meaning:
   - coreConcept: precise, comprehensive definition.
   - spatialContext: authentic physical or digital workplace environments.
   - temporalContext: realistic frequency and timing of occurrence.
   - emotionalTone, formalityLevel ("formal" | "neutral" | "informal"), connotation ("positive" | "neutral" | "negative").
6. Native Speaker Mindset:
   - howNativesThink: psychological nuance, connotations, what native speakers instinctively associate with this word.
   - mentalImage: vivid, photorealistic scene description.
   - whenToUse vs whenNotToUse: subtle usage boundaries, common false friends.
   - culturalContext: corporate, institutional, or societal significance in English-speaking countries.
7. Real-world Examples:
   - daily: 3 natural, everyday sentences.
   - business: 3 authentic professional corporate sentences.
   - conversation: 2-3 realistic dialogue pairs between colleagues or clients.
   - collocations: 5-6 widely used, high-frequency natural collocations.
8. Word Family: accurate morphological derivatives (noun, verb, adjective, adverb).
9. Visual Association:
   - imageKeyword: specific search terms for finding the ideal stock photograph.
   - imageDescription: clear visual description of an authentic scene.
   - mnemonic: an engaging, memorable cognitive hook or etymological memory device.
10. Video: concise summary of an authentic business/educational video clip demonstrating the concept in action.
11. TOEIC Exam Intelligence:
   - commonParts: list of relevant TOEIC exam parts (e.g. [1, 3, 7] for physical objects; [5, 6, 7] for abstract/grammatical terms).
   - exampleQuestion: realistic Part 5 multiple choice question contextualized in a professional setting with 4 plausible choices (A, B, C, D).
   - tips: strategic exam tip explaining the grammatical or collocational trap.
12. Synonyms: 4-6 genuine, context-appropriate synonyms (NEVER append "factor" or "management").
13. Antonyms: genuine antonyms where applicable (or empty array if none).
14. Related Words: 5-7 closely connected domain terms.
"""

ALLOWED_KEYS = {
    "root": [
        "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
        "pronunciation", "etymology", "deepMeaning", "nativeMindset",
        "examples", "wordFamily", "visual", "video", "toeicContext",
        "synonyms", "antonyms", "relatedWords"
    ],
    "pronunciation": ["ipa", "audioUrl", "syllableBreakdown", "stressPattern", "commonMistakes"],
    "etymology": ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"],
    "deepMeaning": ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"],
    "nativeMindset": ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"],
    "examples": ["daily", "business", "conversation", "collocations"],
    "wordFamily": ["noun", "verb", "adjective", "adverb"],
    "visual": ["imageKeyword", "imageDescription", "mnemonic", "imageUrl"],
    "video": ["youtubeId", "timestamp", "description"],
    "toeicContext": ["commonParts", "exampleQuestion", "tips"]
}

def order_keys(obj):
    if "collocations" in obj:
        if isinstance(obj.get("examples"), dict) and not obj["examples"].get("collocations"):
            obj["examples"]["collocations"] = obj["collocations"]
        del obj["collocations"]
    
    clean = {}
    for k in ALLOWED_KEYS["root"]:
        if k in obj:
            val = obj[k]
            if k in ALLOWED_KEYS and isinstance(val, dict):
                sub_clean = {}
                for sub_k in ALLOWED_KEYS[k]:
                    if sub_k in val:
                        sub_clean[sub_k] = val[sub_k]
                clean[k] = sub_clean
            else:
                clean[k] = val
    return clean

target_file = args.get("file", "src/data/vocabulary/office-admin.ts")
target_ids = args.get("ids", None)
start_idx = args.get("start", None)
count = args.get("count", 10)

with open(target_file) as f:
    ts_content = f.read()

# Robust extraction of each word block
id_positions = [m.start() for m in re.finditer(r'^\s*[\"\']?id[\"\']?\s*:\s*[\"\']([^\"\']+)[\"\']', ts_content, re.MULTILINE)]
id_positions.append(len(ts_content))

parsed_blocks = []
for i in range(len(id_positions) - 1):
    block = ts_content[id_positions[i] : id_positions[i+1]]
    wid = re.search(r'^\s*[\"\']?id[\"\']?\s*:\s*[\"\']([^\"\']+)[\"\']', block, re.MULTILINE).group(1)
    w_match = re.search(r'\bword\b[\"\']?\s*:\s*[\"\']([^\"\']+)[\"\']', block)
    word = w_match.group(1) if w_match else ""
    pos_match = re.search(r'partOfSpeech[\"\']?\s*:\s*\[([^\]]+)\]', block)
    pos = [p.strip().strip("'\"") for p in pos_match.group(1).split(",") if p.strip()] if pos_match else ["noun"]
    cat_match = re.search(r'category[\"\']?\s*:\s*[\"\']([^\"\']+)[\"\']', block)
    cat = cat_match.group(1) if cat_match else "office-admin"
    lvl_match = re.search(r'level[\"\']?\s*:\s*[\"\']([^\"\']+)[\"\']', block)
    lvl = lvl_match.group(1) if lvl_match else "intermediate"
    freq_match = re.search(r'toeicFrequency[\"\']?\s*:\s*(\d+)', block)
    freq = int(freq_match.group(1)) if freq_match else 7
    parsed_blocks.append({
        "id": wid, "word": word, "partOfSpeech": pos,
        "category": cat, "level": lvl, "toeicFrequency": freq
    })

if target_ids:
    selected = [p for p in parsed_blocks if p["id"] in target_ids]
elif start_idx is not None:
    selected = parsed_blocks[start_idx : start_idx + count]
else:
    selected = parsed_blocks[:count]

log(f"Selected {len(selected)} words to process: {[s['id'] + ': ' + s['word'] for s in selected]}")

# Split into parallel chunks of 3 words, batched in groups of 15 words (5 chunks) to avoid API socket saturation
chunk_size = 3
sub_batch_size = 15
total_sub_batches = (len(selected) + sub_batch_size - 1) // sub_batch_size

async def process_chunk(chunk):
    items_desc = []
    for e in chunk:
        items_desc.append(f'- id: "{e["id"]}", word: "{e["word"]}", partOfSpeech: {json.dumps(e["partOfSpeech"])}, category: "{e["category"]}", level: "{e["level"]}", toeicFrequency: {e["toeicFrequency"]}')
    prompt = BASE_PROMPT + "\n\nWords to generate:\n" + "\n".join(items_desc)
    
    for attempt in range(2):
        try:
            a = agent(prompt, schema=SCHEMA, role=f"Lexicographer for {chunk[0]['word']}..{chunk[-1]['word']}", model="flash_lite")
            res = await asyncio.wait_for(a, timeout=90.0)
            return res.get("words", [])
        except Exception as exc:
            log(f"Chunk {chunk[0]['word']} retry {attempt+1}/2 due to: {exc}")
            if attempt == 1:
                return []
    return []

total_updated = 0

for b_idx in range(0, len(selected), sub_batch_size):
    sub_slice = selected[b_idx : b_idx + sub_batch_size]
    batch_num = (b_idx // sub_batch_size) + 1
    phase(f"Sub-batch {batch_num}/{total_sub_batches}: Generating {len(sub_slice)} words ({sub_slice[0]['word']}..{sub_slice[-1]['word']})")
    
    chunks = [sub_slice[i : i + chunk_size] for i in range(0, len(sub_slice), chunk_size)]
    results = await parallel(chunks, process_chunk)
    
    sub_generated = {}
    for word_list in results:
        for w in word_list:
            sub_generated[w["id"]] = order_keys(w)
            
    with open(target_file) as f:
        current_content = f.read()
        
    updated_sub = 0
    for wid, wobj in sub_generated.items():
        pattern = r'\{\s*[\"\']id[\"\']:\s*[\"\']' + re.escape(wid) + r'[\"\'].*?\n  \}(?:,|\s*(?=\n\];))'
        m = re.search(pattern, current_content, re.DOTALL)
        if m:
            is_last = (m.end() == len(current_content) or current_content[m.end():].lstrip().startswith("];"))
            replacement = json.dumps(wobj, indent=4) + ("" if is_last else ",")
            current_content = current_content[:m.start()] + replacement + current_content[m.end():]
            updated_sub += 1
        else:
            log(f"Warning: pattern for {wid} not found!")
            
    with open(target_file, "w") as f:
        f.write(current_content)
        
    total_updated += updated_sub
    log(f"Sub-batch {batch_num}/{total_sub_batches} complete! Saved {updated_sub} words. (Total updated: {total_updated}/{len(selected)})")

log(f"All done! Successfully updated {total_updated} words in {target_file}")
