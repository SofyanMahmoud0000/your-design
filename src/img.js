const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const img = (name) => `${base}/images/${name}`;
