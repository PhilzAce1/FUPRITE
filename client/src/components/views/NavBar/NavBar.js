import React, { useState } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
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
  EditOutlined,
} from '@ant-design/icons';
import { Link, NavLink } from 'react-router-dom';
import { logoutUser } from '../../../_actions/user_actions';

import Logo from './Sections/Logo.png';
function NavBar(props) {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        dispatch(logoutUser());
        // props.history.push('/');
        localStorage.clear();
        window.location.pathname = '/login';
        // window.location.reload();
      } else {
        alert('Log Out Failed');
      }
    });
  };
  if (!{ ...user }._id) {
    return (
      <nav className="menu" style={{ zIndex: 1 }}>
        <div className="menu__logo">
          <Link to="/">PHILZ</Link>
        </div>
        <div className="menu_items">
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/ "
            >
              Home
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/login"
            >
              Login
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        </div>{' '}
      </nav>
    );
  } else {
    return (
      <nav className="menu" style={{ zIndex: 1 }}>
        <div className="menu__logo">
          <NavLink to="/">
            <img src={Logo} className="image" />
          </NavLink>
        </div>
        <div className="menu_items">
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/"
            >
              <HomeOutlined className="icon" />
              Home
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/notification"
            >
              <BellOutlined className="icon" />
              Notification
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/blog"
            >
              <MessageOutlined className="icon" />
              Blogs
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/followingsblog"
            >
              {' '}
              <TeamOutlined className="icon" />
              Following
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/profilepage/:id"
            >
              <UserOutlined className="icon" />
              Profile
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/more"
            >
              <MoreOutlined className="icon" />
              More
            </NavLink>
          </div>
          <div className="menu__content">
            <a
              activeStyle={{
                backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              onClick={logoutHandler}
            >
              <LogoutOutlined className="icon" />
              Logout
            </a>
          </div>
        </div>{' '}
        <div className="menu__content">
          <NavLink to="/blog/create">
            <button className="create_btn">
              <EditOutlined />
              Create
            </button>
          </NavLink>
        </div>
      </nav>
    );
  }
}

export default NavBar;
