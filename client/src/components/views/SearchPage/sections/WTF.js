import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pg from '../../ProfilePage/sections/pg.jpg';
import { message } from 'antd';
function WTF() {
  const [users, setUsers] = useState('');
  useEffect(() => {
    axios
      .post('/api/users/whotofollow')
      .then((response) => {
        if (response.data.success) {
          setUsers(response.data.users);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  }, []);
  // const f = (arr) => {
  //   if (arr.length < 0) {
  //     return (
  //       <div className="content_body">
  //         <img src={pg} alt="user_image" />
  //         <div className="userq">
  //           Please Complete your Profile and Invite friends
  //         </div>
  //         <div className="follow_btn">
  //           <button>Follow</button>
  //         </div>
  //       </div>
  //     );
  //   } else {
  //     arr.map((x, i) => {
  //       return (
  //         <div key={i} className="content_body">
  //           <img src={pg} alt="user_image" />
  //           <div className="userq">
  //             <div className="full_namee">{x.name}</div>
  //             <div className="usernamee">{x.username}</div>
  //           </div>
  //           <div className="follow_btn">
  //             <button>Follow</button>
  //           </div>
  //         </div>
  //       );
  //     });
  //   }
  // };
  return (
    // <div>
    <div className="search_content">
      <div className="header">Who To Follow</div>
      <div className="search_content_body">Under Constructio</div>
    </div>
  );
}
export default WTF;
