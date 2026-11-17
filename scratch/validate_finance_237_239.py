import json
import re

with open("scratch/finance_237_239.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

required_word_keys = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

pronunciation_req = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes", "audioUrl"]
etymology_req = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
deepMeaning_req = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
nativeMindset_req = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
examples_req = ["daily", "business", "conversation", "collocations"]
visual_req = ["imageKeyword", "imageDescription", "mnemonic"]
video_req = ["description"]
toeicContext_req = ["commonParts", "exampleQuestion", "tips"]

banned_patterns = [
    r"\bfactor\b", r"manage the\b", r"documentation for.*is ready", r"board meeting",
    r"reconciliation factor", r"recovery factor", r"redeemable factor",
    r"reconciliation management", r"recovery management", r"redeemable management"
]

for w in words:
    print(f"Validating {w['id']} - {w['word']}...")
    
    # Check top-level keys
    for k in required_word_keys:
        assert k in w, f"Missing key {k} in word {w['word']}"
    
    # Check types and values
    assert isinstance(w["partOfSpeech"], list) and len(w["partOfSpeech"]) > 0
    assert w["category"] == "finance"
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], int) and 1 <= w["toeicFrequency"] <= 10
    
    # Pronunciation
    for k in pronunciation_req:
        assert k in w["pronunciation"] and w["pronunciation"][k], f"Missing or empty pronunciation.{k} in {w['word']}"
    assert w["pronunciation"]["ipa"].startswith("/") and w["pronunciation"]["ipa"].endswith("/"), f"Invalid IPA format in {w['word']}"
    assert "-" in w["pronunciation"]["syllableBreakdown"] or "·" in w["pronunciation"]["syllableBreakdown"]
    
    # Etymology
    for k in etymology_req:
        assert k in w["etymology"] and w["etymology"][k], f"Missing or empty etymology.{k} in {w['word']}"
    assert len(w["etymology"]["relatedLanguages"]) >= 3, f"Expected at least 3 related languages in {w['word']}"
    
    # Deep Meaning
    for k in deepMeaning_req:
        assert k in w["deepMeaning"] and w["deepMeaning"][k], f"Missing or empty deepMeaning.{k} in {w['word']}"
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    
    # Native Mindset
    for k in nativeMindset_req:
        assert k in w["nativeMindset"] and w["nativeMindset"][k], f"Missing or empty nativeMindset.{k} in {w['word']}"
    
    # Examples
    for k in examples_req:
        assert k in w["examples"] and w["examples"][k], f"Missing or empty examples.{k} in {w['word']}"
    assert len(w["examples"]["daily"]) == 3, f"Expected 3 daily examples, got {len(w['examples']['daily'])}"
    assert len(w["examples"]["business"]) == 3, f"Expected 3 business examples, got {len(w['examples']['business'])}"
    assert len(w["examples"]["conversation"]) >= 2, f"Expected >=2 conversation examples, got {len(w['examples']['conversation'])}"
    assert len(w["examples"]["collocations"]) >= 5, f"Expected >=5 collocations, got {len(w['examples']['collocations'])}"
    
    # Word Family
    assert isinstance(w["wordFamily"], dict)
    for wf_k in ["noun", "verb", "adjective", "adverb"]:
        assert wf_k in w["wordFamily"]
    
    # Visual
    for k in visual_req:
        assert k in w["visual"] and w["visual"][k], f"Missing or empty visual.{k} in {w['word']}"
    
    # Video
    for k in video_req:
        assert k in w["video"] and w["video"][k], f"Missing or empty video.{k} in {w['word']}"
    
    # TOEIC Context
    for k in toeicContext_req:
        assert k in w["toeicContext"] and w["toeicContext"][k], f"Missing or empty toeicContext.{k} in {w['word']}"
    assert isinstance(w["toeicContext"]["commonParts"], list) and len(w["toeicContext"]["commonParts"]) > 0
    assert "(A)" in w["toeicContext"]["exampleQuestion"] and "(B)" in w["toeicContext"]["exampleQuestion"] and "(C)" in w["toeicContext"]["exampleQuestion"] and "(D)" in w["toeicContext"]["exampleQuestion"]
    
    # Synonyms, Antonyms, Related Words
    assert len(w["synonyms"]) >= 4, f"Expected >= 4 synonyms in {w['word']}"
    for s in w["synonyms"]:
        assert s.lower() not in ["standard practice", "procedure", "factor"], f"Invalid synonym {s} in {w['word']}"
    assert isinstance(w["antonyms"], list)
    assert len(w["relatedWords"]) >= 5, f"Expected >= 5 relatedWords in {w['word']}"
    for rw in w["relatedWords"]:
        assert rw.lower() not in ["implementation", "protocol", "factor"], f"Invalid relatedWord {rw} in {w['word']}"
    
    # Check for banned boilerplate phrases
    dumped_str = json.dumps(w)
    for bp in banned_patterns:
        match = re.search(bp, dumped_str, re.IGNORECASE)
        assert not match, f"Found banned pattern {bp} in word {w['word']}: {match}"

print("ALL STRICT CHECKS PASSED SUCCESSFULLY!")
