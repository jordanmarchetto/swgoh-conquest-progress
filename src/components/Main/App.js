/**
 * App.js
 * main handler for the app, loads the major components
 */
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProgressTracker from './ProgressTracker/ProgressTracker';
import React from 'react';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ProgressTracker />
      </main>
      <Footer />
    </div>
  );
}

export default App;
