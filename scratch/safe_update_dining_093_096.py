import json

with open("scratch/dining_093_096.json", "r", encoding="utf-8") as f:
    words = json.load(f)["words"]

KEY_ORDER = [
    "id", "word", "partOfSpeech", "category", "level", "toeicFrequency",
    "pronunciation", "etymology", "deepMeaning", "nativeMindset",
    "examples", "wordFamily", "visual", "video", "toeicContext",
    "synonyms", "antonyms", "relatedWords"
]

def order_keys(obj):
    ordered = {}
    for k in KEY_ORDER:
        if k in obj:
            ordered[k] = obj[k]
    for k, v in obj.items():
        if k not in ordered:
            ordered[k] = v
    return ordered

new_blocks = []
for wobj in words:
    ordered = order_keys(wobj)
    # Format json with 4-space indent
    dumped = json.dumps(ordered, indent=4, ensure_ascii=False)
    # Split into lines and re-indent
    lines = dumped.split("\n")
    # First line is {
    # middle lines indent by 6 spaces (or 4 + 2)
    reformatted_lines = ["  {\n"]
    for l in lines[1:-1]:
        reformatted_lines.append("      " + l[4:] + "\n")
    reformatted_lines.append("  },\n")
    new_blocks.extend(reformatted_lines)

target_file = "src/data/vocabulary/dining.ts"
with open(target_file, "r", encoding="utf-8") as f:
    orig_lines = f.readlines()

# Verify boundaries
assert orig_lines[8324] == "  {\n"
assert '"id": "dining-093"' in orig_lines[8325]
assert orig_lines[8711] == "  },\n"
assert '"id": "dining-097"' in orig_lines[8713]

updated_lines = orig_lines[:8324] + new_blocks + orig_lines[8712:]

with open(target_file, "w", encoding="utf-8") as f:
    f.writelines(updated_lines)

print(f"Replaced lines 8324 to 8712 with {len(new_blocks)} new lines.")
