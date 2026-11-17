import json

with open("scratch/dining_179_181.json", "r", encoding="utf-8") as f:
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
start_idx = 18711  # 0-indexed for line 18712
end_idx = 19008    # 0-indexed slice end (line 19008 inclusive)

assert orig_lines[start_idx] == "  {\n", f"Expected '  {{\\n' at {start_idx}, got {repr(orig_lines[start_idx])}"
assert '"id": "dining-179"' in orig_lines[start_idx + 1]
assert orig_lines[end_idx - 1] == "  },\n", f"Expected '  }},\\n' at {end_idx - 1}, got {repr(orig_lines[end_idx - 1])}"
assert '"id": "dining-182"' in orig_lines[end_idx + 1]

updated_lines = orig_lines[:start_idx] + new_blocks + orig_lines[end_idx:]

with open(target_file, "w", encoding="utf-8") as f:
    f.writelines(updated_lines)

print(f"Successfully updated {target_file}: replaced lines {start_idx+1} to {end_idx} with {len(new_blocks)} new lines.")
