import React, { useState } from 'react';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { USER_SERVER } from '../../Config';
import axios from 'axios';
import './Sections/Navbar.css';
import '../NavBar/Sections/testNav.css';
import {
  UserOutlined,
  BellOutlined,
  MessageOutlined,
  HomeOutlined,
  MoreOutlined,
  TeamOutlined,
  LogoutOutlined,
  EditOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

import Logo from './Sections/Logo.png';
function NavBar(props) {
  const [visible, setVisible] = useState(false);
  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        // props.history.push('/');
        localStorage.clear();
        window.location.reload();
      } else {
        alert('Log Out Failed');
      }
    });
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  console.log(localStorage.getItem('userId'));
  if (!user) {
    return (
      <nav className="menu" style={{ zIndex: 1 }}>
        <div className="menu__logo">
          <Link to="/">PHILZ</Link>
        </div>
        <div className="menu_items">
          <div className="menu__content">
            <Link to="/">Home</Link>
          </div>
          <div className="menu__content">
            <Link to="/login">Login</Link>
          </div>
          <div className="menu__content">
            <Link to="/register">Register</Link>
          </div>
        </div>{' '}
      </nav>
    );
  } else {
    return (
      <nav className="menu" style={{ zIndex: 1 }}>
        <div className="menu__logo">
          <Link to="/">
            <img src={Logo} />
          </Link>
        </div>
        <div className="menu_items">
          <div className="menu__content">
            <Link to="/">
              <HomeOutlined /> Home
            </Link>
          </div>
          <div className="menu__content">
            <Link to="/">
              <BellOutlined />
              Notification
            </Link>
          </div>
          <div className="menu__content">
            <Link to="/blog">
              {' '}
              <MessageOutlined />
              Blogs
            </Link>
          </div>
          <div className="menu__content">
            <Link to="/">
              {' '}
              <TeamOutlined />
              Following
            </Link>
          </div>
          <div className="menu__content">
            <UserOutlined />
            <Link to="/"> Profile</Link>
          </div>
          <div className="menu__content">
            <Link to="/">
              <MoreOutlined />
              More
            </Link>
          </div>
          <div className="menu__content">
            <a onClick={logoutHandler}>
              <LogoutOutlined />
              Logout
            </a>
          </div>
        </div>{' '}
        <div className="menu__content">
          <Link to="/blog/create">
            <Button className="create_btn">
              <EditOutlined />
              Create
            </Button>
          </Link>
        </div>
      </nav>
    );
  }
}

export default NavBar;
