import json

with open("scratch/finance_270_272.json", "r", encoding="utf-8") as f:
    words = json.load(f)["result"]["words"]

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
    if '"id": "finance-270"' in line:
        idx = i
        while orig_lines[idx].strip() != "{":
            idx -= 1
        start_idx = idx
    if '"id": "finance-273"' in line:
        idx = i
        while orig_lines[idx].strip() not in ["},", "}"]:
            idx -= 1
        end_idx = idx + 1
        break

assert start_idx is not None, "Could not find start index for finance-270"
assert end_idx is not None, "Could not find end index before finance-273"

print(f"Replacing lines {start_idx+1} to {end_idx} (0-indexed {start_idx}:{end_idx})")
print("First line to replace:", orig_lines[start_idx].strip())
print("Last line to replace:", orig_lines[end_idx-1].strip())
print("Next line after replacement:", orig_lines[end_idx].strip())

new_file_lines = orig_lines[:start_idx] + new_blocks + orig_lines[end_idx:]

with open(target_file, "w", encoding="utf-8") as f:
    f.writelines(new_file_lines)

print("Updated src/data/vocabulary/finance.ts successfully!")
