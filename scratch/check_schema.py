import json

with open("test_vocab.json") as f:
    data = json.load(f)

words = data["result"]["words"]
assert len(words) == 3

required_top = ["id", "word", "partOfSpeech", "category", "level", "toeicFrequency", "pronunciation", "etymology", "deepMeaning", "nativeMindset", "examples", "wordFamily", "visual", "video", "toeicContext", "synonyms", "antonyms", "relatedWords"]
required_pron = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
required_etym = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
required_deep = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
required_mind = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
required_ex = ["daily", "business", "conversation", "collocations"]
required_vis = ["imageKeyword", "imageDescription", "mnemonic"]
required_vid = ["description"]
required_toeic = ["commonParts", "exampleQuestion", "tips"]

for w in words:
    for k in required_top:
        assert k in w, f"Missing {k} in {w.get('word')}"
    for k in required_pron:
        assert k in w["pronunciation"], f"Missing {k} in pronunciation"
    for k in required_etym:
        assert k in w["etymology"], f"Missing {k} in etymology"
    for k in required_deep:
        assert k in w["deepMeaning"], f"Missing {k} in deepMeaning"
    for k in required_mind:
        assert k in w["nativeMindset"], f"Missing {k} in nativeMindset"
    for k in required_ex:
        assert k in w["examples"], f"Missing {k} in examples"
    for k in required_vis:
        assert k in w["visual"], f"Missing {k} in visual"
    for k in required_vid:
        assert k in w["video"], f"Missing {k} in video"
    for k in required_toeic:
        assert k in w["toeicContext"], f"Missing {k} in toeicContext"
    
    assert len(w["examples"]["daily"]) == 3, f"Daily count {len(w['examples']['daily'])}"
    assert len(w["examples"]["business"]) == 3, f"Business count {len(w['examples']['business'])}"
    assert len(w["examples"]["conversation"]) >= 2, f"Conversation count {len(w['examples']['conversation'])}"
    assert len(w["examples"]["collocations"]) >= 5, f"Collocations count {len(w['examples']['collocations'])}"
    assert len(w["synonyms"]) >= 4, f"Synonyms count {len(w['synonyms'])}"
    assert len(w["relatedWords"]) >= 5, f"RelatedWords count {len(w['relatedWords'])}"
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    assert w["level"] in ["essential", "intermediate", "advanced"]

print("All assertions passed with 100% compliance!")
