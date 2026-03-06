const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');

const pdfPath = path.join(__dirname, 'SGI MA (2).pdf');
const dataBuffer = fs.readFileSync(pdfPath);

pdf(dataBuffer).then(function (data) {
    const outputPath = path.join(__dirname, 'pdf-extracted.txt');
    fs.writeFileSync(outputPath, data.text, 'utf8');
    console.log('Pages:', data.numpages);
    console.log('Text length:', data.text.length);
    console.log('Saved to', outputPath);
}).catch(function (err) {
    console.error('Error:', err.message);
    process.exit(1);
});
