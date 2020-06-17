import React from 'react';
import Home from './Home/Home';
import './welcome.css';
import Feature from './Features/Features';
function Welcome(props) {
  return (
    <div className="welcome_container">
      <div className="welcome_page_container">
        <Home />
        <Feature />
      </div>
    </div>
  );
}
export default Welcome;
