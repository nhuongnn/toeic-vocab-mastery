import json

with open("scratch/finance_218_220.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["result"]["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

required_word_keys = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

for w in words:
    for k in required_word_keys:
        assert k in w, f"Missing key '{k}' in {w.get('id')}"

    # Pronunciation
    p = w["pronunciation"]
    for pk in ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]:
        assert pk in p and p[pk], f"Missing or empty pronunciation key '{pk}' in {w['id']}"

    # Etymology
    e = w["etymology"]
    for ek in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        assert ek in e and e[ek], f"Missing or empty etymology key '{ek}' in {w['id']}"
    assert isinstance(e["relatedLanguages"], list) and len(e["relatedLanguages"]) >= 3

    # DeepMeaning
    dm = w["deepMeaning"]
    for dmk in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        assert dmk in dm and dm[dmk], f"Missing or empty deepMeaning key '{dmk}' in {w['id']}"
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]

    # NativeMindset
    nm = w["nativeMindset"]
    for nmk in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        assert nmk in nm and nm[nmk], f"Missing or empty nativeMindset key '{nmk}' in {w['id']}"

    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) >= 3, f"Expected >=3 daily examples in {w['id']}, got {len(ex['daily'])}"
    assert len(ex["business"]) >= 3, f"Expected >=3 business examples in {w['id']}, got {len(ex['business'])}"
    assert len(ex["conversation"]) >= 2, f"Expected >=2 conversation examples in {w['id']}, got {len(ex['conversation'])}"
    assert len(ex["collocations"]) >= 5, f"Expected >=5 collocations in {w['id']}, got {len(ex['collocations'])}"

    # Visual
    v = w["visual"]
    for vk in ["imageKeyword", "imageDescription", "mnemonic"]:
        assert vk in v and v[vk], f"Missing or empty visual key '{vk}' in {w['id']}"

    # Video
    assert "description" in w["video"] and w["video"]["description"]

    # TOEIC Context
    tc = w["toeicContext"]
    assert isinstance(tc["commonParts"], list) and len(tc["commonParts"]) > 0
    assert "exampleQuestion" in tc and "(A)" in tc["exampleQuestion"] and "(B)" in tc["exampleQuestion"]
    assert "tips" in tc and tc["tips"]

    # Synonyms / Antonyms / RelatedWords
    assert len(w["synonyms"]) >= 4, f"Expected >=4 synonyms in {w['id']}, got {len(w['synonyms'])}"
    assert isinstance(w["antonyms"], list)
    assert len(w["relatedWords"]) >= 5, f"Expected >=5 relatedWords in {w['id']}, got {len(w['relatedWords'])}"

    # Check for placeholder/forbidden strings
    for field_name, text in [
        ("coreConcept", dm["coreConcept"]),
        ("howNativesThink", nm["howNativesThink"]),
        ("tips", tc["tips"])
    ]:
        assert "factor" not in text.lower() or "factor" in ["refinance factor"], f"Suspicious 'factor' in {field_name} of {w['id']}: {text}"
        assert "manage the..." not in text
        assert "ready for the board meeting" not in text

print("All validations PASSED successfully!")
