import json
import re

with open("scratch/dining_121_124.json", "r", encoding="utf-8") as f:
    data = json.load(f)

words = data["words"]
target_file = "src/data/vocabulary/dining.ts"

with open(target_file, "r", encoding="utf-8") as f:
    ts_content = f.read()

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

updated_count = 0
for wobj in words:
    wid = wobj["id"]
    ordered_wobj = order_keys(wobj)
    # Match the block for wid
    pattern = r'\{\s*[\"\']id[\"\']:\s*[\"\']' + re.escape(wid) + r'[\"\'].*?\n  \}(?:,|\s*(?=\n\];))'
    m = re.search(pattern, ts_content, re.DOTALL)
    if m:
        is_last = (m.end() == len(ts_content) or ts_content[m.end():].lstrip().startswith("];"))
        replacement = json.dumps(ordered_wobj, indent=4, ensure_ascii=False)
        lines = replacement.split("\n")
        reformatted = "  {\n"
        for line in lines[1:-1]:
            reformatted += "      " + line[4:] + "\n"
        reformatted += "  }" + ("" if is_last else ",")

        ts_content = ts_content[:m.start()] + reformatted + ts_content[m.end():]
        updated_count += 1
        print(f"Updated {wid}")
    else:
        print(f"Error: Could not find block for {wid}")

if updated_count == len(words):
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(ts_content)
    print(f"Successfully updated all {updated_count} words in {target_file}")
else:
    print(f"Failed to update all words (only {updated_count}/{len(words)})")
