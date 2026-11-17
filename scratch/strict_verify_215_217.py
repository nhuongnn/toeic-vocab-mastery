import json

with open("scratch/finance_215_217.json", "r", encoding="utf-8") as f:
    data = json.load(f)

assert "words" in data, "Missing 'words'"
words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

required_word_keys = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

pronunciation_keys = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
etymology_keys = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
deep_keys = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
native_keys = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
example_keys = ["daily", "business", "conversation", "collocations"]
visual_keys = ["imageKeyword", "imageDescription", "mnemonic"]
video_keys = ["description"]
toeic_keys = ["commonParts", "exampleQuestion", "tips"]

banned_phrases = ["... factor", "factor", "standard practice", "procedure", "management", "PERPET:", "PERFOR:", "TRADEB:"]

for idx, w in enumerate(words):
    print(f"Validating word {idx}: {w['word']} ({w['id']})")
    for k in required_word_keys:
        assert k in w, f"Missing {k} in word {w.get('word', 'unknown')}"
    for k in pronunciation_keys:
        assert k in w["pronunciation"], f"Missing {k} in pronunciation of {w['word']}"
    for k in etymology_keys:
        assert k in w["etymology"], f"Missing {k} in etymology of {w['word']}"
    assert len(w["etymology"]["relatedLanguages"]) >= 4, f"relatedLanguages < 4 in {w['word']}"
    for k in deep_keys:
        assert k in w["deepMeaning"], f"Missing {k} in deepMeaning of {w['word']}"
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    for k in native_keys:
        assert k in w["nativeMindset"], f"Missing {k} in nativeMindset of {w['word']}"
    for k in example_keys:
        assert k in w["examples"], f"Missing {k} in examples of {w['word']}"
    assert len(w["examples"]["daily"]) == 3, f"daily != 3 in {w['word']}"
    assert len(w["examples"]["business"]) == 3, f"business != 3 in {w['word']}"
    assert len(w["examples"]["conversation"]) in [2, 3], f"conversation not 2 or 3 in {w['word']}"
    assert len(w["examples"]["collocations"]) in [5, 6, 7], f"collocations not 5-7 in {w['word']}"
    for k in visual_keys:
        assert k in w["visual"], f"Missing {k} in visual of {w['word']}"
    for k in video_keys:
        assert k in w["video"], f"Missing {k} in video of {w['word']}"
    for k in toeic_keys:
        assert k in w["toeicContext"], f"Missing {k} in toeicContext of {w['word']}"
    assert len(w["synonyms"]) >= 4, f"synonyms < 4 in {w['word']}"
    for syn in w["synonyms"]:
        assert not syn.endswith(" factor"), f"Synonym contains 'factor': {syn}"
        assert not syn.endswith(" management"), f"Synonym contains 'management': {syn}"
    assert isinstance(w["antonyms"], list)
    assert len(w["relatedWords"]) >= 5, f"relatedWords < 5 in {w['word']}"
    for rw in w["relatedWords"]:
        assert not rw.endswith(" management"), f"Related word contains 'management': {rw}"

print("ALL VALIDATIONS PASSED CLEANLY FOR FINANCE-215, 216, 217!")
