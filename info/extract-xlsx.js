const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'Estructuracion SGI MA (1).xlsx');
const wb = XLSX.readFile(filePath);
const result = {};

for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    result[sheetName] = jsonData;
}

const outputPath = path.join(__dirname, 'xlsx-extracted.json');
fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
console.log('Sheets:', wb.SheetNames);
console.log('Saved to', outputPath);
