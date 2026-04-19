import sys
import re

with open('src/utils/languages.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Fix backslashes
content = content.replace("\\'", "'")

# Fix missing comma
content = re.sub(r"color:\s*'([^']+)'\s+icon:", r"color: '\1', icon:", content)

with open('src/utils/languages.js', 'w', encoding='utf-8') as f:
    f.write(content)
