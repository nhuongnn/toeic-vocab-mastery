import json
import jsonschema

with open('scripts/process_words.py') as f:
    code = f.read()

schema_str = code[code.find('SCHEMA ='):code.find('BASE_PROMPT =')].strip()
ldict = {}
exec(schema_str, globals(), ldict)
schema = ldict['SCHEMA']

with open("scratch/comms_279_281.json", "r", encoding="utf-8") as f:
    data = json.load(f)

jsonschema.validate(instance=data, schema=schema)
print("SUCCESS: JSON schema validation passed perfectly!")
