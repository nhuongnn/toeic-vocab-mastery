import json
import re

with open("scratch/words_batch_129_132.json") as f:
    words = json.load(f)

forbidden_phrases = [
    "factor",
    "manage the",
    "documentation for",
    "ready for the board meeting",
    "core Germanic commercial root signifying",
    "Preserved through centuries of Anglo-Saxon and Middle English maritime commerce",
    "A foundational professional concept and noun designating",
    "central to strategic workflows and operational accountability",
    "Executive dining halls, banquet banquet rooms",
    "Multi-course banquet service sequencing, reservation seatings",
    "Gracious Hospitality Elevates Executive Dining Standards",
    "Professional Coordination Secures Operational Excellence"
]

print(f"Total words: {len(words)}")

for idx, w in enumerate(words):
    word_id = w["id"]
    word_text = w["word"]
    print(f"Validating word {idx+1}: {word_id} - {word_text}")
    
    # Check forbidden strings
    dumped = json.dumps(w)
    for fp in forbidden_phrases:
        if fp.lower() in dumped.lower():
            raise ValueError(f"Forbidden phrase '{fp}' found in {word_id}")
            
    # Check fields
    assert w["category"] == "dining", f"Invalid category {w['category']}"
    assert w["level"] in ["essential", "intermediate", "advanced"], f"Invalid level {w['level']}"
    assert isinstance(w["toeicFrequency"], (int, float)), "Invalid toeicFrequency"
    
    # Pronunciation
    pron = w["pronunciation"]
    assert pron["ipa"].startswith("/"), f"Invalid IPA in {word_id}"
    assert len(pron["syllableBreakdown"]) > 0
    assert len(pron["stressPattern"]) > 0
    assert len(pron["commonMistakes"]) > 20
    
    # Etymology
    etym = w["etymology"]
    assert len(etym["origin"]) > 10
    assert len(etym["rootWord"]) > 3
    assert len(etym["rootMeaning"]) > 5
    assert len(etym["evolution"]) > 20
    assert len(etym["relatedLanguages"]) >= 3
    assert len(etym["firstRecordedUse"]) > 3
    
    # Deep Meaning
    dm = w["deepMeaning"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert len(dm["coreConcept"]) > 20
    assert len(dm["spatialContext"]) > 10
    assert len(dm["temporalContext"]) > 10
    assert len(dm["emotionalTone"]) > 5
    
    # Native Mindset
    nm = w["nativeMindset"]
    assert len(nm["howNativesThink"]) > 30
    assert len(nm["mentalImage"]) > 30
    assert len(nm["whenToUse"]) > 20
    assert len(nm["whenNotToUse"]) > 20
    assert len(nm["culturalContext"]) > 30
    
    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) >= 3, "daily < 3"
    assert len(ex["business"]) >= 3, "business < 3"
    assert len(ex["conversation"]) >= 2, "conversation < 2"
    assert len(ex["collocations"]) >= 5, "collocations < 5"
    
    # Visual
    vis = w["visual"]
    assert len(vis["imageKeyword"]) > 5
    assert len(vis["imageDescription"]) > 20
    assert len(vis["mnemonic"]) > 10
    
    # Video
    vid = w["video"]
    assert len(vid["description"]) > 20
    
    # TOEIC Context
    tc = w["toeicContext"]
    assert len(tc["commonParts"]) >= 2
    assert len(tc["exampleQuestion"]) > 30
    assert len(tc["tips"]) > 30
    assert "(A)" in tc["exampleQuestion"] and "(B)" in tc["exampleQuestion"] and "(C)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    
    # Synonyms & Related
    assert 4 <= len(w["synonyms"]) <= 8, f"synonyms count {len(w['synonyms'])}"
    assert 5 <= len(w["relatedWords"]) <= 8, f"relatedWords count {len(w['relatedWords'])}"
    
print("All validations PASSED successfully!")
