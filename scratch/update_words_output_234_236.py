import json

with open("scratch/finance_234_236.json", "r", encoding="utf-8") as f:
    words = json.load(f)["result"]["words"]

with open("words_output.json", "w", encoding="utf-8") as f:
    json.dump(words, f, indent=2, ensure_ascii=False)

print("Updated words_output.json successfully!")
