import json
import re

with open("scratch/finance_056_058.json", "r", encoding="utf-8") as f:
    words = json.load(f)

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
required_native = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
required_ex = ["daily", "business", "conversation", "collocations"]
required_vis = ["imageKeyword", "imageDescription", "mnemonic"]
required_vid = ["description"]
required_toeic = ["commonParts", "exampleQuestion", "tips"]

FORBIDDEN_PHRASES = [
    "factor", "management team invested", "documentation for",
    "is ready for the board meeting", "strategic workflows and operational accountability",
    "core Germanic commercial root signifying foundational operational practice"
]

for w in words:
    print(f"Validating word: {w['word']} ({w['id']})...")
    for fld in required_top:
        assert fld in w and w[fld] is not None, f"Missing {fld} in {w['word']}"
    
    # Check forbidden boilerplate
    dumped = json.dumps(w).lower()
    for phrase in FORBIDDEN_PHRASES:
        if phrase == "factor" and w['word'] != "factor":
            # Check for "... factor" or standalone "factor" as placeholder
            for syn in w.get("synonyms", []):
                assert "factor" not in syn.lower(), f"Synonym contains 'factor': {syn}"
        else:
            assert phrase.lower() not in dumped, f"Found forbidden phrase '{phrase}' in {w['word']}"
        
    for fld in required_pron:
        assert fld in w["pronunciation"] and w["pronunciation"][fld], f"Missing pron {fld} in {w['word']}"
    for fld in required_etym:
        assert fld in w["etymology"] and w["etymology"][fld], f"Missing etym {fld} in {w['word']}"
    assert len(w["etymology"]["relatedLanguages"]) >= 3, f"Too few related languages in {w['word']}"
    
    for fld in required_deep:
        assert fld in w["deepMeaning"] and w["deepMeaning"][fld], f"Missing deep {fld} in {w['word']}"
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    
    for fld in required_native:
        assert fld in w["nativeMindset"] and w["nativeMindset"][fld], f"Missing native {fld} in {w['word']}"
        
    for fld in required_ex:
        assert fld in w["examples"] and len(w["examples"][fld]) > 0, f"Missing ex {fld} in {w['word']}"
    assert len(w["examples"]["daily"]) >= 3, f"Expected >=3 daily examples in {w['word']}"
    assert len(w["examples"]["business"]) >= 3, f"Expected >=3 business examples in {w['word']}"
    assert len(w["examples"]["conversation"]) >= 2, f"Expected >=2 conversation examples in {w['word']}"
    assert len(w["examples"]["collocations"]) >= 5, f"Expected >=5 collocations in {w['word']}"
    
    for fld in required_vis:
        assert fld in w["visual"] and w["visual"][fld], f"Missing visual {fld} in {w['word']}"
        
    for fld in required_vid:
        assert fld in w["video"] and w["video"][fld], f"Missing video {fld} in {w['word']}"
        
    for fld in required_toeic:
        assert fld in w["toeicContext"] and w["toeicContext"][fld], f"Missing toeic {fld} in {w['word']}"
    assert re.search(r"\(A\).+\(B\).+\(C\).+\(D\)", w["toeicContext"]["exampleQuestion"]), f"Malformed question in {w['word']}"
    
    assert 4 <= len(w["synonyms"]) <= 8, f"Expected 4-6 synonyms, got {len(w['synonyms'])} in {w['word']}"
    assert 5 <= len(w["relatedWords"]) <= 10, f"Expected 5-7 relatedWords, got {len(w['relatedWords'])} in {w['word']}"
    assert isinstance(w["antonyms"], list)

print("ALL 3 WORDS VALIDATED PERFECTLY!")
