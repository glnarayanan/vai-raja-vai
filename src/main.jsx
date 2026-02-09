import React from 'react';
import ReactDOM from 'react-dom/client';
import { MotionConfig } from 'framer-motion';
import App from './App.jsx';
import './index.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF6F1', color: '#2C2418', fontFamily: 'system-ui' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#D97706' }}>Something went wrong</h1>
            <p style={{ color: '#6B5D4D', marginBottom: '2rem' }}>The game encountered an error.</p>
            <button
              onClick={() => {
                localStorage.removeItem('vai-raja-vai-save-v3');
                localStorage.removeItem('vai-raja-vai-manual-save-v3');
                window.location.reload();
              }}
              style={{ padding: '12px 32px', backgroundColor: '#D97706', color: '#FAF6F1', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '14px' }}
            >
              Reset &amp; Restart
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </ErrorBoundary>
  </React.StrictMode>
);
