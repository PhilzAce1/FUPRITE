import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import './sections/profile.css';
import '../LandingPage/landing.css';
import img from './sections/pg.jpg';
import DetailSection from './sections/detailSection';
import Tab from './sections/TabSection';
function ProfilePage(props) {
  const [userDetail, setUserDetail] = useState([]);
  const [message, setMessage] = useState(img);
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
    axios.post('/api/users/userdetails', variables).then((response) => {
      if (response.data.success) {
        setUploadedFile(`${response.data.user[0].image}`);
        setUserDetail(response.data.user);
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
  }, []);
  const onSubmit = async (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('userId', props.userId);
    console.log(formData);
    try {
      const res = await axios.post('/api/users/uploadProfilePic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { filePath } = res.data;
      console.clear();
      setUploadedFile(filePath);
      console.log(filePath);
    } catch (error) {
      if (error.response.status === 500) {
        setMessage('Internal server error');
      }
      setMessage('Unable to Upload please try again');
    }
    console.log(uploadedFile);
  };
  const user = { ...userDetail[0] };
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
                backgroundImage:
                  'url("http://gravatar.com/avatar/1585222530?d=identicon")',
                // 'url(`localhost:5000/uploads/240aec3b877796ac4705c842b9ce5de1_FacebookSDG_Develop your dev skills___Twitter (1).png`)',
                //  `url(${uploadedFile})`,
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}
              alt="Image here"
              className="profile_picture"
            >
              <Fragment>
                <label class="custom-file-upload">
                  <input type="file" accept="image/*" onChange={onSubmit} />
                  Upload
                </label>
              </Fragment>
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
