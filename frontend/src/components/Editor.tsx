import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const Editor: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [readme, setReadme] = useState<string>('');

  useEffect(() => {
    if (!location.state || !location.state.readme) {
      navigate('/');
    } else {
      setReadme(location.state.readme);
    }
  }, [location, navigate]);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg,rgb(16, 18, 25) 0%,rgb(29, 4, 55) 100%)',
      display: 'flex',
      flexDirection: window.innerWidth < 768 ? 'column' : 'row',
      overflow: 'hidden'
    }}>
      <div style={{ 
        width: window.innerWidth < 768 ? '100%' : '50%',
        height: window.innerWidth < 768 ? '50%' : '100%',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '6.5rem',
        borderRight: window.innerWidth >= 768 ? '1px solid #e1e5e9' : 'none',
        borderBottom: window.innerWidth < 768 ? '1px solid #e1e5e9' : 'none'
      }}>
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid #e1e5e9',
          backgroundColor: '#f8f9fa'
        }}>
          <h2 style={{ 
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#2d3748'
          }}>Markdown Editor</h2>
        </div>
        <textarea
          value={readme}
          onChange={(e) => setReadme(e.target.value)}
          style={{
            flex: 1,
            width: '100%',
            padding: '1.5rem',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            border: 'none',
            resize: 'none',
            outline: 'none',
            boxSizing: 'border-box',
            backgroundColor: '#ffffff'
          }}
          placeholder="Start typing your markdown here..."
        />
      </div>

      <div style={{ 
        width: window.innerWidth < 768 ? '100%' : '50%',
        height: window.innerWidth < 768 ? '50%' : '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        marginTop: '6.5rem'
      }}>
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid #e1e5e9',
          backgroundColor: '#f8f9fa'
        }}>
          <h2 style={{ 
            margin: 0,
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#2d3748'
          }}>Live Preview</h2>
        </div>
        <div
          style={{
            flex: 1,
            padding: '1.5rem',
            backgroundColor: '#ffffff',
            overflowY: 'auto',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            lineHeight: '1.7',
            color: '#2d3748'
          }}
        >
          <ReactMarkdown>{readme}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Editor;