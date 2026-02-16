import React from 'react';

const headerStyles = {
  height: '60px', // Fixed height
  backgroundColor: 'white',
  borderBottom: '1px solid #ddd',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 20px',
  boxSizing: 'border-box',
  zIndex: 10, // Ensure it sits above the canvas
  position: 'relative',
  
};

const titleStyles = {
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#333',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const buttonGroupStyles = {
  display: 'flex',
  gap: '10px'
};

const buttonStyles = {
  padding: '8px 16px',
  borderRadius: '4px',
  border: '1px solid #ddd',
  backgroundColor: 'white',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.2s'
};

export default function Header() {
  return (
    <header style={headerStyles}>
      <div style={titleStyles}>
        {/* You can add an SVG logo here later */}
        <span>🌳 My Family Tree</span>
      </div>

      <div style={buttonGroupStyles}>
        <button style={buttonStyles}>Export Image</button>
        <button 
          style={{ ...buttonStyles, backgroundColor: '#2563eb', color: 'white', border: 'none' }}
        >
          Add Member
        </button>
      </div>
    </header>
  );
}