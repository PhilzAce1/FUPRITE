import React from 'react';
import img from './404.png';
import { Link } from 'react-router-dom';
function ErrorPage(props) {
  return (
    <div
      style={{
        // position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="welcome_container errorpg"
    >
      <img className="errorimg" src={img} />
      <div
        style={{
          color: 'var(--bodyfontcolor)',
          fontSize: '1rem',
          margin: '10px',
        }}
      >
        Looks Like You Lost Your way
      </div>
      <button>
        <Link to="/">Go Back To Home Page</Link>
      </button>
    </div>
  );
}
export default ErrorPage;
