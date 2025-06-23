import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateReadme } from '../services/api';

const Home: React.FC = () => {
  const [repoUrl, setRepoUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [urlError, setUrlError] = useState<string>('');
  const navigate = useNavigate();

  const validateGitHubUrl = (url: string): boolean => {
    if (!url.trim()) return false;
    
    try {
      const urlObj = new URL(url);
      
      if (urlObj.hostname !== 'github.com' && urlObj.hostname !== 'www.github.com') {
        return false;
      }
      
      const pathParts = urlObj.pathname.split('/').filter(part => part.length > 0);
      
      if (pathParts.length < 2) {
        return false;
      }
      
      const [username, repository] = pathParts;
      const validPattern = /^[a-zA-Z0-9._-]+$/;
      
      return validPattern.test(username) && validPattern.test(repository);
    } catch (error) {
      return false;
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setRepoUrl(url);
    
    if (urlError) {
      setUrlError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateGitHubUrl(repoUrl)) {
      setUrlError('Please enter a valid GitHub repository URL (e.g., https://github.com/username/repository)');
      return;
    }
    
    setLoading(true);
    setUrlError('');
    
    try {
      const res = await generateReadme(repoUrl);
      navigate('/editor', { state: { readme: res.readme } });
    } catch (error) {
      console.error('Failed to generate README:', error);
      alert('Failed to generate README. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh)',
    //   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      background: 'linear-gradient(135deg,rgb(16, 18, 25) 0%,rgb(29, 4, 55) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    //   marginTop: '5rem'
    }}>
      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        textAlign: 'center' as const,
        border: '1px solid rgba(255, 255, 255, 0.2)',
        marginTop: '3rem'
      }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg,rgb(16, 18, 25) 0%,rgb(29, 4, 55) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: '0 0 1rem 0',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
          }}>
            Generate Beautiful READMEs
          </h1>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#4a5568',
            lineHeight: '1.6',
            margin: '0 0 0.5rem 0',
            fontWeight: '400'
          }}>
            Create comprehensive README.md files for any public GitHub repository
          </p>
          
          <p style={{
            fontSize: '1rem',
            color: '#718096',
            lineHeight: '1.5',
            margin: '0',
            fontStyle: 'italic'
          }}>
            Just paste your repository URL and let AI do the magic ✨
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          alignItems: 'center'
        }}>
          <div style={{ width: '100%', position: 'relative' }}>
            <input
              type="url"
              placeholder="https://github.com/username/repository"
              value={repoUrl}
              onChange={handleUrlChange}
              required
              style={{
                width: '100%',
                padding: '1rem 1.5rem',
                fontSize: '1rem',
                border: `2px solid ${urlError ? '#e53e3e' : '#e2e8f0'}`,
                borderRadius: '12px',
                outline: 'none',
                backgroundColor: '#ffffff',
                transition: 'all 0.3s ease',
                boxSizing: 'border-box',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
              }}
              onFocus={(e) => {
                if (!urlError) {
                  e.target.style.borderColor = '#667eea';
                  e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                }
              }}
              onBlur={(e) => {
                if (!urlError) {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.boxShadow = 'none';
                }
              }}
            />
            
            {urlError && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                right: '0',
                marginTop: '0.5rem',
                padding: '0.5rem',
                backgroundColor: '#fed7d7',
                border: '1px solid #feb2b2',
                borderRadius: '8px',
                color: '#c53030',
                fontSize: '0.875rem',
                textAlign: 'left',
                zIndex: 10
              }}>
                {urlError}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading 
                ? 'linear-gradient(135deg, #a0aec0, #718096)' 
                : 'linear-gradient(135deg,rgb(16, 18, 25) 0%,rgb(29, 4, 55) 100%)',
              color: 'white',
              border: 'none',
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: loading 
                ? 'none' 
                : '0 4px 15px rgba(102, 126, 234, 0.4)',
              transform: loading ? 'none' : 'translateY(0)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              minWidth: '160px',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Generating...
              </span>
            ) : (
              'Generate README'
            )}
          </button>
        </form>

        <div style={{
          marginTop: '2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem',
          fontSize: '0.9rem',
          color: '#718096'
        }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🚀</span>
            <span>Fast Generation</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>🎨</span>
            <span>Beautiful Format</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>✏️</span>
            <span>Fully Editable</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Home;