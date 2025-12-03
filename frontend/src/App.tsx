import React from 'react';
import { Sparkles, AlertCircle } from 'lucide-react';
import { IconGenerator } from './components/IconGenerator';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <Sparkles size={40} />
          <h1>Intelligent Icon Design</h1>
        </div>
        <p>Generate cohesive icon sets with consistent styling and branding</p>
      </header>

      {/* Information banner for reviewers */}
      <div className="info-banner">
        <div className="info-banner-content">
          <AlertCircle size={20} />
          <div className="info-banner-text">
            <p><strong>Note for Reviewers:</strong> The backend server may sleep after inactivity. The first request after idle can take up to ~50 seconds to warm up. If the first request times out or returns an error, please wait a moment and retry. Image generation may also take time due to this. For any assistance, contact me: <a href="mailto:harshgautam06@gmail.com">harshgautam06@gmail.com</a></p>
          </div>
        </div>
      </div>

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