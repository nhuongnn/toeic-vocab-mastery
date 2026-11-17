import json
import re

with open("scratch/finance_188_190.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
print(f"Total words: {len(words)}")
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

FORBIDDEN_PATTERNS = [
    r"\bfactor\b",
    r"manage the\.\.\.",
    r"documentation for\.\.\.",
    r"is ready for the board meeting",
    r"A foundational professional concept",
    r"Financial Integrity Secures Corporate Capital Growth",
    r"hold\.\.\.",
    r"core Germanic commercial root",
    r"entering into a state",
    r"reconciled the ledger entries concerning"
]

REQUIRED_KEYS = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

for w in words:
    wid = w["id"]
    word = w["word"]
    print(f"Checking {wid}: {word}")
    
    # Check all required top-level keys
    for k in REQUIRED_KEYS:
        assert k in w, f"Missing key {k} in {wid}"
    
    # Check forbidden strings
    dumped = json.dumps(w)
    for pat in FORBIDDEN_PATTERNS:
        matches = re.findall(pat, dumped, re.IGNORECASE)
        if matches:
            raise ValueError(f"Found forbidden pattern '{pat}' in {wid}: {matches}")
            
    # Check examples counts
    daily = w["examples"]["daily"]
    business = w["examples"]["business"]
    conversation = w["examples"]["conversation"]
    collocations = w["examples"]["collocations"]
    synonyms = w["synonyms"]
    antonyms = w["antonyms"]
    related = w["relatedWords"]
    
    assert len(daily) == 3, f"daily count is {len(daily)} in {wid}"
    assert len(business) == 3, f"business count is {len(business)} in {wid}"
    assert 2 <= len(conversation) <= 3, f"conversation count is {len(conversation)} in {wid}"
    assert 5 <= len(collocations) <= 6, f"collocations count is {len(collocations)} in {wid}"
    assert 4 <= len(synonyms) <= 6, f"synonyms count is {len(synonyms)} in {wid}"
    assert len(antonyms) >= 1, f"antonyms count is {len(antonyms)} in {wid}"
    assert 5 <= len(related) <= 7, f"relatedWords count is {len(related)} in {wid}"
    
    # Check deepMeaning
    dm = w["deepMeaning"]
    assert dm["formalityLevel"] in ["formal", "neutral", "informal"]
    assert dm["connotation"] in ["positive", "neutral", "negative"]
    assert len(dm["coreConcept"]) > 30
    assert len(dm["spatialContext"]) > 15
    assert len(dm["temporalContext"]) > 15
    assert len(dm["emotionalTone"]) > 5
    
    # Check nativeMindset
    nm = w["nativeMindset"]
    assert len(nm["howNativesThink"]) > 30
    assert len(nm["mentalImage"]) > 20
    assert len(nm["whenToUse"]) > 20
    assert len(nm["whenNotToUse"]) > 20
    assert len(nm["culturalContext"]) > 20
    
    # Check etymology
    et = w["etymology"]
    assert len(et["origin"]) > 10
    assert len(et["rootWord"]) > 3
    assert len(et["rootMeaning"]) > 5
    assert len(et["evolution"]) > 30
    assert isinstance(et["relatedLanguages"], list) and len(et["relatedLanguages"]) >= 4
    assert len(et["firstRecordedUse"]) > 5
    
    # Check pronunciation
    pr = w["pronunciation"]
    assert pr["ipa"].startswith("/") and pr["ipa"].endswith("/")
    assert len(pr["syllableBreakdown"]) > 0
    assert "●" in pr["stressPattern"] or "○" in pr["stressPattern"]
    assert len(pr["commonMistakes"]) > 30
    
    # Check visual and video
    vis = w["visual"]
    assert len(vis["imageKeyword"]) > 5
    assert len(vis["imageDescription"]) > 20
    assert len(vis["mnemonic"]) > 15
    
    vid = w["video"]
    assert len(vid["description"]) > 20
    
    # Check toeicContext
    tc = w["toeicContext"]
    assert isinstance(tc["commonParts"], list) and len(tc["commonParts"]) > 0
    assert "(A)" in tc["exampleQuestion"] and "(B)" in tc["exampleQuestion"] and "(C)" in tc["exampleQuestion"] and "(D)" in tc["exampleQuestion"]
    assert len(tc["tips"]) > 30

print("ALL STRICT VALIDATIONS PASSED PERFECTLY!")
