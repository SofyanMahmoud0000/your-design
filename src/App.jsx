import { useSheetData } from './useSheetData';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Products from './components/Products';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import styles from './App.module.css';

export default function App() {
  const { data, loading, error } = useSheetData();

  if (loading) {
    return (
      <div className={styles.centered}>
        <div className={styles.spinner} />
        <p>جاري التحميل…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.centered}>
        <p className={styles.errorMsg}>تعذّر تحميل البيانات. يرجى المحاولة مجدداً.</p>
        <small style={{ color: '#9b97c3' }}>{error}</small>
      </div>
    );
  }

  const { settings = {}, gallery = [] } = data || {};
  const { logo, whatsapp, phone } = settings;

  return (
    <>
      <Navbar logo={logo} whatsapp={whatsapp} />
      <Hero logo={logo} whatsapp={whatsapp} />
      <Products />
      <Gallery items={gallery} />
      <Contact whatsapp={whatsapp} phone={phone} />
      <Footer logo={logo} whatsapp={whatsapp} />
    </>
  );
}
