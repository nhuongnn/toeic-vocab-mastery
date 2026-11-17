import json

with open("scratch/finance_114_116.json", "r", encoding="utf-8") as f:
    data = json.load(f)
words = data["words"]

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

target_file = "src/data/vocabulary/finance.ts"
with open(target_file, "r", encoding="utf-8") as f:
    orig_lines = f.readlines()

start_idx = None
end_idx = None

for i, line in enumerate(orig_lines):
    if '"id": "finance-114"' in line:
        start_idx = i - 1
        while orig_lines[start_idx].strip() != "{":
            start_idx -= 1
    if '"id": "finance-117"' in line:
        end_idx = i - 1
        while orig_lines[end_idx].strip() not in ["},", "}"]:
            end_idx -= 1
        break

assert start_idx is not None and end_idx is not None
assert orig_lines[start_idx].strip() == "{", f"Expected '{{' at {start_idx}, got {repr(orig_lines[start_idx])}"
assert '"id": "finance-114"' in orig_lines[start_idx + 1], f"Expected finance-114 at {start_idx+1}, got {repr(orig_lines[start_idx+1])}"
assert orig_lines[end_idx].strip() in ["},", "}"], f"Expected '}},' at {end_idx}, got {repr(orig_lines[end_idx])}"
assert '"id": "finance-117"' in orig_lines[end_idx + 2], f"Expected finance-117 at {end_idx+2}, got {repr(orig_lines[end_idx+2])}"

updated_lines = orig_lines[:start_idx] + new_blocks + orig_lines[end_idx + 1:]

with open(target_file, "w", encoding="utf-8") as f:
    f.writelines(updated_lines)

print(f"Successfully replaced lines {start_idx} to {end_idx} with {len(new_blocks)} new lines in {target_file}.")
