import json

with open("scratch/dining_239_241.json") as f:
    data = json.load(f)

words = data["words"]
print(f"Total words: {len(words)}")

for w in words:
    wid = w["id"]
    ww = w["word"]
    print(f"Checking {wid} - {ww}")
    assert w["id"] in ["dining-239", "dining-240", "dining-241"]
    assert isinstance(w["partOfSpeech"], list) and len(w["partOfSpeech"]) > 0
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], int)
    
    # Pronunciation
    p = w["pronunciation"]
    for k in ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]:
        assert k in p and p[k], f"Missing pronunciation.{k}"
        
    # Etymology
    e = w["etymology"]
    for k in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        assert k in e and e[k], f"Missing etymology.{k}"
        
    # Deep meaning
    dm = w["deepMeaning"]
    for k in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        assert k in dm and dm[k], f"Missing deepMeaning.{k}"
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]
    
    # Native mindset
    nm = w["nativeMindset"]
    for k in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        assert k in nm and nm[k], f"Missing nativeMindset.{k}"
        
    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) == 3, f"Expected 3 daily examples, got {len(ex['daily'])}"
    assert len(ex["business"]) == 3, f"Expected 3 business examples, got {len(ex['business'])}"
    assert len(ex["conversation"]) >= 2, f"Expected at least 2 conversation examples, got {len(ex['conversation'])}"
    assert len(ex["collocations"]) >= 5, f"Expected at least 5 collocations, got {len(ex['collocations'])}"
    
    # Word family
    wf = w["wordFamily"]
    assert isinstance(wf, dict)
    
    # Visual
    v = w["visual"]
    for k in ["imageKeyword", "imageDescription", "mnemonic"]:
        assert k in v and v[k], f"Missing visual.{k}"
        
    # Video
    assert "description" in w["video"] and w["video"]["description"]
    
    # TOEIC context
    tc = w["toeicContext"]
    assert isinstance(tc["commonParts"], list) and len(tc["commonParts"]) > 0
    assert "exampleQuestion" in tc and tc["exampleQuestion"]
    assert "tips" in tc and tc["tips"]
    
    # Synonyms / antonyms / related words
    assert isinstance(w["synonyms"], list) and len(w["synonyms"]) >= 4
    assert isinstance(w["antonyms"], list)
    assert isinstance(w["relatedWords"], list) and len(w["relatedWords"]) >= 5
    
print("All validations PASSED!")
