import { BookingProvider } from '@/context/BookingContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Attractions from '@/components/Attractions';
import EventDetails from '@/components/EventDetails';
import Tickets from '@/components/Tickets';
import Registration from '@/components/Registration';
import FAQ from '@/components/FAQ';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

import { useEffect } from 'react';

function App() {
  // Strip any URL hash on first load so the browser never auto-scrolls
  // to a section (e.g. #register) that was left in the address bar.
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <BookingProvider>
      <div className="relative min-h-screen text-ivory" style={{ backgroundColor: '#120727' }}>
        <Navbar />
        <main>
          <Hero />
          <About />
          <Attractions />
          <EventDetails />
          <Tickets />
          <Registration />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </BookingProvider>
  );
}

export default App;
