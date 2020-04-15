import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import './sections/profile.css';
import '../LandingPage/landing.css';
import img from './sections/pg.jpg';
import DetailSection from './sections/detailSection';
import Tab from './sections/TabSection';
import UploadBtn from './sections/UploadBtn';
function ProfilePage(props) {
  const [blog, setBlog] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [image, setImage] = useState(img);
  const [uploadedFile, setUploadedFile] = useState({});

  let { userId } = props.match.params;
  if (userId === ':user') {
    userId = localStorage.getItem('userid');
  }
  const variables = {
    userId,
  };
  console.log(userId);
  useEffect(() => {
    //   axios.post('/api/blog/userpost', variables).then((response) => {
    //     if (response.data.success) {
    //       setBlog(response.data.blogs);
    //     } else {
    //       alert('Couldnt get blog`s lists');
    //     }
    //   });

    axios.post('/api/users/userdetails', variables).then((response) => {
      if (response.data.success) {
        // console.clear();
        console.log(response.data.user);

        setUploadedFile(response.data.user[0].image);

        setUserDetail(response.data.user);
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
  }, []);

  const user = { ...userDetail[0] };
  // console.clear();
  console.log(uploadedFile);
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
            <div
              style={{
                background: `url(${uploadedFile})`,
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}
              alt="Image here"
              className="profile_picture"
            >
              <UploadBtn setUploadedFile={setUploadedFile} userId={userId} />
            </div>
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
