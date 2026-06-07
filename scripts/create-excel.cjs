// Run with: node scripts/create-excel.cjs
// Generates public/data.xlsx with initial content.
// Edit the file in Excel/LibreOffice afterwards — no need to re-run this script.

const XLSX = require('xlsx');
const path = require('path');

const wb = XLSX.utils.book_new();

// ── Settings sheet ──────────────────────────────────────────────────────────
const settings = [
  { Key: 'company_name', Value: 'Your Design' },
  { Key: 'whatsapp',     Value: '+201152398810' },
];
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(settings), 'Settings');

// ── Gallery sheet ───────────────────────────────────────────────────────────
// image_url: relative path (e.g. images/cup.png) OR a full https:// URL
const gallery = [
  { image_url: 'images/cup.png',        label: 'أكواب مطبوعة'  },
  { image_url: 'images/shirt.png',      label: 'قمصان مطبوعة'  },
  { image_url: 'images/book-covers.png',label: 'أغلفة كتب'     },
  { image_url: 'images/keychain.png',   label: 'حلقات مفاتيح'  },
  { image_url: 'images/puzzle.jpeg',    label: 'ألعاب بازل'    },
];
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(gallery), 'Gallery');

const out = path.join(__dirname, '..', 'public', 'data.xlsx');
XLSX.writeFile(wb, out);
console.log('Created', out);
