const XLSX = require('xlsx');

// Create a new workbook
const wb = XLSX.utils.book_new();

// Create "個人" (Personal) worksheet data with headers
const personalData = [
  ['個人情報', ''],
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
  ['建物名・部屋番号', '']
];

// Create "会社" (Company) worksheet data with headers
const companyData = [
  ['会社情報', ''],
  ['項目', '内容'],
  ['職業', ''],
  ['会社名', ''],
  ['備考', '']
];

// Create personal worksheet from data
const personalWs = XLSX.utils.aoa_to_sheet(personalData);

// Set column widths for personal sheet
personalWs['!cols'] = [
  { wch: 20 },  // Column A
  { wch: 40 }   // Column B
];

// Merge cells for title (A1:B1)
personalWs['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }
];

// Create company worksheet from data
const companyWs = XLSX.utils.aoa_to_sheet(companyData);

// Set column widths for company sheet
companyWs['!cols'] = [
  { wch: 20 },  // Column A
  { wch: 40 }   // Column B
];

// Merge cells for title (A1:B1)
companyWs['!merges'] = [
  { s: { r: 0, c: 0 }, e: { r: 0, c: 1 } }
];

// Add worksheets to workbook
XLSX.utils.book_append_sheet(wb, personalWs, '個人');
XLSX.utils.book_append_sheet(wb, companyWs, '会社');

// Write file to public directory
XLSX.writeFile(wb, 'public/template.xlsx');

console.log('Template file created successfully at public/template.xlsx');
console.log('Created 2 sheets: "個人" (Personal) and "会社" (Company)');
