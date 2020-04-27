import React from 'react';
import { Icon } from 'antd';
import {
  BellOutlined,
  SearchOutlined,
  HomeOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
function Footer() {
  return (
    <div className="footer">
      <NavLink
        activeStyle={{
          // backgroundColor: '#2ba6f32d',
          color: '#2ba7f3',
          borderRadius: '30px',
        }}
        to="/home"
      >
        <HomeOutlined className="icons" />
      </NavLink>
      <NavLink
        activeStyle={{
          color: '#2ba7f3',
          borderRadius: '30px',
        }}
        // className="link"
        to="/searchpage"
      >
        <SearchOutlined className="icons" />
      </NavLink>

      <NavLink
        activeStyle={{
          color: '#2ba7f3',
          borderRadius: '30px',
        }}
        // className="link"
        to="/followingsblog"
      >
        <TeamOutlined className="icons" />
      </NavLink>
      <NavLink
        activeStyle={{
          color: '#2ba7f3',
          borderRadius: '30px',
        }}
        className="link"
        to="/notification"
      >
        <BellOutlined className="icons" />
      </NavLink>
    </div>
  );
}

export default Footer;
