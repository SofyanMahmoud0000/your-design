import { useEffect, useState } from 'react';

const SHEET_ID = '1IdoDG839mAglGI_tk5wtXGRfRlWMLHfVVKtOOin8-3Q';
const GID = '1749675838';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

function driveToDirectUrl(rawUrl) {
  if (!rawUrl) return '';
  const m = rawUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (m) return `https://lh3.googleusercontent.com/d/${m[1]}`;
  return rawUrl;
}

function parseWhatsapp(raw) {
  const digits = String(raw).replace(/\D/g, '');
  // Egyptian numbers without country code are 10 digits (e.g. 1152398810)
  return digits.length <= 10 ? `20${digits}` : digits;
}

function parseCsv(text) {
  return text
    .split('\n')
    .map(line => {
      // Handle quoted fields that may contain commas
      const cols = [];
      let cur = '';
      let inQuote = false;
      for (const ch of line) {
        if (ch === '"') { inQuote = !inQuote; }
        else if (ch === ',' && !inQuote) { cols.push(cur.trim()); cur = ''; }
        else { cur += ch; }
      }
      cols.push(cur.trim());
      return cols;
    })
    .filter(r => r[0] || r[1]);
}

export function useSheetData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(CSV_URL)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(csv => {
        const rows = parseCsv(csv);
        const settings = {};
        const gallery = [];

        rows.forEach(([key, value]) => {
          if (!key && !value) return;
          const k = key.toLowerCase().replace(/\s+/g, '_');
          if (k === 'phone_number') {
            settings.phone = value;
          } else if (k === 'whats_app_number') {
            settings.whatsapp = parseWhatsapp(value);
          } else if (k === 'logo') {
            settings.logo = driveToDirectUrl(value);
          } else if (value) {
            gallery.push({ label: key, url: driveToDirectUrl(value) });
          }
        });

        setData({ settings, gallery });
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
