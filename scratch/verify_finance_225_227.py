import json

with open("scratch/finance_225_227.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

REQUIRED_KEYS = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

FORBIDDEN_PHRASES = [
    "factor", "management", "documentation for", "is ready for the board meeting",
    "German: prin...", "Dutch: prin...", "French: pro-", "standard practice"
]

for w in words:
    print(f"Validating word: {w['id']} - {w['word']}")
    for k in REQUIRED_KEYS:
        assert k in w, f"Missing required key: {k} in {w['id']}"
    
    # Pronunciation
    pron = w["pronunciation"]
    for pk in ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]:
        assert pk in pron and len(str(pron[pk]).strip()) > 0, f"Missing {pk} in pronunciation of {w['id']}"
    assert pron["ipa"].startswith("/") and pron["ipa"].endswith("/"), f"IPA should be enclosed in slashes: {pron['ipa']}"
    
    # Etymology
    etym = w["etymology"]
    for ek in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        assert ek in etym, f"Missing {ek} in etymology of {w['id']}"
    assert isinstance(etym["relatedLanguages"], list) and len(etym["relatedLanguages"]) >= 4, f"Insufficient relatedLanguages in {w['id']}"
    
    # DeepMeaning
    dm = w["deepMeaning"]
    for dmk in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        assert dmk in dm and len(str(dm[dmk]).strip()) > 0, f"Missing {dmk} in deepMeaning of {w['id']}"
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]
    
    # NativeMindset
    nm = w["nativeMindset"]
    for nmk in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        assert nmk in nm and len(str(nm[nmk]).strip()) > 0, f"Missing {nmk} in nativeMindset of {w['id']}"
        
    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) == 3, f"Expected 3 daily examples, got {len(ex['daily'])} in {w['id']}"
    assert len(ex["business"]) == 3, f"Expected 3 business examples, got {len(ex['business'])} in {w['id']}"
    assert len(ex["conversation"]) >= 2, f"Expected at least 2 conversation pairs in {w['id']}"
    assert len(ex["collocations"]) >= 5, f"Expected at least 5 collocations in {w['id']}"
    
    # Visual
    vis = w["visual"]
    for vk in ["imageKeyword", "imageDescription", "mnemonic"]:
        assert vk in vis and len(str(vis[vk]).strip()) > 0, f"Missing {vk} in visual of {w['id']}"
        
    # Video
    assert "description" in w["video"] and len(w["video"]["description"].strip()) > 0
    
    # TOEIC Context
    tc = w["toeicContext"]
    assert isinstance(tc["commonParts"], list) and len(tc["commonParts"]) > 0
    assert len(tc["exampleQuestion"].strip()) > 0
    assert len(tc["tips"].strip()) > 0
    assert "(A)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    
    # Synonyms, Antonyms, Related
    assert len(w["synonyms"]) >= 4, f"Expected at least 4 synonyms in {w['id']}"
    assert isinstance(w["antonyms"], list)
    assert len(w["relatedWords"]) >= 5, f"Expected at least 5 relatedWords in {w['id']}"

    # Check for boilerplate in synonyms/related
    for syn in w["synonyms"]:
        assert not syn.endswith(" factor"), f"Boilerplate synonym: {syn}"
        assert not syn.endswith(" management"), f"Boilerplate synonym: {syn}"
    for rel in w["relatedWords"]:
        assert not rel.endswith(" factor"), f"Boilerplate related: {rel}"
        assert not rel.endswith(" management") or "relationship management" in rel or "supply management" in rel, f"Boilerplate related: {rel}"

print("All validations PASSED perfectly!")
