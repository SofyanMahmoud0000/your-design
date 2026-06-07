import { useState } from 'react';
import styles from './Gallery.module.css';

const items = [
  { src: '/images/cup.png', label: 'أكواب مطبوعة', category: 'cup' },
  { src: '/images/shirt.png', label: 'قمصان مطبوعة', category: 'shirt' },
  { src: '/images/book-covers.png', label: 'أغلفة كتب', category: 'book' },
  { src: '/images/keychain.png', label: 'حلقات مفاتيح', category: 'keychain' },
  { src: '/images/puzzle.jpeg', label: 'ألعاب بازل', category: 'puzzle' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>معرض الأعمال</span>
        <h2 className={styles.title}>أعمالنا تتحدث عنا</h2>
        <p className={styles.sub}>لقطات حقيقية من منتجات سلّمناها لعملائنا.</p>
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <div
            key={i}
            className={styles.card}
            onClick={() => setLightbox(item)}
          >
            <img src={item.src} alt={item.label} className={styles.img} />
            <div className={styles.overlay}>
              <span className={styles.overlayLabel}>{item.label}</span>
              <span className={styles.overlayIcon}>🔍</span>
            </div>
          </div>
        ))}
      </div>

      {lightbox && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <button className={styles.close} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.src} alt={lightbox.label} className={styles.lightboxImg} />
            <p className={styles.lightboxLabel}>{lightbox.label}</p>
          </div>
        </div>
      )}
    </section>
  );
}
