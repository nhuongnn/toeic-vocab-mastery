import json

with open("src/data/vocabulary/dining.ts") as f:
    text = f.read()

with open("scratch/words_batch_dining_085_088.json") as f:
    words_data = json.load(f)

pos_85 = text.find('"id": "dining-085"')
pos_89 = text.find('"id": "dining-089"')
brace_85 = text.rfind('{', 0, pos_85)
brace_89 = text.rfind('{', 0, pos_89)

new_segment = ',\n  '.join(json.dumps(w, indent=4) for w in words_data) + ',\n  '
new_text = text[:brace_85] + new_segment + text[brace_89:]

with open("src/data/vocabulary/dining.ts", "w") as f:
    f.write(new_text)

print("Successfully updated src/data/vocabulary/dining.ts")
