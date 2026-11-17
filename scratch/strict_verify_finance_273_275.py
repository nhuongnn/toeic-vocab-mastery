import json

with open("scratch/finance_273_275.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["result"]["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

banned_phrases = [
    "factor", "standard practice", "procedure", "management",
    "documentation for... is ready for the board meeting",
    "manage the...", "Financial Integrity Secures Corporate Capital Growth",
    "A foundational professional concept and noun designating",
    "The internal audit team reconciled the financial",
    "Pay attention to clean articulation of the root syllables"
]

expected_ids = ["finance-273", "finance-274", "finance-275"]
expected_words = ["stipend", "stock", "stockbroker"]
expected_levels = ["intermediate", "essential", "advanced"]
expected_freqs = [8, 9, 7]

for i, w in enumerate(words):
    wid = w["id"]
    word = w["word"]
    print(f"Verifying {wid} ({word})...")
    assert wid == expected_ids[i], f"Expected id {expected_ids[i]}, got {wid}"
    assert word == expected_words[i], f"Expected word {expected_words[i]}, got {word}"
    assert w["level"] == expected_levels[i], f"Expected level {expected_levels[i]}, got {w['level']}"
    assert w["toeicFrequency"] == expected_freqs[i], f"Expected freq {expected_freqs[i]}, got {w['toeicFrequency']}"

    # Check top-level required fields
    for field in ["id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
                  "pronunciation", "etymology", "deepMeaning", "nativeMindset",
                  "examples", "wordFamily", "visual", "video", "toeicContext",
                  "synonyms", "antonyms", "relatedWords"]:
        assert field in w, f"Missing {field} in {wid}"

    assert w["category"] == "finance"
    assert isinstance(w["partOfSpeech"], list) and len(w["partOfSpeech"]) > 0

    # Pronunciation
    p = w["pronunciation"]
    assert "ipa" in p and p["ipa"].startswith("/") and p["ipa"].endswith("/")
    assert "syllableBreakdown" in p and len(p["syllableBreakdown"]) > 0
    assert "stressPattern" in p and len(p["stressPattern"]) > 5
    assert "commonMistakes" in p and len(p["commonMistakes"]) > 20

    # Etymology
    e = w["etymology"]
    for ef in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        assert ef in e and e[ef], f"Missing etymology field {ef} in {wid}"
    assert len(e["relatedLanguages"]) >= 3, f"Expected >= 3 relatedLanguages, got {len(e['relatedLanguages'])}"
    for rl in e["relatedLanguages"]:
        assert not rl.endswith("..."), f"Incomplete cognate {rl}"

    # Deep Meaning
    dm = w["deepMeaning"]
    for dmf in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        assert dmf in dm and dm[dmf], f"Missing deepMeaning field {dmf} in {wid}"
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]

    # Native Mindset
    nm = w["nativeMindset"]
    for nmf in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        assert nmf in nm and nm[nmf], f"Missing nativeMindset field {nmf} in {wid}"

    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) == 3, f"Expected 3 daily examples, got {len(ex['daily'])}"
    assert len(ex["business"]) == 3, f"Expected 3 business examples, got {len(ex['business'])}"
    assert len(ex["conversation"]) in [2, 3], f"Expected 2-3 conversation examples, got {len(ex['conversation'])}"
    assert len(ex["collocations"]) in [5, 6], f"Expected 5-6 collocations, got {len(ex['collocations'])}"

    # Visual
    vis = w["visual"]
    for vf in ["imageKeyword", "imageDescription", "mnemonic"]:
        assert vf in vis and vis[vf], f"Missing visual field {vf} in {wid}"

    # Video
    vid = w["video"]
    assert "description" in vid and vid["description"], f"Missing video description in {wid}"

    # TOEIC Context
    tc = w["toeicContext"]
    assert "commonParts" in tc and len(tc["commonParts"]) >= 2
    assert "exampleQuestion" in tc and len(tc["exampleQuestion"]) > 30
    assert "(A)" in tc["exampleQuestion"] and "(B)" in tc["exampleQuestion"] and "(C)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert "tips" in tc and len(tc["tips"]) > 30

    # Synonyms, Antonyms, Related Words
    syn = w["synonyms"]
    assert 4 <= len(syn) <= 6, f"Expected 4-6 synonyms, got {len(syn)}"
    for s in syn:
        assert "factor" not in s.lower() and "management" not in s.lower()

    rw = w["relatedWords"]
    assert 5 <= len(rw) <= 7, f"Expected 5-7 relatedWords, got {len(rw)}"
    for r in rw:
        assert "factor" not in r.lower() and "management" not in r.lower()

    # Banned phrases check across all text
    dumped = json.dumps(w)
    for bp in banned_phrases:
        if bp in ["factor", "standard practice", "procedure", "management"]:
            # Check synonyms and related words specifically
            for s in syn:
                assert s != bp and bp not in s, f"Found banned phrase '{bp}' in synonyms: {s}"
            for r in rw:
                assert r != bp and bp not in r, f"Found banned phrase '{bp}' in relatedWords: {r}"
        else:
            assert bp.lower() not in dumped.lower(), f"Found banned boilerplate phrase '{bp}' in {wid}"

print("All strict validations PASSED successfully!")
