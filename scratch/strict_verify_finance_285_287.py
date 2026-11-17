import json
import re

with open("scratch/finance_285_287.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

required_top_keys = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

required_pronunciation = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
required_etymology = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
required_deepMeaning = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
required_nativeMindset = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
required_examples = ["daily", "business", "conversation", "collocations"]
required_wordFamily = ["noun", "verb", "adjective", "adverb"]
required_visual = ["imageKeyword", "imageDescription", "mnemonic"]
required_video = ["description"]
required_toeicContext = ["commonParts", "exampleQuestion", "tips"]

banned_phrases = [
    "factor", "manage the", "documentation for", "is ready for the board meeting",
    "foundational professional concept", "central to strategic workflows",
    "reconciled the ledger entries", "signed off on the figures",
    "adheres to GAAP standards", "standard practice", "thre...", "locataire"
]

for w in words:
    wid = w["id"]
    print(f"Checking {wid}: {w['word']}")
    
    for k in required_top_keys:
        assert k in w, f"Missing key {k} in {wid}"
        
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], (int, float))
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    
    for pk in required_pronunciation:
        assert pk in w["pronunciation"] and len(w["pronunciation"][pk]) > 0
    for ek in required_etymology:
        assert ek in w["etymology"] and len(w["etymology"][ek]) > 0
    for dk in required_deepMeaning:
        assert dk in w["deepMeaning"] and len(w["deepMeaning"][dk]) > 0
    for nk in required_nativeMindset:
        assert nk in w["nativeMindset"] and len(w["nativeMindset"][nk]) > 0
    for exk in required_examples:
        assert exk in w["examples"] and len(w["examples"][exk]) > 0
    for wfk in required_wordFamily:
        assert wfk in w["wordFamily"]
    for vk in required_visual:
        assert vk in w["visual"] and len(w["visual"][vk]) > 0
    for vdk in required_video:
        assert vdk in w["video"] and len(w["video"][vdk]) > 0
    for tk in required_toeicContext:
        assert tk in w["toeicContext"]
        
    assert len(w["examples"]["daily"]) == 3, f"Daily examples must be 3 in {wid}"
    assert len(w["examples"]["business"]) == 3, f"Business examples must be 3 in {wid}"
    assert len(w["examples"]["conversation"]) in [2, 3], f"Conversation examples must be 2-3 in {wid}"
    assert len(w["examples"]["collocations"]) in [5, 6], f"Collocations must be 5-6 in {wid}"
    assert len(w["synonyms"]) >= 4, f"Synonyms must be >= 4 in {wid}"
    assert len(w["relatedWords"]) >= 5, f"Related words must be >= 5 in {wid}"
    assert len(w["toeicContext"]["commonParts"]) >= 1, f"commonParts must not be empty in {wid}"
    
    # Check for options in example question
    eq = w["toeicContext"]["exampleQuestion"]
    assert "(A)" in eq and "(B)" in eq and "(C)" in eq and "(D)" in eq, f"Missing options in exampleQuestion of {wid}"
    
    # Check for banned boilerplate
    dumped = json.dumps(w).lower()
    for bp in banned_phrases:
        if bp == "factor" and wid == "finance-287":
            # Check if factor is inappropriately used as synonym
            assert "factor" not in [s.lower() for s in w["synonyms"]], f"Found 'factor' in synonyms of {wid}"
            continue
        if bp == "factor":
            assert "factor" not in [s.lower() for s in w["synonyms"]], f"Found 'factor' in synonyms of {wid}"
            continue
        assert bp not in dumped, f"Found banned phrase '{bp}' in {wid}!"

print("ALL STRICT VALIDATIONS PASSED PERFECTLY!")
