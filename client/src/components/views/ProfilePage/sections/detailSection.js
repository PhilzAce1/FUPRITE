import React from 'react';

function DetailSection(props) {
  return (
    <div className="detail_section">
      <div className="button_section">
        <button className="edit_profile">Edit Profile</button>
      </div>
      <div className="more_content">
        <div className="name">Philemon Chukky</div>
        <div className="user_name">
          <div className="username">something</div>
        </div>
        <div className="description">
          there is something about me that i do not know how to explain ..but i
          am willing to learn ...but you are not going to be able to be good
        </div>
        <div className="user_info">
          <div className="userinfo">
            <div id="location">Lagos , Nigeria</div>
            <div id="data_of_birth">22nd of feb 2002</div>
            <div id="time_joined">13th of jan 2009</div>
          </div>
        </div>
        <div className="following_info">
          <div className="following" style={{ marginRight: 30 }}>
            <span style={{ color: 'black', fontWeight: 'bolder' }}>74 </span>{' '}
            Following
          </div>
          <span
            style={{ color: 'black', fontWeight: 'bolder', marginRight: 2 }}
          >
            74{' '}
          </span>{' '}
          <div className="follower"> Followers</div>
        </div>
      </div>
    </div>
  );
}

export default DetailSection;
