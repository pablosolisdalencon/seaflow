---
description: Always use JavaScript (Node.js) for utility/helper scripts instead of Python or other languages
---

# JavaScript Utility Scripts Standard

## Rule
All utility, helper, and one-off scripts created by the agent for data extraction, file processing, transformation, analysis, or any other operational task **MUST** be written in JavaScript (Node.js).

## Rationale
- The project stack is Node.js-based (Express backend, React+Vite frontend)
- Ensures consistency across all tooling
- Avoids requiring Python or other runtime installations
- npm packages are readily available for any task

## Guidelines

1. **Language**: Always use JavaScript (ES Modules or CommonJS as appropriate)
2. **Runtime**: Node.js (use the version available in the system)
3. **Location**: Store utility scripts in `/tmp/` for one-off tasks, or in `.agent/scripts/` for reusable utilities
4. **Dependencies**: Install via `npm install` in a temp directory or use built-in Node.js modules when possible
5. **Common packages**:
   - `xlsx` or `exceljs` for Excel file processing
   - `pdf-parse` for PDF text extraction
   - `fs`, `path`, `crypto` for filesystem and utility operations
   - `cheerio` for HTML parsing

## Example

```javascript
// /tmp/extract-data.js
const fs = require('fs');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('path/to/file.xlsx');
// ... process data
fs.writeFileSync('/tmp/output.json', JSON.stringify(data, null, 2));
```

// turbo-all
