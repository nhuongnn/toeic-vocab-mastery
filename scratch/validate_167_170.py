import json

with open("scratch/comms_167_170.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for w in data["words"]:
    print(f"Validating {w['id']} - {w['word']}...")
    assert w["id"] in ["comms-167", "comms-168", "comms-169", "comms-170"]
    assert w["category"] == "communications"
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], (int, float))
    assert isinstance(w["partOfSpeech"], list) and len(w["partOfSpeech"]) > 0
    
    # Pronunciation
    p = w["pronunciation"]
    assert p["ipa"]
    assert p["syllableBreakdown"]
    assert p["stressPattern"]
    assert p["commonMistakes"]
    assert p["audioUrl"]
    
    # Etymology
    e = w["etymology"]
    assert e["origin"]
    assert e["rootWord"]
    assert e["rootMeaning"]
    assert e["evolution"]
    assert len(e["relatedLanguages"]) >= 4, f"{w['word']} relatedLanguages has {len(e['relatedLanguages'])}"
    assert e["firstRecordedUse"]
    
    # Deep meaning
    dm = w["deepMeaning"]
    assert dm["coreConcept"]
    assert dm["spatialContext"]
    assert dm["temporalContext"]
    assert dm["emotionalTone"]
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]
    
    # Native mindset
    nm = w["nativeMindset"]
    assert nm["howNativesThink"]
    assert nm["mentalImage"]
    assert nm["whenToUse"]
    assert nm["whenNotToUse"]
    assert nm["culturalContext"]
    
    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) == 3, f"{w['word']} daily has {len(ex['daily'])}"
    assert len(ex["business"]) == 3, f"{w['word']} business has {len(ex['business'])}"
    assert len(ex["conversation"]) in [2, 3], f"{w['word']} conversation has {len(ex['conversation'])}"
    assert len(ex["collocations"]) in [5, 6], f"{w['word']} collocations has {len(ex['collocations'])}"
    
    # Word family
    wf = w["wordFamily"]
    assert "noun" in wf
    assert "verb" in wf
    assert "adjective" in wf
    assert "adverb" in wf
    
    # Visual
    v = w["visual"]
    assert v["imageKeyword"]
    assert v["imageDescription"]
    assert v["mnemonic"]
    
    # Video
    vid = w["video"]
    assert vid["description"]
    
    # TOEIC context
    tc = w["toeicContext"]
    assert len(tc["commonParts"]) > 0
    assert tc["exampleQuestion"]
    assert "(A)" in tc["exampleQuestion"]
    assert "(B)" in tc["exampleQuestion"]
    assert "(C)" in tc["exampleQuestion"]
    assert "(D)" in tc["exampleQuestion"]
    assert tc["tips"]
    
    # Synonyms, antonyms, relatedWords
    assert 4 <= len(w["synonyms"]) <= 6, f"{w['word']} synonyms has {len(w['synonyms'])}"
    assert isinstance(w["antonyms"], list)
    assert 5 <= len(w["relatedWords"]) <= 7, f"{w['word']} relatedWords has {len(w['relatedWords'])}"
    
    # Check for placeholder / generic forbidden text
    text_corpus = json.dumps(w).lower()
    assert "... factor" not in text_corpus
    assert "documentation for... is ready for the board meeting" not in text_corpus
    assert "manage the..." not in text_corpus
    
    print(f"Verified {w['id']} - {w['word']}: PASS")

print("\nALL 4 WORDS PASSED STRICT VALIDATION SUCCESSFULLY!")
