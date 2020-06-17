import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pg from '../../ProfilePage/sections/pg.jpg';
import { message } from 'antd';
function WTF() {
  const [users, setUsers] = useState('');
  useEffect(() => {}, []);
  return (
    <div className="search_content">
      <div className="header">Who To Follow</div>
      <div className="search_content_body">Under Construction</div>
    </div>
  );
}
export default WTF;
