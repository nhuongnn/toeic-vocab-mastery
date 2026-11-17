import json

with open("scratch/finance_288_290.json", "r", encoding="utf-8") as f:
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
for idx, wobj in enumerate(words):
    ordered = order_keys(wobj)
    dumped = json.dumps(ordered, indent=4, ensure_ascii=False)
    lines = dumped.split("\n")
    reformatted_lines = ["  {\n"]
    for l in lines[1:-1]:
        reformatted_lines.append("      " + l[4:] + "\n")
    if idx < len(words) - 1:
        reformatted_lines.append("  },\n")
    else:
        reformatted_lines.append("  }\n")
    new_blocks.extend(reformatted_lines)

target_file = "src/data/vocabulary/finance.ts"
with open(target_file, "r", encoding="utf-8") as f:
    orig_lines = f.readlines()

start_idx = None
end_idx = None

for i, line in enumerate(orig_lines):
    if '"id": "finance-288"' in line:
        idx = i
        while orig_lines[idx].strip() != "{":
            idx -= 1
        start_idx = idx
        break

for i in range(len(orig_lines) - 1, -1, -1):
    if orig_lines[i].strip() == "];":
        end_idx = i - 1
        while orig_lines[end_idx].strip() not in ["}", "},"]:
            end_idx -= 1
        break

assert start_idx is not None and end_idx is not None
print(f"start_idx: {start_idx} ({repr(orig_lines[start_idx].strip())})")
print(f"line after start_idx: {repr(orig_lines[start_idx+1].strip())}")
print(f"end_idx: {end_idx} ({repr(orig_lines[end_idx].strip())})")
print(f"line after end_idx: {repr(orig_lines[end_idx+1].strip())}")

assert orig_lines[start_idx].strip() == "{"
assert '"id": "finance-288"' in orig_lines[start_idx + 1]
assert orig_lines[end_idx].strip() in ["},", "}"]
assert orig_lines[end_idx + 1].strip() == "];"

updated_lines = orig_lines[:start_idx] + new_blocks + orig_lines[end_idx + 1:]

with open(target_file, "w", encoding="utf-8") as f:
    f.writelines(updated_lines)

print(f"Successfully replaced lines {start_idx} to {end_idx} in {target_file}!")
