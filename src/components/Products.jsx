import styles from './Products.module.css';

const products = [
  { icon: '☕', title: 'أكواب مطبوعة', desc: 'طباعة احترافية بألوان زاهية تدوم طويلاً على الأكواب.' },
  { icon: '👕', title: 'قمصان مطبوعة', desc: 'اطبع صورتك أو تصميمك على قميص بجودة عالية.' },
  { icon: '📓', title: 'أغلفة كتب', desc: 'غلاف كتاب أو دفتر بتصميمك الخاص.' },
  { icon: '🔑', title: 'حلقات مفاتيح', desc: 'ذكريات صغيرة معك في كل مكان على شكل كيتشين.' },
  { icon: '🧩', title: 'ألعاب بازل', desc: 'بازل مطبوع بصورتك المفضلة — هدية مميزة للجميع.' },
];

export default function Products() {
  return (
    <section id="products" className={styles.section}>
      <div className={styles.header}>
        <span className={styles.badge}>منتجاتنا</span>
        <h2 className={styles.title}>ماذا نطبع لك؟</h2>
        <p className={styles.sub}>كل ما تحتاجه لتحويل ذكرياتك وأفكارك إلى منتجات حقيقية.</p>
      </div>
      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p.title} className={styles.card}>
            <span className={styles.icon}>{p.icon}</span>
            <h3 className={styles.cardTitle}>{p.title}</h3>
            <p className={styles.cardDesc}>{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
