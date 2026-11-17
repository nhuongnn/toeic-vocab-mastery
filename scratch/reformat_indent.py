import re

target_file = "src/data/vocabulary/communications.ts"

with open(target_file, "r", encoding="utf-8") as f:
    content = f.read()

# Replace any "    {\n      \"id\": \"comms-279\"" with "  {\n      \"id\": \"comms-279\""
content = re.sub(r'^[ ]{4}\{([ \t]*\n[ ]{6}"id": "comms-(?:279|280|281)")', r'  {\1', content, flags=re.MULTILINE)
content = re.sub(r'^[ ]{4}\}([,]?)$', r'  }\1', content, flags=re.MULTILINE)

with open(target_file, "w", encoding="utf-8") as f:
    f.write(content)

print("Reformatted!")
