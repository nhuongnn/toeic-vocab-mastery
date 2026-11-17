import json
import re
import sys

with open("scratch/finance_182_184.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data.get("words", [])
print(f"Loaded {len(words)} words.")
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

banned_patterns = [
    r"\bfactor\b",
    r"manage the\.\.\.",
    r"documentation for\.\.\.",
    r"is ready for the board meeting",
    r"Secures Operational Excellence",
    r"Secures Corporate Capital Growth",
    r"A foundational professional concept",
    r"A corporate financial controller analyzing a detailed quarterly balance sheet",
    r"The accounting team reconciled the ledger entries concerning",
    r"The finance committee approved the fiscal allocation for",
    r"The internal audit team reconciled the financial _____",
    r"strategic workflows",
    r"operational accountability",
    r"core Germanic commercial root",
    r"entering into a state",
    r"reconciled the ledger entries concerning"
]

required_top = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]
required_pron = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes", "audioUrl"]
required_etym = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
required_deep = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
required_native = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
required_ex = ["daily", "business", "conversation", "collocations"]
required_wf = ["noun", "verb", "adjective", "adverb"]
required_vis = ["imageKeyword", "imageDescription", "mnemonic"]
required_vid = ["description"]
required_toeic = ["commonParts", "exampleQuestion", "tips"]

expected_ids = ["finance-182", "finance-183", "finance-184"]
expected_words = ["leaseback", "lender", "lending"]
expected_levels = ["intermediate", "essential", "intermediate"]
expected_freq = [8, 9, 8]

errors = []

for idx, w in enumerate(words):
    wid = w.get("id")
    word = w.get("word")
    print(f"\n--- Validating {wid}: {word} ---")

    # Check banned patterns
    w_str = json.dumps(w)
    for pat in banned_patterns:
        match = re.search(pat, w_str, re.IGNORECASE)
        if match:
            errors.append(f"[{wid}] Matches banned pattern '{pat}': {match.group(0)}")

    # Top-level required keys
    for rk in required_top:
        if rk not in w:
            errors.append(f"[{wid}] Missing top-level key: {rk}")

    # Identity
    if w.get("id") != expected_ids[idx]:
        errors.append(f"[{wid}] Unexpected ID: {w.get('id')} vs expected {expected_ids[idx]}")
    if w.get("word") != expected_words[idx]:
        errors.append(f"[{wid}] Unexpected word: {w.get('word')} vs expected {expected_words[idx]}")
    if w.get("category") != "finance":
        errors.append(f"[{wid}] Category must be 'finance', got {w.get('category')}")
    if w.get("level") != expected_levels[idx]:
        errors.append(f"[{wid}] Invalid level: {w.get('level')} vs {expected_levels[idx]}")
    if w.get("toeicFrequency") != expected_freq[idx]:
        errors.append(f"[{wid}] Invalid toeicFrequency: {w.get('toeicFrequency')} vs {expected_freq[idx]}")
    if not isinstance(w.get("partOfSpeech"), list) or w.get("partOfSpeech") != ["noun"]:
        errors.append(f"[{wid}] partOfSpeech must be ['noun']")

    # Pronunciation
    p = w.get("pronunciation", {})
    for pk in required_pron:
        if not p.get(pk):
            errors.append(f"[{wid}] Pronunciation missing: {pk}")
    if not (p.get("ipa", "").startswith("/") and p.get("ipa", "").endswith("/")):
        errors.append(f"[{wid}] IPA must start and end with /")
    
    syls = p.get("syllableBreakdown", "").split("-")
    syl_count = len(syls)
    stress_pattern = p.get("stressPattern", "")
    stress_symbols = len(stress_pattern)
    print(f"  Syllables ({syl_count}): {syls}, Stress pattern ({stress_symbols}): {stress_pattern}")
    if syl_count != stress_symbols:
        errors.append(f"[{wid}] Syllable breakdown count ({syl_count}) != stressPattern symbol count ({stress_symbols})")
    if len(p.get("commonMistakes", "")) < 30:
        errors.append(f"[{wid}] commonMistakes too short")

    # Etymology
    et = w.get("etymology", {})
    for ek in required_etym:
        if not et.get(ek):
            errors.append(f"[{wid}] Etymology missing: {ek}")
    langs = et.get("relatedLanguages", [])
    if not isinstance(langs, list) or len(langs) < 4:
        errors.append(f"[{wid}] Etymology relatedLanguages must have >= 4 items")
    has_fr = any("French" in l for l in langs)
    has_es = any("Spanish" in l for l in langs)
    has_it = any("Italian" in l for l in langs)
    has_de = any("German" in l for l in langs)
    if not (has_fr and has_es and has_it and has_de):
        errors.append(f"[{wid}] relatedLanguages missing one of French, Spanish, Italian, German")
    if len(et.get("evolution", "")) < 30:
        errors.append(f"[{wid}] Evolution too short")

    # Deep Meaning
    dm = w.get("deepMeaning", {})
    for dmk in required_deep:
        if not dm.get(dmk):
            errors.append(f"[{wid}] DeepMeaning missing: {dmk}")
    if dm.get("formalityLevel") not in ["formal", "neutral", "informal"]:
        errors.append(f"[{wid}] Invalid formalityLevel: {dm.get('formalityLevel')}")
    if dm.get("connotation") not in ["positive", "neutral", "negative"]:
        errors.append(f"[{wid}] Invalid connotation: {dm.get('connotation')}")

    # Native Mindset
    nm = w.get("nativeMindset", {})
    for nmk in required_native:
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
    for wfk in required_wf:
        if wfk not in wf:
            errors.append(f"[{wid}] Word family missing field: {wfk}")

    # Visual
    vis = w.get("visual", {})
    for vk in required_vis:
        if not vis.get(vk):
            errors.append(f"[{wid}] Visual missing: {vk}")

    # Video
    vid = w.get("video", {})
    for vdk in required_vid:
        if not vid.get(vdk):
            errors.append(f"[{wid}] Video missing: {vdk}")

    # TOEIC Context
    tc = w.get("toeicContext", {})
    for tk in required_toeic:
        if not tc.get(tk):
            errors.append(f"[{wid}] TOEIC context missing: {tk}")
    eq = tc.get("exampleQuestion", "")
    for choice in ["(A)", "(B)", "(C)", "(D)"]:
        if choice not in eq:
            errors.append(f"[{wid}] exampleQuestion missing choice: {choice}")
    if "_____" not in eq:
        errors.append(f"[{wid}] exampleQuestion missing blank '_____'")

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
