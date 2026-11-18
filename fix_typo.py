import json

with open("result.json", "r", encoding="utf-8") as f:
    data = json.load(f)

data["words"][2]["visual"]["imageDescription"] = "A heavy industrial hydraulic molding press in a brightly lit manufacturing facility, showing steel tie bars, safety guarding, and a digital control touchscreen."

with open("result.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("Fixed typo successfully.")
