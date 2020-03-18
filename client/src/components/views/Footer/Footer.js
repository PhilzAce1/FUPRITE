import React from 'react';
import { Icon } from 'antd';

function Footer() {
  return (
    <div
      style={{
        height: '80px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: '1rem'
        // backgroundColor: 'green'
      }}
    >
      <p>
        {''}
        Happy Coding <Icon type="facebook" />
      </p>
      <span
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // backgroundColor: 'red',
          width: '10vw'
        }}
      >
        <Icon type="facebook" />
        <Icon type="twitter" />
        <Icon type="instagram" />
        <Icon type="facebook" />
      </span>
    </div>
  );
}

export default Footer;
