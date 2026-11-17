import json

with open("scratch/finance_203_205.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

banned_phrases = [
    "factor", "standard practice", "procedure", "protocol", "implementation",
    "documentation for... is ready", "manage the...", "Professional Coordination Secures Operational Excellence",
    "Financial Integrity Secures Corporate Capital Growth", "meeting participants were instructed",
    "A foundational professional concept and noun designating", "A critical qualifying attribute describing operations"
]

for w in words:
    print(f"Validating word: {w['id']} - {w['word']}")
    # Check id, word, partOfSpeech, category, level, toeicFrequency
    assert w["id"] in ["finance-203", "finance-204", "finance-205"]
    assert w["category"] == "finance"
    assert w["level"] == "intermediate"
    assert w["toeicFrequency"] == 8

    # Pronunciation
    p = w["pronunciation"]
    assert p["ipa"].startswith("/") and p["ipa"].endswith("/")
    assert len(p["syllableBreakdown"]) > 0
    assert len(p["stressPattern"]) > 0
    assert len(p["commonMistakes"]) > 20

    # Etymology
    et = w["etymology"]
    assert len(et["origin"]) > 20
    assert len(et["rootWord"]) > 0
    assert len(et["rootMeaning"]) > 10
    assert len(et["evolution"]) > 50
    assert len(et["relatedLanguages"]) >= 3
    assert len(et["firstRecordedUse"]) > 5

    # Deep Meaning
    dm = w["deepMeaning"]
    assert len(dm["coreConcept"]) > 30
    assert len(dm["spatialContext"]) > 20
    assert len(dm["temporalContext"]) > 20
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]

    # Native Mindset
    nm = w["nativeMindset"]
    assert len(nm["howNativesThink"]) > 50
    assert len(nm["mentalImage"]) > 50
    assert len(nm["whenToUse"]) > 30
    assert len(nm["whenNotToUse"]) > 30
    assert len(nm["culturalContext"]) > 30

    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) == 3
    assert len(ex["business"]) == 3
    assert len(ex["conversation"]) in [2, 3]
    assert 5 <= len(ex["collocations"]) <= 6

    # Word family
    wf = w["wordFamily"]
    assert "noun" in wf and "verb" in wf and "adjective" in wf and "adverb" in wf

    # Visual & Video
    v = w["visual"]
    assert len(v["imageKeyword"]) > 10
    assert len(v["imageDescription"]) > 30
    assert len(v["mnemonic"]) > 20
    assert len(w["video"]["description"]) > 20

    # TOEIC Context
    tc = w["toeicContext"]
    assert len(tc["commonParts"]) >= 2
    assert len(tc["exampleQuestion"]) > 50
    assert "(A)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert len(tc["tips"]) > 30

    # Synonyms, antonyms, related words
    assert 4 <= len(w["synonyms"]) <= 6
    assert 5 <= len(w["relatedWords"]) <= 7

    # Boilerplate checks
    dumped = json.dumps(w).lower()
    for bp in banned_phrases:
        if bp.lower() in dumped:
            raise ValueError(f"Found banned boilerplate '{bp}' in {w['id']}")

print("ALL VALIDATION CHECKS PASSED PERFECTLY!")
