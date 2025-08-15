import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Loader from './components/Loader/Loader';
import Clubs from './components/Clubs';
import Home from './components/Home';
import Mentors from './components/Mentors';
import OfficeBearer from './components/OfficeBearer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading (replace with actual data fetching if needed)
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="App h-screen">
      <Header />
      <main>
        <Home />
        <Clubs />
        <Mentors />
        <OfficeBearer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
