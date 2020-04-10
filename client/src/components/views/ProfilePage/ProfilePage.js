import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import './sections/profile.css';
import '../LandingPage/landing.css';
import img from './sections/pg.jpg';
import DetailSection from './sections/detailSection';
import Tab from './sections/TabSection';
function ProfilePage(props) {
  const [blog, setBlog] = useState([]);
  const [userDetail, setUserDetail] = useState([]);

  // console.clear();
  console.log(props.match.params);
  let { userId } = props.match.params;
  if (userId == ':user') {
    userId = localStorage.getItem('userid');
  }
  const variables = {
    userId,
  };
  console.log(userId);
  useEffect(() => {
    axios.post('/api/blog/userpost', variables).then((response) => {
      if (response.data.success) {
        setBlog(response.data.blogs);
      } else {
        alert('Couldnt get blog`s lists');
      }
    });

    axios.post('/api/users/userdetails', variables).then((response) => {
      if (response.data.success) {
        console.clear();
        console.log(response.data.user);
        setUserDetail(response.data.user);
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
  }, []);
  const user = { ...userDetail[0] };

  return (
    <div className="body">
      <div
        style={{
          width: '100%',
        }}
        className="component_header"
      >
        Profile
      </div>
      <div className="component_content">
        <Row>
          <Col
            xs={24}
            lg={24}
            md={24}
            sm={24}
            style={{
              background: `url(${user.backgroundimage || img})`,
            }}
            className="background_image"
          >
            <img
              src={user.image || img}
              alt="Image here"
              className="profile_picture"
            />
          </Col>
          <Col xs={24} lg={24} md={24} sm={24}>
            <DetailSection userId={userId} user={userDetail} />
          </Col>
          <Col xs={24} lg={24} md={24} sm={24} className="more_options">
            <Tab userId={userId} />
          </Col>
        </Row>
      </div>
      {/* <div className="component_content">{content}</div> */}
    </div>
  );
}
export default ProfilePage;
