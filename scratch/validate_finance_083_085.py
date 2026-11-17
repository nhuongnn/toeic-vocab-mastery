import json
import re

with open("scratch/finance_083_085.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

banned_patterns = [
    r"\bfactor\b",
    r"manage the\.\.\.",
    r"documentation for\.\.\. is ready",
    r"Secures Operational Excellence",
    r"Secures Corporate Capital Growth",
    r"A foundational professional concept and noun designating",
    r"A corporate financial controller analyzing a detailed quarterly balance sheet",
    r"The accounting team reconciled the ledger entries concerning",
    r"The finance committee approved the fiscal allocation for",
    r"The internal audit team reconciled the financial _____"
]

for w in words:
    print(f"Validating word: {w['id']} - {w['word']}")
    
    # Basic fields
    assert w['id'] in ["finance-083", "finance-084", "finance-085"]
    assert isinstance(w['word'], str) and len(w['word']) > 0
    assert isinstance(w['partOfSpeech'], list) and len(w['partOfSpeech']) > 0
    assert w['category'] == "finance"
    assert w['level'] in ["essential", "intermediate", "advanced"]
    assert isinstance(w['toeicFrequency'], int) and 1 <= w['toeicFrequency'] <= 10
    
    # Pronunciation
    p = w['pronunciation']
    assert p['ipa'].startswith("/") and p['ipa'].endswith("/")
    assert "·" in p['syllableBreakdown'] or len(p['syllableBreakdown'].split()) == 1
    assert len(p['stressPattern']) > 0
    assert len(p['commonMistakes']) > 20
    
    # Etymology
    e = w['etymology']
    assert len(e['origin']) > 10
    assert len(e['rootWord']) > 0
    assert len(e['rootMeaning']) > 5
    assert len(e['evolution']) > 20
    assert isinstance(e['relatedLanguages'], list) and len(e['relatedLanguages']) >= 3
    assert len(e['firstRecordedUse']) > 5
    
    # Deep Meaning
    dm = w['deepMeaning']
    assert len(dm['coreConcept']) > 20
    assert len(dm['spatialContext']) > 15
    assert len(dm['temporalContext']) > 15
    assert len(dm['emotionalTone']) > 5
    assert dm['formalityLevel'] in ["formal", "neutral", "informal"]
    assert dm['connotation'] in ["positive", "neutral", "negative"]
    
    # Native Mindset
    nm = w['nativeMindset']
    assert len(nm['howNativesThink']) > 20
    assert len(nm['mentalImage']) > 20
    assert len(nm['whenToUse']) > 15
    assert len(nm['whenNotToUse']) > 15
    assert len(nm['culturalContext']) > 20
    
    # Examples
    ex = w['examples']
    assert len(ex['daily']) == 3, f"daily count: {len(ex['daily'])}"
    assert len(ex['business']) == 3, f"business count: {len(ex['business'])}"
    assert 2 <= len(ex['conversation']) <= 3, f"conversation count: {len(ex['conversation'])}"
    assert 5 <= len(ex['collocations']) <= 6, f"collocations count: {len(ex['collocations'])}"
    
    # Word Family
    wf = w['wordFamily']
    assert isinstance(wf, dict)
    
    # Visual
    v = w['visual']
    assert len(v['imageKeyword']) > 5
    assert len(v['imageDescription']) > 20
    assert len(v['mnemonic']) > 15
    
    # Video
    vid = w['video']
    assert len(vid['description']) > 15
    
    # TOEIC Context
    tc = w['toeicContext']
    assert isinstance(tc['commonParts'], list) and len(tc['commonParts']) >= 1
    assert all(isinstance(x, int) for x in tc['commonParts'])
    assert "(A)" in tc['exampleQuestion'] and "(B)" in tc['exampleQuestion'] and "(C)" in tc['exampleQuestion'] and "(D)" in tc['exampleQuestion']
    assert len(tc['tips']) > 20
    
    # Synonyms, Antonyms, Related Words
    assert 4 <= len(w['synonyms']) <= 6, f"synonyms count: {len(w['synonyms'])}"
    assert isinstance(w['antonyms'], list)
    assert 5 <= len(w['relatedWords']) <= 7, f"relatedWords count: {len(w['relatedWords'])}"
    
    # Check for banned boilerplate patterns
    dumped = json.dumps(w)
    for bp in banned_patterns:
        match = re.search(bp, dumped, re.IGNORECASE)
        assert not match, f"Found banned pattern '{bp}' in {w['id']}: {match.group(0)}"

print("ALL CHECKS PASSED PERFECTLY!")
