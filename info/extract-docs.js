const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

async function extractAll() {
  // 1. Extract XLSX
  console.log('=== EXTRACTING XLSX ===');
  const wb = XLSX.readFile(path.join(__dirname, 'Estructuracion SGI MA (1).xlsx'));
  const xlsxData = {};
  
  for (const sheetName of wb.SheetNames) {
    const sheet = wb.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: '' });
    xlsxData[sheetName] = jsonData;
    console.log(`\n--- Sheet: ${sheetName} (${jsonData.length} rows) ---`);
    // Print all rows for complete extraction
    jsonData.forEach((row, i) => {
      const cleaned = row.map(c => String(c).trim()).filter(c => c !== '');
      if (cleaned.length > 0) {
        console.log(`  Row ${i}: ${cleaned.join(' | ')}`);
      }
    });
  }
  
  fs.writeFileSync(path.join(__dirname, 'xlsx-extracted.json'), JSON.stringify(xlsxData, null, 2), 'utf8');
  console.log('\nXLSX data saved to xlsx-extracted.json');

  // 2. Extract PDF
  console.log('\n=== EXTRACTING PDF ===');
  const pdfBuffer = fs.readFileSync(path.join(__dirname, 'SGI MA (2).pdf'));
  const pdfData = await pdf(pdfBuffer);
  
  console.log(`PDF Pages: ${pdfData.numpages}`);
  console.log(`PDF Text Length: ${pdfData.text.length} chars`);
  console.log('\n--- PDF FULL TEXT ---');
  console.log(pdfData.text);
  
  fs.writeFileSync(path.join(__dirname, 'pdf-extracted.txt'), pdfData.text, 'utf8');
  console.log('\nPDF text saved to pdf-extracted.txt');
}

extractAll().catch(console.error);
