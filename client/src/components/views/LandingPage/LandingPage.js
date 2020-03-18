import React from 'react';
import { FaCode } from 'react-icons/fa';

function LandingPage() {
  return (
    <>
      <div className="app">
        <FaCode style={{ fontSize: '4rem' }} />
        <br />
        <span style={{ fontSize: '1.5rem' }}>Welcome to Philemon's Blog!</span>
      </div>
    </>
  );
}

export default LandingPage;
