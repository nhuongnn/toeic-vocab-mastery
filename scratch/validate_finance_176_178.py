import json
import re
import sys

with open("scratch/finance_176_178.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print(f"Loaded {len(words)} words.")
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

banned_patterns = [
    r"\bfactor\b",
    r"manage the\.\.\.",
    r"documentation for\.\.\.",
    r"is ready for the board meeting",
    r"Secures Operational Excellence",
    r"Secures Corporate Capital Growth",
    r"A foundational professional concept and noun designating",
    r"A corporate financial controller analyzing a detailed quarterly balance sheet",
    r"The accounting team reconciled the ledger entries concerning",
    r"The finance committee approved the fiscal allocation for",
    r"The internal audit team reconciled the financial _____",
    r"strategic workflows",
    r"operational accountability",
    r"core Germanic commercial root",
    r"standard practice",
    r"procedure",
    r"implementation",
    r"protocol"
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

expected_entries = [
    {"id": "finance-176", "word": "internal audit", "pos": ["noun"], "level": "advanced", "freq": 7},
    {"id": "finance-177", "word": "inventory valuation", "pos": ["noun"], "level": "advanced", "freq": 7},
    {"id": "finance-178", "word": "invest", "pos": ["noun"], "level": "essential", "freq": 9}
]

errors = []

for idx, w in enumerate(words):
    wid = w.get("id")
    word = w.get("word")
    exp = expected_entries[idx]
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
    if w.get("id") != exp["id"]:
        errors.append(f"[{wid}] Unexpected ID: {w.get('id')} vs expected {exp['id']}")
    if w.get("word") != exp["word"]:
        errors.append(f"[{wid}] Unexpected word: {w.get('word')} vs expected {exp['word']}")
    if w.get("category") != "finance":
        errors.append(f"[{wid}] Category must be 'finance', got {w.get('category')}")
    if w.get("level") != exp["level"]:
        errors.append(f"[{wid}] Invalid level: {w.get('level')} vs {exp['level']}")
    if w.get("toeicFrequency") != exp["freq"]:
        errors.append(f"[{wid}] Invalid toeicFrequency: {w.get('toeicFrequency')} vs {exp['freq']}")
    if w.get("partOfSpeech") != exp["pos"]:
        errors.append(f"[{wid}] partOfSpeech must be {exp['pos']}")

    # Pronunciation
    p = w.get("pronunciation", {})
    for pk in required_pron:
        if not p.get(pk):
            errors.append(f"[{wid}] Pronunciation missing: {pk}")
    if not (p.get("ipa", "").startswith("/") and p.get("ipa", "").endswith("/")):
        errors.append(f"[{wid}] IPA must start and end with /")
    if len(p.get("commonMistakes", "")) < 30:
        errors.append(f"[{wid}] commonMistakes is too short")

    # Etymology
    e = w.get("etymology", {})
    for ek in required_etym:
        if not e.get(ek):
            errors.append(f"[{wid}] Etymology missing: {ek}")
    langs = e.get("relatedLanguages", [])
    if len(langs) < 4:
        errors.append(f"[{wid}] relatedLanguages should contain at least 4 languages, got {len(langs)}")
    has_fr = any("French" in l for l in langs)
    has_es = any("Spanish" in l for l in langs)
    has_it = any("Italian" in l for l in langs)
    has_de = any("German" in l for l in langs)
    if not (has_fr and has_es and has_it and has_de):
        errors.append(f"[{wid}] relatedLanguages missing one of French, Spanish, Italian, German")

    # Deep Meaning
    dm = w.get("deepMeaning", {})
    for dmk in required_deep:
        if not dm.get(dmk):
            errors.append(f"[{wid}] Deep meaning missing: {dmk}")
    if dm.get("formalityLevel") not in ["formal", "neutral", "informal"]:
        errors.append(f"[{wid}] Invalid formalityLevel: {dm.get('formalityLevel')}")
    if dm.get("connotation") not in ["positive", "neutral", "negative"]:
        errors.append(f"[{wid}] Invalid connotation: {dm.get('connotation')}")
    if len(dm.get("coreConcept", "")) < 20:
        errors.append(f"[{wid}] coreConcept too short")
    if len(dm.get("spatialContext", "")) < 10:
        errors.append(f"[{wid}] spatialContext too short")
    if len(dm.get("temporalContext", "")) < 10:
        errors.append(f"[{wid}] temporalContext too short")

    # Native Mindset
    nm = w.get("nativeMindset", {})
    for nmk in required_native:
        if not nm.get(nmk):
            errors.append(f"[{wid}] Native mindset missing: {nmk}")
    if len(nm.get("howNativesThink", "")) < 30:
        errors.append(f"[{wid}] howNativesThink too short")
    if len(nm.get("mentalImage", "")) < 20:
        errors.append(f"[{wid}] mentalImage too short")
    if len(nm.get("whenToUse", "")) < 20:
        errors.append(f"[{wid}] whenToUse too short")
    if len(nm.get("whenNotToUse", "")) < 20:
        errors.append(f"[{wid}] whenNotToUse too short")
    if len(nm.get("culturalContext", "")) < 20:
        errors.append(f"[{wid}] culturalContext too short")

    # Examples
    ex = w.get("examples", {})
    for exk in required_ex:
        if exk not in ex:
            errors.append(f"[{wid}] Examples missing: {exk}")
    if len(ex.get("daily", [])) != 3:
        errors.append(f"[{wid}] daily examples count != 3 ({len(ex.get('daily', []))})")
    if len(ex.get("business", [])) != 3:
        errors.append(f"[{wid}] business examples count != 3 ({len(ex.get('business', []))})")
    if not (2 <= len(ex.get("conversation", [])) <= 3):
        errors.append(f"[{wid}] conversation examples not between 2 and 3")
    for cp in ex.get("conversation", []):
        if " / " not in cp:
            errors.append(f"[{wid}] conversation item missing ' / ': {cp}")
    if not (5 <= len(ex.get("collocations", [])) <= 6):
        errors.append(f"[{wid}] collocations count not 5 or 6 ({len(ex.get('collocations', []))})")

    # Word Family
    wf = w.get("wordFamily", {})
    for wfk in required_wf:
        if wfk not in wf:
            errors.append(f"[{wid}] Word family missing key: {wfk}")

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
    for tck in required_toeic:
        if not tc.get(tck):
            errors.append(f"[{wid}] TOEIC context missing: {tck}")
    if not isinstance(tc.get("commonParts"), list) or len(tc.get("commonParts")) == 0:
        errors.append(f"[{wid}] commonParts must be non-empty list of ints")
    eq = tc.get("exampleQuestion", "")
    for opt in ["(A)", "(B)", "(C)", "(D)"]:
        if opt not in eq:
            errors.append(f"[{wid}] exampleQuestion missing {opt}")
    if "_____" not in eq:
        errors.append(f"[{wid}] exampleQuestion missing blank '_____'")

    # Synonyms, Antonyms, Related Words
    syns = w.get("synonyms", [])
    if not (4 <= len(syns) <= 6):
        errors.append(f"[{wid}] synonyms count not between 4 and 6 ({len(syns)})")
    for s in syns:
        if "factor" in s.lower() or "management" in s.lower():
            errors.append(f"[{wid}] Synonym contains forbidden word: {s}")
    
    rw = w.get("relatedWords", [])
    if not (5 <= len(rw) <= 7):
        errors.append(f"[{wid}] relatedWords count not between 5 and 7 ({len(rw)})")
    for r in rw:
        if "factor" in r.lower() or "management" in r.lower():
            errors.append(f"[{wid}] Related word contains forbidden word: {r}")

    if not isinstance(w.get("antonyms"), list):
        errors.append(f"[{wid}] antonyms must be a list")

if errors:
    print("\n❌ VALIDATION ERRORS FOUND:")
    for e in errors:
        print("  -", e)
    sys.exit(1)
else:
    print("\n✅ ALL VALIDATIONS PASSED PERFECTLY!")
