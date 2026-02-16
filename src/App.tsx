import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { Features } from './components/Features';
import { Deals } from './components/Deals';
import { EarlyAccess } from './components/EarlyAccess';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#060a17', color: '#fff' }}>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <Deals />
      <EarlyAccess />
      <Footer />
    </div>
  );
}
