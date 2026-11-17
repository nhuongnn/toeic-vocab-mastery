import json

with open("scratch/dining_153_156.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 4, f"Expected 4 words, got {len(words)}"

forbidden_phrases = [
    "factor", "management", "manage the...", "documentation for...",
    "board meeting", "core Germanic commercial root", "foundational operational practice",
    "strategic workflows and operational accountability"
]

for w in words:
    print(f"Validating {w['id']} - {w['word']}...")
    assert w["id"] in ["dining-153", "dining-154", "dining-155", "dining-156"]
    assert isinstance(w["word"], str) and len(w["word"]) > 0
    assert isinstance(w["partOfSpeech"], list) and len(w["partOfSpeech"]) > 0
    assert w["category"] == "dining"
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], int)

    # Pronunciation
    p = w["pronunciation"]
    assert isinstance(p["ipa"], str) and p["ipa"].startswith("/") and p["ipa"].endswith("/")
    assert isinstance(p["syllableBreakdown"], str) and len(p["syllableBreakdown"]) > 0
    assert isinstance(p["stressPattern"], str) and len(p["stressPattern"]) > 0
    assert isinstance(p["commonMistakes"], str) and len(p["commonMistakes"]) > 10

    # Etymology
    e = w["etymology"]
    assert isinstance(e["origin"], str) and len(e["origin"]) > 10
    assert isinstance(e["rootWord"], str) and len(e["rootWord"]) > 0
    assert isinstance(e["rootMeaning"], str) and len(e["rootMeaning"]) > 0
    assert isinstance(e["evolution"], str) and len(e["evolution"]) > 20
    assert isinstance(e["relatedLanguages"], list) and len(e["relatedLanguages"]) >= 3
    assert isinstance(e["firstRecordedUse"], str) and len(e["firstRecordedUse"]) > 0

    # Deep Meaning
    dm = w["deepMeaning"]
    assert isinstance(dm["coreConcept"], str) and len(dm["coreConcept"]) > 20
    assert isinstance(dm["spatialContext"], str) and len(dm["spatialContext"]) > 10
    assert isinstance(dm["temporalContext"], str) and len(dm["temporalContext"]) > 10
    assert isinstance(dm["emotionalTone"], str) and len(dm["emotionalTone"]) > 5
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]

    # Native Mindset
    nm = w["nativeMindset"]
    assert isinstance(nm["howNativesThink"], str) and len(nm["howNativesThink"]) > 30
    assert isinstance(nm["mentalImage"], str) and len(nm["mentalImage"]) > 30
    assert isinstance(nm["whenToUse"], str) and len(nm["whenToUse"]) > 20
    assert isinstance(nm["whenNotToUse"], str) and len(nm["whenNotToUse"]) > 20
    assert isinstance(nm["culturalContext"], str) and len(nm["culturalContext"]) > 30

    # Examples
    ex = w["examples"]
    assert isinstance(ex["daily"], list) and len(ex["daily"]) == 3
    assert isinstance(ex["business"], list) and len(ex["business"]) == 3
    assert isinstance(ex["conversation"], list) and len(ex["conversation"]) in [2, 3]
    assert isinstance(ex["collocations"], list) and len(ex["collocations"]) in [5, 6, 7]

    # Word Family
    wf = w["wordFamily"]
    assert isinstance(wf, dict)
    for k in ["noun", "verb", "adjective", "adverb"]:
        assert k in wf

    # Visual
    vis = w["visual"]
    assert isinstance(vis["imageKeyword"], str) and len(vis["imageKeyword"]) > 5
    assert isinstance(vis["imageDescription"], str) and len(vis["imageDescription"]) > 20
    assert isinstance(vis["mnemonic"], str) and len(vis["mnemonic"]) > 10

    # Video
    vid = w["video"]
    assert isinstance(vid["description"], str) and len(vid["description"]) > 20

    # TOEIC Context
    tc = w["toeicContext"]
    assert isinstance(tc["commonParts"], list) and len(tc["commonParts"]) > 0
    assert "(A)" in tc["exampleQuestion"] and "(B)" in tc["exampleQuestion"] and "(C)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert isinstance(tc["tips"], str) and len(tc["tips"]) > 30

    # Synonyms, Antonyms, Related Words
    assert isinstance(w["synonyms"], list) and len(w["synonyms"]) >= 4
    for syn in w["synonyms"]:
        assert "factor" not in syn.lower()
        assert "management" not in syn.lower()
    assert isinstance(w["antonyms"], list)
    assert isinstance(w["relatedWords"], list) and len(w["relatedWords"]) >= 5

    # Check for forbidden boilerplates
    json_str = json.dumps(w)
    for fp in ["core Germanic commercial root", "foundational operational practice", "strategic workflows and operational accountability"]:
        assert fp not in json_str, f"Found forbidden phrase '{fp}' in {w['id']}"

print("All validation checks PASSED successfully!")
