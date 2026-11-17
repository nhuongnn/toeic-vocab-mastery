import json
import re

with open("scratch/finance_270_272.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["result"]["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

REQUIRED_WORD_KEYS = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

FORBIDDEN_PATTERNS = [
    r"\bfactor\b",
    r"manage the\.\.\.",
    r"documentation for.*is ready",
    r"standard practice",
    r"operational practice",
    r"A foundational professional concept",
    r"Income statement hierarchy",
    r"Secures Operational Excellence",
    r"Secures Corporate Capital Growth",
    r"Meeting participants were instructed",
    r"reconciled the ledger entries concerning",
]

for w in words:
    wid = w["id"]
    print(f"Checking {wid}: {w['word']}")
    
    # Check top keys
    for k in REQUIRED_WORD_KEYS:
        assert k in w, f"Missing key {k} in {wid}"
        
    assert w["level"] in ["essential", "intermediate", "advanced"]
    assert isinstance(w["toeicFrequency"], (int, float))
    assert isinstance(w["partOfSpeech"], list) and len(w["partOfSpeech"]) > 0
    assert w["category"] == "finance"
    
    # Pronunciation
    pron = w["pronunciation"]
    for pk in ["ipa", "syllableBreakdown", "stressPattern", "commonMistakes"]:
        assert pk in pron and pron[pk].strip(), f"Missing pron {pk} in {wid}"
    assert pron["ipa"].startswith("/"), f"IPA does not start with / in {wid}"
    
    # Etymology
    etym = w["etymology"]
    for ek in ["origin", "rootWord", "rootMeaning", "evolution", "relatedLanguages", "firstRecordedUse"]:
        assert ek in etym, f"Missing etymology {ek} in {wid}"
    assert isinstance(etym["relatedLanguages"], list) and len(etym["relatedLanguages"]) >= 3
    
    # Deep meaning
    dm = w["deepMeaning"]
    for dmk in ["coreConcept", "spatialContext", "temporalContext", "emotionalTone", "formalityLevel", "connotation"]:
        assert dmk in dm and dm[dmk].strip(), f"Missing deepMeaning {dmk} in {wid}"
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]
    
    # Native mindset
    nm = w["nativeMindset"]
    for nmk in ["howNativesThink", "mentalImage", "whenToUse", "whenNotToUse", "culturalContext"]:
        assert nmk in nm and nm[nmk].strip(), f"Missing nativeMindset {nmk} in {wid}"
        
    # Examples
    ex = w["examples"]
    assert len(ex["daily"]) >= 3, f"Need >= 3 daily examples in {wid}"
    assert len(ex["business"]) >= 3, f"Need >= 3 business examples in {wid}"
    assert len(ex["conversation"]) >= 2, f"Need >= 2 conversation pairs in {wid}"
    assert len(ex["collocations"]) >= 5, f"Need >= 5 collocations in {wid}"
    
    # Visual
    vis = w["visual"]
    for vk in ["imageKeyword", "imageDescription", "mnemonic"]:
        assert vk in vis and vis[vk].strip(), f"Missing visual {vk} in {wid}"
        
    # Video
    vid = w["video"]
    assert "description" in vid and vid["description"].strip()
    
    # TOEIC context
    tc = w["toeicContext"]
    assert isinstance(tc["commonParts"], list) and len(tc["commonParts"]) > 0
    assert "exampleQuestion" in tc and "(A)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert "tips" in tc and tc["tips"].strip()
    
    # Synonyms / Antonyms / Related words
    assert 4 <= len(w["synonyms"]) <= 8, f"Synonyms count {len(w['synonyms'])} outside expected range in {wid}"
    assert isinstance(w["antonyms"], list)
    assert 5 <= len(w["relatedWords"]) <= 10, f"Related words count {len(w['relatedWords'])} outside range in {wid}"
    
    # Check forbidden boilerplate in synonyms / related words
    for s in w["synonyms"]:
        assert not s.endswith(" factor"), f"Boilerplate synonym '{s}' in {wid}"
        assert not s.endswith(" management"), f"Boilerplate synonym '{s}' in {wid}"
        assert s != "standard practice", f"Boilerplate synonym '{s}' in {wid}"
        assert s != "procedure", f"Boilerplate synonym '{s}' in {wid}"
        
    for r in w["relatedWords"]:
        assert not r.endswith(" management") or w["word"] == "risk management", f"Boilerplate related word '{r}' in {wid}"
        assert r not in ["implementation", "protocol"], f"Boilerplate related word '{r}' in {wid}"
        
    # Check overall content for repetitive bot boilerplate
    content_str = json.dumps(w)
    for pat in FORBIDDEN_PATTERNS:
        match = re.search(pat, content_str, re.IGNORECASE)
        if match:
            raise ValueError(f"Found forbidden boilerplate pattern '{pat}' in {wid}: {match.group(0)}")

print("ALL STRICT CHECKS PASSED PERFECTLY!")
