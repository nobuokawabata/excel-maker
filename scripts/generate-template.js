const XLSX = require('xlsx');

// Create a new workbook
const wb = XLSX.utils.book_new();

// Create worksheet data with headers
const wsData = [
  ['個人プロフィール情報', ''],
  ['項目', '内容'],
  ['姓', ''],
  ['名', ''],
  ['姓（カナ）', ''],
  ['名（カナ）', ''],
  ['性別', ''],
  ['生年月日', ''],
  ['メールアドレス', ''],
  ['電話番号', ''],
  ['郵便番号', ''],
  ['都道府県', ''],
  ['市区町村', ''],
  ['番地', ''],
  ['建物名・部屋番号', ''],
  ['職業', ''],
  ['会社名', ''],
  ['備考', '']
];

// Create worksheet from data
const ws = XLSX.utils.aoa_to_sheet(wsData);

// Set column widths
ws['!cols'] = [
  { wch: 20 },  // Column A
  { wch: 40 }   // Column B
];

// Merge cells for title (A1:B1)
ws['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }
];

// Apply styles (note: XLSX library has limited styling support in free version)
// For better styling, consider using xlsx-style or exceljs libraries

// Add worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, 'プロフィール');

// Write file to public directory
XLSX.writeFile(wb, 'public/template.xlsx');

console.log('Template file created successfully at public/template.xlsx');
