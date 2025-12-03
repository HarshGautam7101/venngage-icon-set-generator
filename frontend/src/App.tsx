import React from 'react';
import { Sparkles } from 'lucide-react';
import { IconGenerator } from './components/IconGenerator';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <Sparkles size={40} />
          <h1>Icon Set Generator</h1>
        </div>
        <p>Generate 4 consistent style icons from a single prompt</p>
      </header>

      <main className="app-main">
        <IconGenerator />
      </main>

      <footer className="app-footer">
        <p>Powered by Replicate • FLUX Schnell Model</p>
      </footer>
    </div>
  );
}

export default App;