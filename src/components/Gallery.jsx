import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Gallery.module.css';

const AUTOPLAY_MS = 5000;

export default function Gallery({ items = [] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    clearInterval(timerRef.current);
    if (items.length > 1) {
      timerRef.current = setInterval(
        () => setCurrent(i => (i + 1) % items.length),
        AUTOPLAY_MS
      );
    }
  }, [items.length]);

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current); }, [startTimer]);

  const go = useCallback((idx) => {
    setCurrent((idx + items.length) % items.length);
    startTimer();
  }, [items.length, startTimer]);

  const prev = useCallback(() => go(current - 1), [go, current]);
  const next = useCallback(() => go(current + 1), [go, current]);

  useEffect(() => {
    const onKey = (e) => {
      if (lightbox !== null) {
        if (e.key === 'Escape') setLightbox(null);
        if (e.key === 'ArrowLeft')  setLightbox(i => (i - 1 + items.length) % items.length);
        if (e.key === 'ArrowRight') setLightbox(i => (i + 1) % items.length);
      } else {
        if (e.key === 'ArrowLeft')  prev();
        if (e.key === 'ArrowRight') next();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, items.length, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  if (!items.length) return null;

  const item = items[current];

  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>معرض الأعمال</span>
        <h2 className={styles.title}>أعمالنا تتحدث عنا</h2>
        <p className={styles.sub}>لقطات حقيقية من منتجات سلّمناها لعملائنا.</p>
      </div>

      {/* ── Slider ── */}
      <div className={styles.sliderWrap}>
        {/* Single image — key forces remount → triggers fade animation */}
        <div className={styles.imgBox}>
          <img
            key={current}
            src={item.url}
            alt={item.label}
            className={styles.slideImg}
            onClick={() => setLightbox(current)}
            draggable={false}
          />
        </div>

        {/* Label + expand */}
        <div className={styles.labelBar}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.expandHint} onClick={() => setLightbox(current)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
              <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
            </svg>
            عرض كامل
          </span>
        </div>

        {/* Progress bar */}
        <div className={styles.progressBar}>
          <div key={current} className={styles.progressFill} style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
        </div>

        {/* Arrows */}
        {items.length > 1 && (
          <>
            <button className={`${styles.arrow} ${styles.arrowPrev}`} onClick={prev} aria-label="السابق">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
            <button className={`${styles.arrow} ${styles.arrowNext}`} onClick={next} aria-label="التالي">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"/>
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Dots + counter */}
      {items.length > 1 && (
        <div className={styles.dotsRow}>
          <span className={styles.counter}>{current + 1} / {items.length}</span>
          <div className={styles.dots}>
            {items.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                onClick={() => go(i)}
                aria-label={`الصورة ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className={styles.lightbox} onClick={() => setLightbox(null)}>
          <div className={styles.lightboxInner} onClick={e => e.stopPropagation()}>
            <div className={styles.lightboxHeader}>
              <span className={styles.lbCounter}>{lightbox + 1} / {items.length}</span>
              <span className={styles.lbLabel}>{items[lightbox].label}</span>
              <button className={styles.closeBtn} onClick={() => setLightbox(null)}>✕</button>
            </div>
            <div className={styles.imageWrap}>
              <img
                key={lightbox}
                src={items[lightbox].url}
                alt={items[lightbox].label}
                className={styles.lightboxImg}
              />
            </div>
            {items.length > 1 && (
              <>
                <button className={`${styles.lbNav} ${styles.lbPrev}`} onClick={() => setLightbox(i => (i - 1 + items.length) % items.length)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
                <button className={`${styles.lbNav} ${styles.lbNext}`} onClick={() => setLightbox(i => (i + 1) % items.length)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
