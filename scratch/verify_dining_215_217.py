import json

with open("scratch/dining_215_217.json", "r") as f:
    data = json.load(f)

words = data["words"]
print("Total words:", len(words))
assert len(words) == 3

for w in words:
    wid = w["id"]
    w_word = w["word"]
    print(f"Checking word: {w_word} ({wid})")
    assert w["id"] in ["dining-215", "dining-216", "dining-217"]
    assert w["category"] == "dining"
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], int)
    
    # Pronunciation
    p = w["pronunciation"]
    assert p["ipa"].startswith("/") and p["ipa"].endswith("/")
    assert p["syllableBreakdown"]
    assert p["stressPattern"]
    assert p["commonMistakes"]
    
    # Etymology
    et = w["etymology"]
    assert et["origin"]
    assert et["rootWord"]
    assert et["rootMeaning"]
    assert et["evolution"]
    assert len(et["relatedLanguages"]) >= 4
    assert et["firstRecordedUse"]
    
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
    assert len(ex["daily"]) == 3, f"Daily examples count: {len(ex['daily'])}"
    assert len(ex["business"]) == 3, f"Business examples count: {len(ex['business'])}"
    assert 2 <= len(ex["conversation"]) <= 3, f"Conversation count: {len(ex['conversation'])}"
    assert 5 <= len(ex["collocations"]) <= 6, f"Collocations count: {len(ex['collocations'])}"
    
    # Word Family
    wf = w["wordFamily"]
    assert "noun" in wf and "verb" in wf and "adjective" in wf and "adverb" in wf
    
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
    assert len(tc["commonParts"]) >= 3
    assert "(A)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert tc["tips"]
    
    # Synonyms, antonyms, relatedWords
    assert 4 <= len(w["synonyms"]) <= 6, f"Synonyms count: {len(w['synonyms'])}"
    assert isinstance(w["antonyms"], list)
    assert 5 <= len(w["relatedWords"]) <= 7, f"Related words count: {len(w['relatedWords'])}"

    # Check forbidden strings
    dump = json.dumps(w)
    for bad in ["factor", "manage the...", "documentation for...", "operational accountability", "strategic workflows"]:
        assert bad not in dump, f"Found forbidden phrase {bad} in {wid}"

print("ALL VERIFICATIONS PASSED PERFECTLY!")
