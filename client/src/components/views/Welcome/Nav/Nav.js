import React, { useContext, useState } from 'react';
import { Select } from 'antd';
import { ThemeSelectorContext } from '../../Theme/theme';
import logo from '../../NavBar/Sections/Logo.png';
import { Link } from 'react-router-dom';
const { Option } = Select;

export default function Nav() {
  const { toggleTheme, themeName } = React.useContext(ThemeSelectorContext);
  const [theme, setTheme] = React.useState('dark');
  return (
    <nav
      style={{
        background: 'transparent',
      }}
    >
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
        {/* <Select
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
        </Select> */}

        <Link to="/register">
          <button className="welcome_register">Register</button>
        </Link>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </nav>
  );
}
