import json

with open("result.json", "r") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"
for w in words:
    print(w["id"], w["word"], w["partOfSpeech"])
    assert "id" in w
    assert "word" in w
    assert "partOfSpeech" in w
    assert "category" in w
    assert "level" in w
    assert "toeicFrequency" in w
    assert "pronunciation" in w
    assert "etymology" in w
    assert "deepMeaning" in w
    assert "nativeMindset" in w
    assert "examples" in w
    assert "wordFamily" in w
    assert "visual" in w
    assert "toeicContext" in w
    assert "synonyms" in w
    assert "antonyms" in w
    assert "relatedWords" in w

print("All validation checks passed successfully!")
