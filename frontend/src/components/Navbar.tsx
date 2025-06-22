import React from 'react';

const navbarStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 1000,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  color: 'white',
  padding: '1rem 2rem',
  textAlign: 'left',
  backdropFilter: 'blur(4px)',
};

const logoStyle: React.CSSProperties = {
  display: 'inline-block',
  marginRight: '0.75rem',
  verticalAlign: 'middle',
  height: '4.5rem',
  width: 'auto',
};

const titleStyle: React.CSSProperties = {
  display: 'inline-block',
  verticalAlign: 'middle',
  margin: 0,
};

const Navbar: React.FC = () => {
  return (
    <nav style={navbarStyle}>
      <img src="/logo192.png" alt="README.ai Logo" style={logoStyle} />
      <h1 style={titleStyle}>README.ai</h1>
    </nav>
  );
};

export default Navbar;