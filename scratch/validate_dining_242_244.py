import json
import re
import sys

with open("scratch/dining_242_244.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print(f"Loaded {len(words)} words.")
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

forbidden_patterns = [
    r"manage the\.\.\.",
    r"documentation for\.\.\.",
    r"is ready for the board meeting",
    r"\bfactor\b",
    r"strategic workflows",
    r"operational accountability",
    r"core Germanic commercial root",
    r"foundational professional concept",
    r"inspect the\s",
    r"modern\s+(seating|service|serving)",
    r"corporate\s+(seating|service|serving)",
    r"standard\s+(seating|service|serving)",
    r"quality\s+(seating|service|serving)",
]

errors = []

for idx, w in enumerate(words):
    wid = w.get("id")
    word = w.get("word")
    print(f"\n--- Validating {wid}: {word} ---")

    # Check forbidden patterns
    w_str = json.dumps(w)
    for pat in forbidden_patterns:
        match = re.search(pat, w_str, re.IGNORECASE)
        if match:
            errors.append(f"[{wid}] Matches forbidden pattern '{pat}': {match.group(0)}")

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

    if not (p.get("ipa", "").startswith("/") and p.get("ipa", "").endswith("/")):
        errors.append(f"[{wid}] IPA must start and end with /")

    # Syllables & Stress
    syls = p.get("syllableBreakdown", "").split("·")
    syl_count = len(syls)
    stress_pattern = p.get("stressPattern", "")
    stress_symbols = len(stress_pattern)
    print(f"  Syllables ({syl_count}): {syls}, Stress pattern ({stress_symbols}): {stress_pattern}")
    if syl_count != stress_symbols:
        errors.append(f"[{wid}] Syllable breakdown count ({syl_count}) != stressPattern symbol count ({stress_symbols})")

    # Etymology
    et = w.get("etymology", {})
    for ek in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        if not et.get(ek):
            errors.append(f"[{wid}] Etymology missing: {ek}")
    if not isinstance(et.get("relatedLanguages"), list) or len(et.get("relatedLanguages", [])) < 4:
        errors.append(f"[{wid}] Etymology relatedLanguages must have >= 4 items")

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
    for cp in conv:
        if " / " not in cp:
            errors.append(f"[{wid}] Conversation entry should be dialogue pair separated by ' / ': {cp[:40]}...")
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
    for r in rw:
        if "factor" in r.lower() or "management" in r.lower():
            errors.append(f"[{wid}] Related word '{r}' contains forbidden word factor/management")

if errors:
    print("\n❌ VALIDATION FAILED WITH ERRORS:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
else:
    print("\n✅ ALL 3 ENTRIES PASSED 100% OF VALIDATION CHECKS!")
