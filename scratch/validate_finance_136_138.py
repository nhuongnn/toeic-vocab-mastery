import json
import re

with open("scratch/finance_136_138.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

REQUIRED_WORD_KEYS = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

FORBIDDEN_PHRASES = [
    "factor",
    "documentation for",
    "is ready for the board meeting",
    "Income statement hierarchy",
    "assets balancing liabilities plus equity",
    "Financial Integrity Secures Corporate Capital Growth",
    "Professional business overview: practical applications and strategic significance of",
    "The internal audit team reconciled the financial",
    "A foundational professional concept and noun designating",
    "manage the"
]

for w in words:
    print(f"Validating word: {w['word']} ({w['id']})")
    for k in REQUIRED_WORD_KEYS:
        assert k in w, f"Missing key {k} in word {w['word']}"

    # Check forbidden boilerplate
    word_str = json.dumps(w, ensure_ascii=False)
    for fp in FORBIDDEN_PHRASES:
        assert fp.lower() not in word_str.lower(), f"Forbidden phrase '{fp}' found in word {w['word']}!"

    # Pronunciation
    p = w["pronunciation"]
    assert "ipa" in p and p["ipa"].startswith("/") and p["ipa"].endswith("/")
    assert "syllableBreakdown" in p and len(p["syllableBreakdown"]) > 0
    assert "stressPattern" in p and len(p["stressPattern"]) > 0
    assert "commonMistakes" in p and len(p["commonMistakes"]) > 30

    # Etymology
    e = w["etymology"]
    assert "origin" in e and len(e["origin"]) > 10
    assert "rootWord" in e and len(e["rootWord"]) > 0
    assert "rootMeaning" in e and len(e["rootMeaning"]) > 0
    assert "evolution" in e and len(e["evolution"]) > 50
    assert "relatedLanguages" in e and len(e["relatedLanguages"]) >= 4
    assert "firstRecordedUse" in e and len(e["firstRecordedUse"]) > 5

    # Deep Meaning
    dm = w["deepMeaning"]
    assert "coreConcept" in dm and len(dm["coreConcept"]) > 30
    assert "spatialContext" in dm and len(dm["spatialContext"]) > 20
    assert "temporalContext" in dm and len(dm["temporalContext"]) > 20
    assert "emotionalTone" in dm and len(dm["emotionalTone"]) > 5
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]

    # Native Mindset
    nm = w["nativeMindset"]
    assert "howNativesThink" in nm and len(nm["howNativesThink"]) > 50
    assert "mentalImage" in nm and len(nm["mentalImage"]) > 50
    assert "whenToUse" in nm and len(nm["whenToUse"]) > 30
    assert "whenNotToUse" in nm and len(nm["whenNotToUse"]) > 30
    assert "culturalContext" in nm and len(nm["culturalContext"]) > 50

    # Examples
    ex = w["examples"]
    assert "daily" in ex and len(ex["daily"]) == 3
    assert "business" in ex and len(ex["business"]) == 3
    assert "conversation" in ex and len(ex["conversation"]) in [2, 3]
    for c in ex["conversation"]:
        assert "/" in c, f"Conversation line should have dialogue pair separated by '/': {c}"
    assert "collocations" in ex and len(ex["collocations"]) in [5, 6, 7]

    # Word family
    wf = w["wordFamily"]
    assert isinstance(wf, dict)

    # Visual
    vis = w["visual"]
    assert "imageKeyword" in vis and len(vis["imageKeyword"]) > 10
    assert "imageDescription" in vis and len(vis["imageDescription"]) > 30
    assert "mnemonic" in vis and len(vis["mnemonic"]) > 15

    # Video
    vid = w["video"]
    assert "description" in vid and len(vid["description"]) > 20

    # TOEIC Context
    tc = w["toeicContext"]
    assert "commonParts" in tc and len(tc["commonParts"]) >= 2
    assert "exampleQuestion" in tc and "(A)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert "tips" in tc and len(tc["tips"]) > 50

    # Synonyms / Antonyms / Related words
    assert len(w["synonyms"]) >= 4, f"Synonyms count: {len(w['synonyms'])}"
    assert isinstance(w["antonyms"], list)
    assert len(w["relatedWords"]) >= 5, f"Related words count: {len(w['relatedWords'])}"

    print(f"Word {w['word']} passed all strict validation criteria successfully!")

print("\nALL 3 WORDS PASSED FULL VALIDATION!")
