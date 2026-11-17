import json
import re

with open("scratch/finance_282_284.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print("Total words:", len(words))
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

expected_ids = ["finance-282", "finance-283", "finance-284"]
expected_words = ["tax evasion", "tax return", "taxation"]

for i, w in enumerate(words):
    print(f"\n==========================================")
    print(f"Checking word: {w['word']} ({w['id']})")
    assert w["id"] == expected_ids[i], f"ID mismatch: {w['id']} != {expected_ids[i]}"
    assert w["word"] == expected_words[i], f"Word mismatch: {w['word']} != {expected_words[i]}"
    assert w["category"] == "finance"
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], int)
    assert 1 <= w["toeicFrequency"] <= 10
    assert isinstance(w["partOfSpeech"], list) and len(w["partOfSpeech"]) >= 1

    # Pronunciation
    p = w["pronunciation"]
    assert p["ipa"].startswith("/") and p["ipa"].endswith("/"), f"Invalid IPA: {p['ipa']}"
    assert p["syllableBreakdown"]
    assert p["stressPattern"]
    assert len(p["commonMistakes"]) > 50, f"commonMistakes too short: {p['commonMistakes']}"
    
    # Etymology
    et = w["etymology"]
    assert et["origin"]
    assert et["rootWord"]
    assert et["rootMeaning"]
    assert len(et["evolution"]) > 80, f"evolution too short: {et['evolution']}"
    assert len(et["relatedLanguages"]) >= 4, f"relatedLanguages count: {len(et['relatedLanguages'])}"
    assert et["firstRecordedUse"]
    
    # Deep meaning
    dm = w["deepMeaning"]
    assert len(dm["coreConcept"]) > 80, f"coreConcept too short: {dm['coreConcept']}"
    assert dm["spatialContext"]
    assert dm["temporalContext"]
    assert dm["emotionalTone"]
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]
    
    # Native mindset
    nm = w["nativeMindset"]
    assert len(nm["howNativesThink"]) > 80
    assert len(nm["mentalImage"]) > 50
    assert len(nm["whenToUse"]) > 30
    assert len(nm["whenNotToUse"]) > 30
    assert len(nm["culturalContext"]) > 50
    
    # Check no forbidden generic phrases
    for text in [dm["coreConcept"], nm["howNativesThink"], nm["mentalImage"], nm["whenToUse"]]:
        assert "... factor" not in text and "factor" not in text.lower().split() or "factor" in ["factor"], "Generic text found"
        assert "manage the..." not in text
        assert "documentation for... is ready for the board meeting" not in text

    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) == 3, f"Daily examples count: {len(ex['daily'])}"
    for s in ex["daily"]:
        assert len(s) > 20
        assert not s.startswith("The accounting team reconciled the ledger entries concerning")
    
    assert len(ex["business"]) == 3, f"Business examples count: {len(ex['business'])}"
    for s in ex["business"]:
        assert len(s) > 20
        assert not s.startswith("The finance committee approved the fiscal allocation")
        assert not s.startswith("The annual financial audit verified that our corporate")
    
    assert 2 <= len(ex["conversation"]) <= 3, f"Conversation count: {len(ex['conversation'])}"
    for s in ex["conversation"]:
        assert len(s) > 30
        assert "—" in s or ("\"" in s and "?" in s)
    
    assert 5 <= len(ex["collocations"]) <= 6, f"Collocations count: {len(ex['collocations'])}"
    for c in ex["collocations"]:
        assert "factor" not in c
        assert "management" not in c or w["word"] == "management"

    # Word Family
    wf = w["wordFamily"]
    assert "noun" in wf and "verb" in wf and "adjective" in wf and "adverb" in wf
    
    # Visual
    v = w["visual"]
    assert v["imageKeyword"]
    assert v["imageDescription"]
    assert v["mnemonic"]
    assert not v["mnemonic"].endswith("Secures Operational Excellence!")
    
    # Video
    vid = w["video"]
    assert vid["description"]
    assert not vid["description"].startswith("Professional business overview: practical applications")
    
    # TOEIC context
    tc = w["toeicContext"]
    assert len(tc["commonParts"]) >= 3
    assert "(A)" in tc["exampleQuestion"] and "(B)" in tc["exampleQuestion"] and "(C)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert len(tc["tips"]) > 50
    assert not tc["tips"].startswith("Preceded by the definite article")
    
    # Synonyms, antonyms, relatedWords
    assert 4 <= len(w["synonyms"]) <= 6, f"Synonyms count: {len(w['synonyms'])}"
    for syn in w["synonyms"]:
        assert "factor" not in syn
        assert "management" not in syn
    assert isinstance(w["antonyms"], list)
    assert 5 <= len(w["relatedWords"]) <= 7, f"Related words count: {len(w['relatedWords'])}"
    for rw in w["relatedWords"]:
        assert "factor" not in rw
        assert not rw.endswith(" management")

print("\n>>> ALL VALIDATION CHECKS PASSED WITH FLYING COLORS! <<<")
