import json
import re

with open("scratch/finance_212_214.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["result"]["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

required_top = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]
required_pron = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
required_etym = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
required_deep = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
required_mind = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
required_ex = ["daily", "business", "conversation", "collocations"]
required_vis = ["imageKeyword", "imageDescription", "mnemonic"]
required_vid = ["description"]
required_toeic = ["commonParts", "exampleQuestion", "tips"]

forbidden_phrases = [
    "factor", "manage the...", "documentation for... is ready", "board meeting",
    "signifying foundational operational practice", "adheres to GAAP standards",
    "approved fiscal allocation", "reconciled the ledger entries"
]

for w in words:
    print(f"Validating word: {w['word']} ({w['id']})")
    for k in required_top:
        assert k in w, f"Missing {k} in {w.get('word')}"
    for k in required_pron:
        assert k in w["pronunciation"], f"Missing {k} in pronunciation of {w['word']}"
    for k in required_etym:
        assert k in w["etymology"], f"Missing {k} in etymology of {w['word']}"
    for k in required_deep:
        assert k in w["deepMeaning"], f"Missing {k} in deepMeaning of {w['word']}"
    for k in required_mind:
        assert k in w["nativeMindset"], f"Missing {k} in nativeMindset of {w['word']}"
    for k in required_ex:
        assert k in w["examples"], f"Missing {k} in examples of {w['word']}"
    for k in required_vis:
        assert k in w["visual"], f"Missing {k} in visual of {w['word']}"
    for k in required_vid:
        assert k in w["video"], f"Missing {k} in video of {w['word']}"
    for k in required_toeic:
        assert k in w["toeicContext"], f"Missing {k} in toeicContext of {w['word']}"
    
    assert len(w["examples"]["daily"]) == 3, f"Daily count {len(w['examples']['daily'])} != 3 in {w['word']}"
    assert len(w["examples"]["business"]) == 3, f"Business count {len(w['examples']['business'])} != 3 in {w['word']}"
    assert len(w["examples"]["conversation"]) >= 2, f"Conversation count < 2 in {w['word']}"
    assert 5 <= len(w["examples"]["collocations"]) <= 6, f"Collocations count {len(w['examples']['collocations'])} not in 5-6 in {w['word']}"
    assert 4 <= len(w["synonyms"]) <= 6, f"Synonyms count {len(w['synonyms'])} not in 4-6 in {w['word']}"
    assert 5 <= len(w["relatedWords"]) <= 7, f"Related words count {len(w['relatedWords'])} not in 5-7 in {w['word']}"
    assert len(w["etymology"]["relatedLanguages"]) >= 3, f"Related languages < 3 in {w['word']}"
    
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    assert w["level"] in ["essential", "intermediate", "advanced"]
    
    # Check for placeholder/boilerplate in strings
    dumped = json.dumps(w)
    for phrase in forbidden_phrases:
        if phrase in dumped:
            raise ValueError(f"Forbidden boilerplate phrase '{phrase}' found in {w['word']}")
            
    # Check exampleQuestion format (must have A, B, C, D)
    q = w["toeicContext"]["exampleQuestion"]
    assert "(A)" in q and "(B)" in q and "(C)" in q and "(D)" in q, f"Malformed TOEIC question in {w['word']}"

print("All validations PASSED successfully!")
