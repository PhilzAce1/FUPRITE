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
  const [image, setImage] = useState(
    // 'http://gravatar.com/avatar/1585222530?d=identicon'
    img
  );
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
        // console.clear();
        console.log(response.data.user);

        setImage(response.data.user[0].image);

        setUserDetail(response.data.user);
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
  }, []);
  const upload = (e) => {
    console.clear();
    console.log(e.target.files[0]);
    let imageFormObj = new FormData();
    imageFormObj.append('imageName', 'multer-image-' + Date.now());
    imageFormObj.append('image', e.target.files[0]);
    // console.clear();
    // console.log(imageFormObj.values);
    setImage(URL.createObjectURL(e.target.files[0]));

    axios
      .post('/api/blog/uploaddp', imageFormObj)
      .then((res) => {
        if (res.data.success) {
          alert('Profile Picture success fully updated');
          setImage(res.data.image);
        } else {
          alert('Profile Picture Upload error');
          setImage(img);
        }
      })
      .catch((err) => console.error(err));
  };

  const user = { ...userDetail[0] };
  // console.clear();

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
                background: `url(${image})`,
                display: 'flex',
                alignItems: 'center',
                justifyItems: 'center',
              }}
              alt="Image here"
              className="profile_picture"
            >
              <label class="custom-file-upload">
                <input type="file" accept="image/*" onChange={upload} />
                Upload
              </label>
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
