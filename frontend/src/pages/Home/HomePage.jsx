import React from 'react';
import HeroSection from './components/HeroSection';
import ValueProposition from './components/ValueProposition';
import SocialProof from './components/SocialProof';
import FooterSection from './components/FooterSection';
import Header from '../../components/layout/Header';
import './HomePage.css';

const HomePage = () => {
  // Mock user data for demonstration
  const user = null; // No user logged in on home page

  const handleLogout = () => {
    // Handle logout logic
    console.log('Logout clicked');
  };

  return (
    <div className="home-page">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="home-page__main">
        <HeroSection />
        <ValueProposition />
        <SocialProof />
      </main>
      
      <FooterSection />
    </div>
  );
};

export default HomePage;

