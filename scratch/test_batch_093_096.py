import json
import re

with open("scratch/dining_093_096.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 4, f"Expected 4 words, got {len(words)}"

REQUIRED_KEYS = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

FORBIDDEN_PHRASES = [
    "factor", "standard practice", "foundational operational practice",
    "Preserved through centuries of Anglo-Saxon", "Gracious Hospitality Elevates",
    "The banquet staff inspected the", "Please ensure that the",
    "meets all hospitality and safety standards", "cocktail-related",
    "coffee-related", "confectionery-related", "cook-related",
    "cocktail management", "coffee management", "confectionery management",
    "cook management"
]

errors = []

for w in words:
    wid = w["id"]
    word = w["word"]
    print(f"Checking {wid}: {word}")
    
    # Check required keys
    for k in REQUIRED_KEYS:
        if k not in w:
            errors.append(f"{wid}: missing required key '{k}'")
            
    # Check pronunciation
    p = w.get("pronunciation", {})
    for pk in ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]:
        if not p.get(pk):
            errors.append(f"{wid}: missing or empty pronunciation.{pk}")
            
    # Check etymology
    e = w.get("etymology", {})
    for ek in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        if not e.get(ek):
            errors.append(f"{wid}: missing or empty etymology.{ek}")
    if not isinstance(e.get("relatedLanguages"), list) or len(e.get("relatedLanguages", [])) < 3:
        errors.append(f"{wid}: relatedLanguages should be list of at least 3 items")
        
    # Check deepMeaning
    dm = w.get("deepMeaning", {})
    for dmk in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        if not dm.get(dmk):
            errors.append(f"{wid}: missing or empty deepMeaning.{dmk}")
    if dm.get("formalityLevel") not in ["formal", "neutral", "informal"]:
        errors.append(f"{wid}: invalid formalityLevel: {dm.get('formalityLevel')}")
    if dm.get("connotation") not in ["positive", "neutral", "negative"]:
        errors.append(f"{wid}: invalid connotation: {dm.get('connotation')}")
        
    # Check nativeMindset
    nm = w.get("nativeMindset", {})
    for nmk in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        if not nm.get(nmk):
            errors.append(f"{wid}: missing or empty nativeMindset.{nmk}")
            
    # Check examples
    ex = w.get("examples", {})
    if len(ex.get("daily", [])) != 3:
        errors.append(f"{wid}: examples.daily must have exactly 3 sentences, got {len(ex.get('daily', []))}")
    if len(ex.get("business", [])) != 3:
        errors.append(f"{wid}: examples.business must have exactly 3 sentences, got {len(ex.get('business', []))}")
    if len(ex.get("conversation", [])) not in [2, 3]:
        errors.append(f"{wid}: examples.conversation must have 2-3 dialogues, got {len(ex.get('conversation', []))}")
    if not (5 <= len(ex.get("collocations", [])) <= 6):
        errors.append(f"{wid}: examples.collocations must have 5-6 items, got {len(ex.get('collocations', []))}")
        
    # Check visual
    v = w.get("visual", {})
    for vk in ["imageKeyword", "imageDescription", "mnemonic"]:
        if not v.get(vk):
            errors.append(f"{wid}: missing or empty visual.{vk}")
            
    # Check video
    vid = w.get("video", {})
    if not vid.get("description"):
        errors.append(f"{wid}: missing or empty video.description")
        
    # Check toeicContext
    tc = w.get("toeicContext", {})
    if not tc.get("commonParts") or not isinstance(tc.get("commonParts"), list):
        errors.append(f"{wid}: toeicContext.commonParts must be non-empty list")
    if not tc.get("exampleQuestion") or not tc.get("tips"):
        errors.append(f"{wid}: missing exampleQuestion or tips in toeicContext")
        
    # Check synonyms, antonyms, relatedWords
    syns = w.get("synonyms", [])
    if not (4 <= len(syns) <= 6):
        errors.append(f"{wid}: synonyms must have 4-6 items, got {len(syns)}")
    rw = w.get("relatedWords", [])
    if not (5 <= len(rw) <= 7):
        errors.append(f"{wid}: relatedWords must have 5-7 items, got {len(rw)}")
        
    # Check forbidden boilerplate
    w_str = json.dumps(w)
    for fb in FORBIDDEN_PHRASES:
        if fb.lower() in w_str.lower():
            errors.append(f"{wid}: contains forbidden boilerplate phrase '{fb}'")

if errors:
    print(f"Validation FAILED with {len(errors)} error(s):")
    for err in errors:
        print("  - " + err)
    exit(1)
else:
    print("ALL VALIDATION CHECKS PASSED PERFECTLY!")
