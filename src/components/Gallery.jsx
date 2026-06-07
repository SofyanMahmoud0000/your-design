import { useState, useEffect, useCallback } from 'react';
import styles from './Gallery.module.css';

export default function Gallery({ items = [] }) {
  const [lightbox, setLightbox] = useState(null); // index or null

  const close = useCallback(() => setLightbox(null), []);
  const prev = useCallback(() => setLightbox(i => (i - 1 + items.length) % items.length), [items.length]);
  const next = useCallback(() => setLightbox(i => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, close, prev, next]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  if (!items.length) return null;

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>معرض الأعمال</span>
        <h2 className={styles.title}>أعمالنا تتحدث عنا</h2>
        <p className={styles.sub}>لقطات حقيقية من منتجات سلّمناها لعملائنا.</p>
      </div>

      <div className={styles.masonry}>
        {items.map((item, i) => (
          <div key={i} className={styles.item} onClick={() => setLightbox(i)}>
            <img
              src={item.url}
              alt={item.label}
              className={styles.img}
              loading="lazy"
            />
            <div className={styles.overlay}>
              <span className={styles.overlayLabel}>{item.label}</span>
              <span className={styles.overlayIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </span>
            </div>
          </div>
        ))}
      </div>

      {lightbox !== null && (
        <div className={styles.lightbox} onClick={close}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.lightboxHeader}>
              <span className={styles.counter}>{lightbox + 1} / {items.length}</span>
              <span className={styles.lightboxLabel}>{items[lightbox].label}</span>
              <button className={styles.closeBtn} onClick={close} aria-label="إغلاق">✕</button>
            </div>

            {/* Image */}
            <div className={styles.imageWrap}>
              <img
                src={items[lightbox].url}
                alt={items[lightbox].label}
                className={styles.lightboxImg}
              />
            </div>

            {/* Navigation */}
            {items.length > 1 && (
              <>
                <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={prev} aria-label="السابق">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                <button className={`${styles.navBtn} ${styles.navNext}`} onClick={next} aria-label="التالي">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </>
            )}

            {/* Dot indicators */}
            {items.length > 1 && (
              <div className={styles.dots}>
                {items.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === lightbox ? styles.dotActive : ''}`}
                    onClick={() => setLightbox(i)}
                    aria-label={`الصورة ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
