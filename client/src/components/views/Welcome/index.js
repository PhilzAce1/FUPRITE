import React from 'react';
import logo from '../NavBar/Sections/Logo.png';
import { Link } from 'react-router-dom';
import { ThemeSelectorContext } from '../Theme/theme';
import { Select } from 'antd';
import il from '../Theme/il.png';
const { Option } = Select;

function Welcome(props) {
  const { toggleTheme, themeName } = React.useContext(ThemeSelectorContext);
  const [theme, setTheme] = React.useState('dark');
  return (
    <div className="welcome_container">
      <nav>
        <div id="logo" style={{ fontSize: 'large' }}>
          <img src={logo} className="image" />
          <span
            className="logo_text"
            style={{
              marginLeft: '-10px',
            }}
          >
            {' '}
            FUPREPEEPs
          </span>
        </div>
        <div id="btn-section">
          <Select
            name="Theme Selector"
            style={{ width: '100px' }}
            onChange={(e) => {
              toggleTheme(e);
            }}
          >
            <Option value="dark">Dark Theme</Option>
            <Option value="light">Light Theme</Option>
            <Option value="twitterDim">Twitter Dim Theme</Option>
            <Option value="twitterLightOut">Twitter LightOut Theme</Option>
          </Select>

          <Link to="/register">
            <button className="welcome_register">Register</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </nav>
      <main>
        <div className="welcome">
          <div className="welcome_header">
            Welcome To <br />
            FUPREpeeps
          </div>
          <div className="welcome_body">
            Get Legit and Pass authenticated Information with ease and
            assurance. Create your Blogs and articles and connect With Other
            Fuprites
          </div>
          <Link to="/register">
            <button>Get Started</button>
          </Link>
        </div>
        <div className="illustration">
          <img
            src={il}
            style={{
              maxHeight: '70vh',
              maxWidth: '70vw',
              marginRight: '10vw',
            }}
          />
        </div>
      </main>
    </div>
  );
}
export default Welcome;
