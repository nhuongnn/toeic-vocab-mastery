import json
import re
import sys

with open("scratch/dining_161_164.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print(f"Loaded {len(words)} words.")

forbidden_patterns = [
    r"manage the\.\.\.",
    r"documentation for\.\.\.",
    r"is ready for the board meeting",
    r"\bfactor\b",
    r"strategic workflows and operational accountability",
    r"core Germanic commercial root",
    r"foundational professional concept",
    r"Gracious Hospitality Elevates Executive Dining Standards",
    r"inspect the\s",
    r"modern\s+(host|hostess|hunger|hungry)",
    r"corporate\s+(hostess|hunger|hungry)", # corporate host is a valid collocation
    r"standard\s+(host|hostess|hunger|hungry)",
    r"quality\s+(host|hostess|hunger|hungry)",
]

errors = []

for idx, w in enumerate(words):
    wid = w.get("id")
    word = w.get("word")
    print(f"\n--- Validating {wid}: {word} ---")

    # Forbidden patterns
    w_str = json.dumps(w)
    for pat in forbidden_patterns:
        if re.search(pat, w_str, re.IGNORECASE):
            errors.append(f"[{wid}] Matches forbidden pattern: {pat}")

    # Top-level required keys
    required_keys = [
        "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
        "pronunciation", "etymology", "deepMeaning", "nativeMindset",
        "examples", "wordFamily", "visual", "video", "toeicContext",
        "synonyms", "antonyms", "relatedWords"
    ]
    for rk in required_keys:
        if rk not in w:
            errors.append(f"[{wid}] Missing top-level key: {rk}")

    # Identity
    if w.get("category") != "dining":
        errors.append(f"[{wid}] Category must be 'dining', got {w.get('category')}")
    if w.get("level") not in ["essential", "intermediate", "advanced"]:
        errors.append(f"[{wid}] Invalid level: {w.get('level')}")
    if not isinstance(w.get("toeicFrequency"), (int, float)):
        errors.append(f"[{wid}] Invalid toeicFrequency: {w.get('toeicFrequency')}")
    if not isinstance(w.get("partOfSpeech"), list) or len(w.get("partOfSpeech")) == 0:
        errors.append(f"[{wid}] partOfSpeech must be non-empty list")

    # Pronunciation
    p = w.get("pronunciation", {})
    for pk in ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes", "audioUrl"]:
        if not p.get(pk):
            errors.append(f"[{wid}] Pronunciation missing: {pk}")

    # Syllables & Stress
    syl_count = len(p.get("syllableBreakdown", "").split("·"))
    stress_symbols = len(p.get("stressPattern", ""))
    if syl_count != stress_symbols:
        errors.append(f"[{wid}] Syllable breakdown count ({syl_count}) != stressPattern symbol count ({stress_symbols})")

    # Etymology
    et = w.get("etymology", {})
    for ek in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        if not et.get(ek):
            errors.append(f"[{wid}] Etymology missing: {ek}")
    if not isinstance(et.get("relatedLanguages"), list) or len(et.get("relatedLanguages", [])) < 3:
        errors.append(f"[{wid}] Etymology relatedLanguages must have >= 3 items")

    # Deep Meaning
    dm = w.get("deepMeaning", {})
    for dmk in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        if not dm.get(dmk):
            errors.append(f"[{wid}] DeepMeaning missing: {dmk}")
    if dm.get("formalityLevel") not in ["formal", "neutral", "informal"]:
        errors.append(f"[{wid}] Invalid formalityLevel: {dm.get('formalityLevel')}")
    if dm.get("connotation") not in ["positive", "neutral", "negative"]:
        errors.append(f"[{wid}] Invalid connotation: {dm.get('connotation')}")

    # Native Mindset
    nm = w.get("nativeMindset", {})
    for nmk in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        if not nm.get(nmk):
            errors.append(f"[{wid}] NativeMindset missing: {nmk}")

    # Examples
    ex = w.get("examples", {})
    daily = ex.get("daily", [])
    business = ex.get("business", [])
    conv = ex.get("conversation", [])
    colloc = ex.get("collocations", [])

    if len(daily) != 3:
        errors.append(f"[{wid}] Expected exactly 3 daily examples, got {len(daily)}")
    if len(business) != 3:
        errors.append(f"[{wid}] Expected exactly 3 business examples, got {len(business)}")
    if not (2 <= len(conv) <= 3):
        errors.append(f"[{wid}] Expected 2 or 3 conversation pairs, got {len(conv)}")
    if not (5 <= len(colloc) <= 6):
        errors.append(f"[{wid}] Expected 5 or 6 collocations, got {len(colloc)}")

    # Word Family
    wf = w.get("wordFamily", {})
    for wfk in ["noun", "verb", "adjective", "adverb"]:
        if wfk not in wf:
            errors.append(f"[{wid}] Word family missing field: {wfk}")

    # Visual
    vis = w.get("visual", {})
    for vk in ["imageKeyword", "imageDescription", "mnemonic"]:
        if not vis.get(vk):
            errors.append(f"[{wid}] Visual missing: {vk}")

    # Video
    vid = w.get("video", {})
    if not vid.get("description"):
        errors.append(f"[{wid}] Video missing description")

    # TOEIC Context
    tc = w.get("toeicContext", {})
    for tk in ["commonParts", "exampleQuestion", "tips"]:
        if not tc.get(tk):
            errors.append(f"[{wid}] TOEIC context missing: {tk}")
    eq = tc.get("exampleQuestion", "")
    for choice in ["(A)", "(B)", "(C)", "(D)"]:
        if choice not in eq:
            errors.append(f"[{wid}] exampleQuestion missing choice: {choice}")

    # Synonyms, Antonyms, Related Words
    syn = w.get("synonyms", [])
    if not (4 <= len(syn) <= 6):
        errors.append(f"[{wid}] Expected 4 to 6 synonyms, got {len(syn)}")
    for s in syn:
        if "factor" in s.lower() or "management" in s.lower():
            errors.append(f"[{wid}] Synonym '{s}' contains forbidden word factor/management")

    if not isinstance(w.get("antonyms"), list):
        errors.append(f"[{wid}] Antonyms must be a list")

    rw = w.get("relatedWords", [])
    if not (5 <= len(rw) <= 7):
        errors.append(f"[{wid}] Expected 5 to 7 related words, got {len(rw)}")

if errors:
    print("\n❌ VALIDATION FAILED WITH ERRORS:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
else:
    print("\n✅ ALL 4 ENTRIES PASSED 100% OF VALIDATION CHECKS!")
