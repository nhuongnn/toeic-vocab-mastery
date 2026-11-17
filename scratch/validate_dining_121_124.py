import json
import re

with open("scratch/dining_121_124.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print(f"Total words: {len(words)}")

required_keys = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

pron_keys = ["audioUrl", "commonMistakes", "ipa", "stressPattern", "syllableBreakdown"]
etym_keys = ["evolution", "firstRecordedUse", "origin", "relatedLanguages", "rootMeaning", "rootWord"]
deep_keys = ["connotation", "coreConcept", "emotionalTone", "formalityLevel", "spatialContext", "temporalContext"]
native_keys = ["culturalContext", "howNativesThink", "mentalImage", "whenNotToUse", "whenToUse"]
ex_keys = ["business", "collocations", "conversation", "daily"]
fam_keys = ["adjective", "adverb", "noun", "verb"]
vis_keys = ["imageDescription", "imageKeyword", "mnemonic"]
vid_keys = ["description"]
toeic_keys = ["commonParts", "exampleQuestion", "tips"]

banned_patterns = [
    r"\bfactor\b", r"manage the\.\.\.", r"documentation for.*is ready for the board meeting",
    r"A foundational professional concept and noun designating",
    r"Gracious Hospitality Elevates Executive Dining Standards",
    r"de- / dis- \(down, away, reversal, separation\)",
    r"Used in formal Roman law to express rescission",
    r"core Germanic commercial root signifying foundational operational practice",
    r"The banquet staff inspected the",
    r"The banquet coordinator confirmed that the catering team has prepared the requested"
]

errors = []

for w in words:
    wid = w.get("id")
    word = w.get("word")
    print(f"Validating {wid}: {word}")
    
    # Check top-level keys
    for k in required_keys:
        if k not in w:
            errors.append(f"{wid}: missing key '{k}'")
            
    # Check sub-keys
    for k in pron_keys:
        if k not in w.get("pronunciation", {}):
            errors.append(f"{wid}: pronunciation missing '{k}'")
    for k in etym_keys:
        if k not in w.get("etymology", {}):
            errors.append(f"{wid}: etymology missing '{k}'")
    for k in deep_keys:
        if k not in w.get("deepMeaning", {}):
            errors.append(f"{wid}: deepMeaning missing '{k}'")
    for k in native_keys:
        if k not in w.get("nativeMindset", {}):
            errors.append(f"{wid}: nativeMindset missing '{k}'")
    for k in ex_keys:
        if k not in w.get("examples", {}):
            errors.append(f"{wid}: examples missing '{k}'")
    for k in fam_keys:
        if k not in w.get("wordFamily", {}):
            errors.append(f"{wid}: wordFamily missing '{k}'")
    for k in vis_keys:
        if k not in w.get("visual", {}):
            errors.append(f"{wid}: visual missing '{k}'")
    for k in vid_keys:
        if k not in w.get("video", {}):
            errors.append(f"{wid}: video missing '{k}'")
    for k in toeic_keys:
        if k not in w.get("toeicContext", {}):
            errors.append(f"{wid}: toeicContext missing '{k}'")
            
    # Check enums
    if w.get("level") not in ["essential", "intermediate", "advanced"]:
        errors.append(f"{wid}: invalid level {w.get('level')}")
    if w.get("deepMeaning", {}).get("connotation") not in ["positive", "neutral", "negative"]:
        errors.append(f"{wid}: invalid connotation {w.get('deepMeaning', {}).get('connotation')}")
    if w.get("deepMeaning", {}).get("formalityLevel") not in ["formal", "neutral", "informal"]:
        errors.append(f"{wid}: invalid formalityLevel {w.get('deepMeaning', {}).get('formalityLevel')}")
        
    # Check counts
    ex = w.get("examples", {})
    if len(ex.get("daily", [])) < 3:
        errors.append(f"{wid}: daily examples < 3 ({len(ex.get('daily', []))})")
    if len(ex.get("business", [])) < 3:
        errors.append(f"{wid}: business examples < 3 ({len(ex.get('business', []))})")
    if len(ex.get("conversation", [])) < 2:
        errors.append(f"{wid}: conversation examples < 2 ({len(ex.get('conversation', []))})")
    if len(ex.get("collocations", [])) < 5:
        errors.append(f"{wid}: collocations < 5 ({len(ex.get('collocations', []))})")
        
    if len(w.get("synonyms", [])) < 4:
        errors.append(f"{wid}: synonyms < 4 ({len(w.get('synonyms', []))})")
    if len(w.get("relatedWords", [])) < 5:
        errors.append(f"{wid}: relatedWords < 5 ({len(w.get('relatedWords', []))})")
        
    # Check banned boilerplate patterns in serialized string
    dumped = json.dumps(w)
    for pat in banned_patterns:
        if re.search(pat, dumped, re.IGNORECASE):
            errors.append(f"{wid}: matched banned pattern '{pat}'")

if errors:
    print(f"FAILED with {len(errors)} errors:")
    for e in errors:
        print(f"  - {e}")
else:
    print("ALL CHECKS PASSED PERFECTLY!")
