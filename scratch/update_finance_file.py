import json

with open('scratch/finance_111_113.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

entries = data['words']

formatted_entries = []
for entry in entries:
    json_str = json.dumps(entry, indent=2, ensure_ascii=False)
    # indent each line with 2 spaces
    indented = '\n'.join('  ' + line if line.strip() else '' for line in json_str.splitlines())
    formatted_entries.append(indented)

new_block = ',\n'.join(formatted_entries) + ',\n'

with open('src/data/vocabulary/finance.ts', 'r', encoding='utf-8') as f:
    content = f.read()

pos111 = content.find('  {\n      "id": "finance-111",')
pos114 = content.find('  {\n      "id": "finance-114",')

assert pos111 != -1 and pos114 != -1

updated_content = content[:pos111] + new_block + content[pos114:]

with open('src/data/vocabulary/finance.ts', 'w', encoding='utf-8') as f:
    f.write(updated_content)

print("Updated src/data/vocabulary/finance.ts successfully!")
