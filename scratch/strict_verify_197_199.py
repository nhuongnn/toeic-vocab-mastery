import json
import re

with open("scratch/dining_197_199.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print("Total words:", len(words))
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

expected_ids = ["dining-197", "dining-198", "dining-199"]
for i, w in enumerate(words):
    assert w["id"] == expected_ids[i], f"Expected {expected_ids[i]}, got {w['id']}"
    print(f"\nChecking word: {w['word']} ({w['id']})")
    assert w["category"] == "dining"
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], int)
    
    # Pronunciation
    p = w["pronunciation"]
    assert p["ipa"].startswith("/") and p["ipa"].endswith("/")
    assert p["syllableBreakdown"]
    assert p["stressPattern"]
    assert p["commonMistakes"]
    assert "audioUrl" in p and p["audioUrl"].startswith("https://")
    
    # Etymology
    et = w["etymology"]
    assert et["origin"]
    assert et["rootWord"]
    assert et["rootMeaning"]
    assert et["evolution"]
    assert len(et["relatedLanguages"]) >= 4, f"Related languages count: {len(et['relatedLanguages'])}"
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
    
    # Check conversation format
    for conv in ex["conversation"]:
        assert " / " in conv, f"Conversation missing dialogue delimiter ' / ': {conv}"
    
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
    assert "(A)" in tc["exampleQuestion"] and "(B)" in tc["exampleQuestion"] and "(C)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert tc["tips"]
    
    # Synonyms, antonyms, relatedWords
    assert 4 <= len(w["synonyms"]) <= 6, f"Synonyms count: {len(w['synonyms'])}"
    assert isinstance(w["antonyms"], list)
    assert 5 <= len(w["relatedWords"]) <= 7, f"Related words count: {len(w['relatedWords'])}"

    # Check for forbidden placeholder patterns
    banned_phrases = ["... factor", "manage the...", "documentation for... is ready for the board meeting", "foundational operational practice of", "core Germanic commercial root", "Preserved through centuries of Anglo-Saxon and Middle English maritime commerce"]
    as_str = json.dumps(w)
    for bp in banned_phrases:
        assert bp.lower() not in as_str.lower(), f"Found banned phrase '{bp}' in {w['id']}"

print("\nALL STRICT ASSERTIONS PASSED PERFECTLY!")
