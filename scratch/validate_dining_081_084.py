import json
import re

with open("scratch/dining_081_084.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print(f"Loaded {len(words)} words.")

FORBIDDEN_PHRASES = [
    "factor", "manage the...", "documentation for...", "ready for the board meeting",
    "foundational professional concept", "inspect the ", "modern ", "standard practice",
    "corporate ", "quality "
]

errors = []

for idx, w in enumerate(words):
    wid = w.get("id")
    word = w.get("word")
    print(f"\nValidating {wid}: {word}")

    # Required top level keys
    required_keys = [
        "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
        "pronunciation", "etymology", "deepMeaning", "nativeMindset",
        "examples", "wordFamily", "visual", "video", "toeicContext",
        "synonyms", "antonyms", "relatedWords"
    ]
    for rk in required_keys:
        if rk not in w:
            errors.append(f"[{wid}] Missing required key '{rk}'")

    # Pronunciation
    p = w.get("pronunciation", {})
    for pk in ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]:
        if not p.get(pk):
            errors.append(f"[{wid}] Pronunciation missing '{pk}'")
    
    # Check syllables count vs stress pattern symbols
    syl_count = len(p.get("syllableBreakdown", "").split("·"))
    stress_symbols = len(p.get("stressPattern", ""))
    if syl_count != stress_symbols:
        errors.append(f"[{wid}] Syllable breakdown count ({syl_count}) != stressPattern symbol count ({stress_symbols})")

    # Etymology
    et = w.get("etymology", {})
    for ek in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        if not et.get(ek):
            errors.append(f"[{wid}] Etymology missing '{ek}'")
    if not isinstance(et.get("relatedLanguages"), list) or len(et.get("relatedLanguages", [])) < 3:
        errors.append(f"[{wid}] Etymology relatedLanguages must have at least 3 items")

    # Deep Meaning
    dm = w.get("deepMeaning", {})
    for dmk in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        if not dm.get(dmk):
            errors.append(f"[{wid}] DeepMeaning missing '{dmk}'")
    if dm.get("formalityLevel") not in ["formal", "neutral", "informal"]:
        errors.append(f"[{wid}] Invalid formalityLevel '{dm.get('formalityLevel')}'")
    if dm.get("connotation") not in ["positive", "neutral", "negative"]:
        errors.append(f"[{wid}] Invalid connotation '{dm.get('connotation')}'")

    # Native Mindset
    nm = w.get("nativeMindset", {})
    for nmk in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        if not nm.get(nmk):
            errors.append(f"[{wid}] NativeMindset missing '{nmk}'")

    # Examples
    ex = w.get("examples", {})
    daily = ex.get("daily", [])
    business = ex.get("business", [])
    conv = ex.get("conversation", [])
    colloc = ex.get("collocations", [])

    if len(daily) < 3:
        errors.append(f"[{wid}] Expected 3 daily examples, got {len(daily)}")
    if len(business) < 3:
        errors.append(f"[{wid}] Expected 3 business examples, got {len(business)}")
    if len(conv) < 2:
        errors.append(f"[{wid}] Expected at least 2 conversation pairs, got {len(conv)}")
    if len(colloc) < 5:
        errors.append(f"[{wid}] Expected at least 5 collocations, got {len(colloc)}")

    # Visual
    vis = w.get("visual", {})
    for vk in ["imageKeyword", "imageDescription", "mnemonic"]:
        if not vis.get(vk):
            errors.append(f"[{wid}] Visual missing '{vk}'")

    # Video
    vid = w.get("video", {})
    if not vid.get("description"):
        errors.append(f"[{wid}] Video missing description")

    # TOEIC Context
    tc = w.get("toeicContext", {})
    for tk in ["commonParts", "exampleQuestion", "tips"]:
        if not tc.get(tk):
            errors.append(f"[{wid}] TOEIC context missing '{tk}'")
    eq = tc.get("exampleQuestion", "")
    for opt in ["(A)", "(B)", "(C)", "(D)"]:
        if opt not in eq:
            errors.append(f"[{wid}] Example question missing option '{opt}'")

    # Synonyms, Antonyms, Related Words
    syns = w.get("synonyms", [])
    if len(syns) < 4:
        errors.append(f"[{wid}] Synonyms count {len(syns)} < 4")
    rel = w.get("relatedWords", [])
    if len(rel) < 5:
        errors.append(f"[{wid}] Related words count {len(rel)} < 5")

    # Check for boilerplate in entire serialized word
    w_str = json.dumps(w).lower()
    for bp in ["factor", "foundational professional concept", "manage the...", "documentation for...", "ready for the board meeting"]:
        if bp in w_str:
            errors.append(f"[{wid}] Contains forbidden boilerplate '{bp}'")

if errors:
    print("\n--- VALIDATION ERRORS ---")
    for e in errors:
        print("ERROR:", e)
    raise SystemExit(1)
else:
    print("\nALL 4 WORDS PASSED STRICT VALIDATION WITH FLYING COLORS!")
