import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Follower from '../../RFC/FollowerBtn/Follower';
import EditProfile from '../sections/EditProfile';
import { Modal, Button } from 'antd';

function DetailSection(props) {
  const rUser = useSelector((state) => state.user.userData);
  const [followerNumber, setFollowerNumber] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [userInfo, setUserInfo] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const followNumberVariables = { userTo: props.userId };
    axios
      .post('/api/follow/followersNumber', followNumberVariables.userTo)
      .then((response) => {
        if (response.data.success) {
          setFollowerNumber(response.data.followNumber);
          setFollowings(response.data.followingsNumber);
        } else {
          alert('Failed to get followr Number');
        }
      });

    const variables = {
      userId: props.userId,
    };
    axios.post('/api/users/userdetails', variables).then((response) => {
      if (response.data.success) {
        console.clear();
        console.log(response.data.user);
        setUserInfo(response.data.user);
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
  }, []);
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = (e) => {
    console.log(e);
    setVisible(false);
  };
  const user = { ...userInfo[0] };
  console.clear();
  console.log(props.userId == { ...rUser }._id);
  return (
    <div className="detail_section">
      <Modal
        title="Edit Profile"
        visible={visible}
        // onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <EditProfile />
      </Modal>
      <div className="button_section">
        {/* {props.userId == { ...rUser }._id ? ( */}
        <button onClick={showModal} className="edit_profile">
          Edit Profile
        </button>
        {/* ) : ( */}
        {/* <Follower userTo={props.userId} userFrom={{ ...rUser }._id} /> */}
        {/* )} */}
      </div>
      <div className="more_content">
        <div className="name">{user.name}</div>
        <div className="user_name">
          <div className="username">{user.username || 'username'}</div>
        </div>
        <div className="description">
          {user.description || 'hey i am using fuprePeeps'}
        </div>
        <div className="user_info">
          <div className="userinfo">
            <div id="location">{user.level || '100 Level'}</div>
            <div id="data_of_birth">{user.course || 'Course'}</div>
            <div id="time_joined">{user.department || 'Department'}</div>
          </div>
        </div>
        <div className="following_info">
          <div className="following" style={{ marginRight: 30 }}>
            <span style={{ color: 'black', fontWeight: 'bolder' }}>
              {followings}{' '}
            </span>{' '}
            Following
          </div>
          <span
            style={{ color: 'black', fontWeight: 'bolder', marginRight: 2 }}
          >
            {followerNumber}
          </span>{' '}
          <div className="follower"> Followers</div>
        </div>
      </div>
    </div>
  );
}

export default DetailSection;
