import json

with open("scratch/dining_157_160.json", "r", encoding="utf-8") as f:
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
    dumped = json.dumps(ordered, indent=4, ensure_ascii=False)
    lines = dumped.split("\n")
    reformatted_lines = ["  {\n"]
    for l in lines[1:-1]:
        reformatted_lines.append("      " + l[4:] + "\n")
    reformatted_lines.append("  },\n")
    new_blocks.extend(reformatted_lines)

target_file = "src/data/vocabulary/dining.ts"
with open(target_file, "r", encoding="utf-8") as f:
    orig_lines = f.readlines()

# Verify boundaries
assert orig_lines[16186] == "  {\n", f"Expected '  {{\\n' at 16186, got {repr(orig_lines[16186])}"
assert '"id": "dining-157"' in orig_lines[16187], f"Expected dining-157 at 16187, got {repr(orig_lines[16187])}"
assert orig_lines[16581] == "  },\n", f"Expected '  }},\\n' at 16581, got {repr(orig_lines[16581])}"
assert '"id": "dining-161"' in orig_lines[16583], f"Expected dining-161 at 16583, got {repr(orig_lines[16583])}"

updated_lines = orig_lines[:16186] + new_blocks + orig_lines[16582:]

with open(target_file, "w", encoding="utf-8") as f:
    f.writelines(updated_lines)

print(f"Successfully replaced lines 16186 to 16582 with {len(new_blocks)} new lines in {target_file}.")
