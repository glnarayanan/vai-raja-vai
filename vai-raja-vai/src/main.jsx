import React from 'react';
import ReactDOM from 'react-dom/client';
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
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F0D2E', color: 'white', fontFamily: 'system-ui' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#F59E0B' }}>Something went wrong</h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>The game encountered an error.</p>
            <button
              onClick={() => {
                localStorage.removeItem('vai-raja-vai-save');
                localStorage.removeItem('vai-raja-vai-manual-save');
                window.location.reload();
              }}
              style={{ padding: '12px 32px', backgroundColor: '#F59E0B', color: '#0F0D2E', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
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
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
