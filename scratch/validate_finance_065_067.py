import json

with open("scratch/finance_065_067.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print(f"Loaded {len(words)} words.")

banned_phrases = [
    "... factor", "manage the...", "documentation for... is ready for the board meeting",
    "actuary factor", "adjustment factor", "allocation factor",
    "actuary management", "adjustment management", "allocation management",
    "core Germanic commercial root", "Old English / Germanic Lexical Root"
]

for w in words:
    # 1. Identity
    assert w["id"] in ["finance-065", "finance-066", "finance-067"], f"Invalid ID {w['id']}"
    assert w["word"] in ["actuary", "adjustment", "allocation"], f"Invalid word {w['word']}"
    assert isinstance(w["partOfSpeech"], list) and len(w["partOfSpeech"]) > 0
    assert w["category"] == "finance"
    assert w["level"] == "intermediate"
    assert w["toeicFrequency"] == 8

    # 2. Pronunciation
    p = w["pronunciation"]
    assert p["ipa"].startswith("/") and p["ipa"].endswith("/")
    assert "·" in p["syllableBreakdown"]
    assert p["stressPattern"]
    assert p["commonMistakes"]

    # 3. Etymology
    e = w["etymology"]
    assert e["origin"]
    assert e["rootWord"]
    assert e["rootMeaning"]
    assert len(e["evolution"]) > 50
    assert isinstance(e["relatedLanguages"], list) and len(e["relatedLanguages"]) >= 3
    assert e["firstRecordedUse"]

    # 4. Deep Meaning
    dm = w["deepMeaning"]
    assert len(dm["coreConcept"]) > 40
    assert len(dm["spatialContext"]) > 20
    assert len(dm["temporalContext"]) > 20
    assert dm["emotionalTone"]
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]

    # 5. Native Mindset
    nm = w["nativeMindset"]
    assert len(nm["howNativesThink"]) > 40
    assert len(nm["mentalImage"]) > 40
    assert len(nm["whenToUse"]) > 30
    assert len(nm["whenNotToUse"]) > 30
    assert len(nm["culturalContext"]) > 30

    # 6. Examples
    ex = w["examples"]
    assert len(ex["daily"]) == 3, f"daily count is {len(ex['daily'])}"
    assert len(ex["business"]) == 3, f"business count is {len(ex['business'])}"
    assert len(ex["conversation"]) >= 2, f"conversation count is {len(ex['conversation'])}"
    assert len(ex["collocations"]) >= 5, f"collocations count is {len(ex['collocations'])}"

    # 7. Word Family
    wf = w["wordFamily"]
    assert "noun" in wf and "verb" in wf and "adjective" in wf and "adverb" in wf

    # 8. Visual
    v = w["visual"]
    assert len(v["imageKeyword"]) > 10
    assert len(v["imageDescription"]) > 30
    assert len(v["mnemonic"]) > 10

    # 9. Video
    vid = w["video"]
    assert len(vid["description"]) > 20

    # 10. TOEIC Context
    tc = w["toeicContext"]
    assert isinstance(tc["commonParts"], list) and len(tc["commonParts"]) >= 2
    assert "(A)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert len(tc["tips"]) > 30

    # 11. Synonyms / Antonyms / Related
    assert 4 <= len(w["synonyms"]) <= 8, f"synonyms count {len(w['synonyms'])}"
    assert isinstance(w["antonyms"], list)
    assert 5 <= len(w["relatedWords"]) <= 9, f"relatedWords count {len(w['relatedWords'])}"

    # Check banned boilerplate
    dumped = json.dumps(w)
    for b in banned_phrases:
        assert b not in dumped, f"Found banned phrase '{b}' in {w['id']}"

    print(f"✓ All checks passed for {w['id']} - {w['word']}")

print("ALL THREE WORDS VALIDATED SUCCESSFULLY!")
