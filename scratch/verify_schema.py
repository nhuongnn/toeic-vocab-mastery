import json

with open("scratch/dining_185_188.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
required_top = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

pronunciation_req = ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]
etymology_req = ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]
deep_req = ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]
native_req = ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]
examples_req = ["daily", "business", "conversation", "collocations"]
visual_req = ["imageKeyword", "imageDescription", "mnemonic"]
video_req = ["description"]
toeic_req = ["commonParts", "exampleQuestion", "tips"]

for w in words:
    print(f"Checking word: {w['word']} ({w['id']})")
    for k in required_top:
        assert k in w, f"Missing {k} in {w['id']}"
    for k in pronunciation_req:
        assert k in w["pronunciation"], f"Missing pronunciation.{k} in {w['id']}"
    for k in etymology_req:
        assert k in w["etymology"], f"Missing etymology.{k} in {w['id']}"
    for k in deep_req:
        assert k in w["deepMeaning"], f"Missing deepMeaning.{k} in {w['id']}"
    for k in native_req:
        assert k in w["nativeMindset"], f"Missing nativeMindset.{k} in {w['id']}"
    for k in examples_req:
        assert k in w["examples"], f"Missing examples.{k} in {w['id']}"
    for k in visual_req:
        assert k in w["visual"], f"Missing visual.{k} in {w['id']}"
    for k in video_req:
        assert k in w["video"], f"Missing video.{k} in {w['id']}"
    for k in toeic_req:
        assert k in w["toeicContext"], f"Missing toeicContext.{k} in {w['id']}"
    
    assert len(w["examples"]["daily"]) >= 3, f"daily < 3 in {w['id']}"
    assert len(w["examples"]["business"]) >= 3, f"business < 3 in {w['id']}"
    assert len(w["examples"]["conversation"]) >= 2, f"conversation < 2 in {w['id']}"
    assert len(w["examples"]["collocations"]) >= 5, f"collocations < 5 in {w['id']}"
    assert len(w["synonyms"]) >= 4, f"synonyms < 4 in {w['id']}"
    assert len(w["relatedWords"]) >= 5, f"relatedWords < 5 in {w['id']}"
    assert w["deepMeaning"]["formalityLevel"] in ["formal", "neutral", "informal"]
    assert w["deepMeaning"]["connotation"] in ["positive", "neutral", "negative"]
    assert w["level"] in ["essential", "intermediate", "advanced"]

print("ALL CHECKS PASSED PERFECTLY!")
