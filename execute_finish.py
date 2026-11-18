import json

with open("vocab_output.json") as f:
    data = json.load(f)

print(json.dumps(data, indent=2)[:500])
