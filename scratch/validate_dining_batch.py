import json
import re

with open("scratch/words_batch_dining_085_088.json") as f:
    words = json.load(f)

forbidden_patterns = [
    r"manage the\.\.\.",
    r"documentation for\.\.\.",
    r"is ready for the board meeting",
    r"\bfactor\b",
    r"strategic workflows and operational accountability",
    r"core Germanic commercial root signifying foundational operational practice",
]

errors = []

for w in words:
    wid = w.get("id")
    word = w.get("word")
    print(f"Validating {wid}: {word}")
    
    # Check forbidden strings
    w_json = json.dumps(w)
    for pat in forbidden_patterns:
        if re.search(pat, w_json, re.IGNORECASE):
            errors.append(f"{wid}: Matches forbidden pattern {pat}")
            
    # Check required fields
    required_top = [
        "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
        "pronunciation", "etymology", "deepMeaning", "nativeMindset",
        "examples", "wordFamily", "visual", "video", "toeicContext",
        "synonyms", "antonyms", "relatedWords"
    ]
    for field in required_top:
        if field not in w:
            errors.append(f"{wid}: Missing top-level field {field}")
            
    # Check pronunciation
    pron = w.get("pronunciation", {})
    for pf in ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]:
        if not pron.get(pf):
            errors.append(f"{wid}: Missing pronunciation.{pf}")
            
    # Check etymology
    etym = w.get("etymology", {})
    for ef in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        if not etym.get(ef):
            errors.append(f"{wid}: Missing etymology.{ef}")
    if len(etym.get("relatedLanguages", [])) < 3:
        errors.append(f"{wid}: etymology.relatedLanguages has fewer than 3 items")
        
    # Check deepMeaning
    dm = w.get("deepMeaning", {})
    for dmf in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        if not dm.get(dmf):
            errors.append(f"{wid}: Missing deepMeaning.{dmf}")
    if dm.get("formalityLevel") not in ["formal", "neutral", "informal"]:
        errors.append(f"{wid}: Invalid formalityLevel {dm.get('formalityLevel')}")
    if dm.get("connotation") not in ["positive", "neutral", "negative"]:
        errors.append(f"{wid}: Invalid connotation {dm.get('connotation')}")
        
    # Check nativeMindset
    nm = w.get("nativeMindset", {})
    for nmf in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        if not nm.get(nmf):
            errors.append(f"{wid}: Missing nativeMindset.{nmf}")
            
    # Check examples
    ex = w.get("examples", {})
    daily = ex.get("daily", [])
    business = ex.get("business", [])
    conv = ex.get("conversation", [])
    colloc = ex.get("collocations", [])
    if len(daily) != 3:
        errors.append(f"{wid}: daily examples count is {len(daily)}, expected 3")
    if len(business) != 3:
        errors.append(f"{wid}: business examples count is {len(business)}, expected 3")
    if not (2 <= len(conv) <= 3):
        errors.append(f"{wid}: conversation examples count is {len(conv)}, expected 2-3")
    if not (5 <= len(colloc) <= 6):
        errors.append(f"{wid}: collocations count is {len(colloc)}, expected 5-6")
        
    # Check visual
    vis = w.get("visual", {})
    for vf in ["imageKeyword", "imageDescription", "mnemonic"]:
        if not vis.get(vf):
            errors.append(f"{wid}: Missing visual.{vf}")
            
    # Check video
    vid = w.get("video", {})
    if not vid.get("description"):
        errors.append(f"{wid}: Missing video.description")
        
    # Check toeicContext
    tc = w.get("toeicContext", {})
    for tcf in ["commonParts", "exampleQuestion", "tips"]:
        if not tc.get(tcf):
            errors.append(f"{wid}: Missing toeicContext.{tcf}")
    eq = tc.get("exampleQuestion", "")
    for choice in ["(A)", "(B)", "(C)", "(D)"]:
        if choice not in eq:
            errors.append(f"{wid}: exampleQuestion missing choice {choice}")
            
    # Check synonyms, antonyms, relatedWords
    syn = w.get("synonyms", [])
    if not (4 <= len(syn) <= 6):
        errors.append(f"{wid}: synonyms count is {len(syn)}, expected 4-6")
    for s in syn:
        if "factor" in s.lower() or "management" in s.lower():
            errors.append(f"{wid}: synonym '{s}' contains factor or management")
            
    rw = w.get("relatedWords", [])
    if not (5 <= len(rw) <= 7):
        errors.append(f"{wid}: relatedWords count is {len(rw)}, expected 5-7")

if errors:
    print("ERRORS FOUND:")
    for err in errors:
        print(" - ", err)
    sys.exit(1)
else:
    print("ALL 4 ENTRIES PASSED RIGOROUS VALIDATION!")
