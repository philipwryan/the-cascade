"""
Upgrade scenario txt file content to proper markdown formatting.
- ALL CAPS titles → # H1 headings
- ALL CAPS section headers → ## H2 headings
- --- SECTION --- patterns → ## headings
- Separator lines (===, ---) → HR
- Key: Value pairs → **Key:** Value bold labels
- Pipe tables already have separators → unchanged (GFM-compatible)
"""
import json
import re

SCENARIO_PATH = '/Users/pwrhome/Claude Code Working/the-cascade/scenario/cascade.scenario.json'


def upgrade_to_markdown(content: str) -> str:
    lines = content.split('\n')
    result = []

    for i, line in enumerate(lines):
        stripped = line.strip()

        # Skip empty lines
        if not stripped:
            result.append(line)
            continue

        # Skip table rows (contain pipe characters)
        if '|' in stripped and stripped.count('|') >= 2:
            result.append(line)
            continue

        # Skip table separator rows (only dashes, pipes, spaces)
        if re.match(r'^[\|\-\s]+$', stripped) and '-' in stripped:
            result.append(line)
            continue

        # Unicode/ASCII border lines → HR
        if re.match(r'^[━─═\-=\*]{6,}\s*$', stripped):
            result.append('')
            result.append('---')
            result.append('')
            continue

        # --- SECTION LABEL --- pattern → ## heading
        m = re.match(r'^-{2,}\s+([A-Z][A-Z0-9\s\-\/\(\)&]+)\s+-{2,}$', stripped)
        if m:
            result.append(f'\n## {m.group(1).strip()}\n')
            continue

        # First line of document: ALL CAPS title → # H1
        if (i == 0 and stripped and len(stripped) > 5 and
                stripped == stripped.upper() and
                not stripped.startswith('#') and
                re.search(r'[A-Z]{3}', stripped)):
            result.append(f'# {stripped}')
            continue

        # ALL CAPS short section header lines → ## H2
        # Must be mostly uppercase letters, not too long, not a table
        is_allcaps_header = (
            stripped == stripped.upper() and
            6 <= len(stripped) <= 80 and
            not stripped.startswith('#') and
            not re.match(r'^[\-=\*\s]+$', stripped) and
            re.search(r'[A-Z]{3}', stripped) and
            stripped.count(' ') <= 10  # not a long sentence
        )
        if is_allcaps_header:
            # Add spacing if previous line wasn't blank
            if result and result[-1].strip():
                result.append('')
            result.append(f'## {stripped}')
            result.append('')
            continue

        # "NOTE:" / "ALERT:" / "RECOMMENDATION:" prefix lines → blockquote-style bold
        m2 = re.match(r'^(NOTE|ALERT|WARNING|RECOMMENDATION|CRITICAL|ACTION REQUIRED|FINDING|CONCLUSION):\s*(.*)$', stripped, re.IGNORECASE)
        if m2:
            label, rest = m2.groups()
            result.append(f'> **{label.upper()}:** {rest}')
            continue

        # Key: Value pairs with capitalized keys (not in tables)
        # Pattern: "Capitalized Words: rest of value"
        m3 = re.match(r'^(\s*)([A-Z][A-Za-z\s\/\(\)\-]{2,30}):\s+(.{3,})$', line)
        if m3 and not stripped.startswith('http') and not stripped.startswith('-'):
            indent, key, val = m3.groups()
            result.append(f'{indent}**{key.strip()}:** {val}')
            continue

        result.append(line)

    return '\n'.join(result)


with open(SCENARIO_PATH) as f:
    data = json.load(f)

count = 0
for persona, pdata in data['personas'].items():
    for file_def in pdata['files']:
        if file_def['type'] == 'txt':
            file_def['content'] = upgrade_to_markdown(file_def['content'])
            count += 1
            print(f"  Upgraded: [{persona}] {file_def['id']}")

with open(SCENARIO_PATH, 'w') as f:
    json.dump(data, f, indent=2, default=str)

print(f"\n✅ Upgraded {count} txt files in scenario")
