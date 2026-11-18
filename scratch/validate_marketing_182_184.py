import json

with open("scratch/marketing_words_182_184.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
assert len(words) == 3, f"Expected 3 words, got {len(words)}"

required_word_keys = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

for w in words:
    for k in required_word_keys:
        assert k in w, f"Missing key {k} in word {w.get('word')}"

print("ALL MARKETING WORDS SCHEMA CHECKS PASSED PERFECTLY!")
