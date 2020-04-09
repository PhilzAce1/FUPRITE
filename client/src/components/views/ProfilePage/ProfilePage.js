import React from 'react';
import { Col, Row } from 'antd';
import './sections/profile.css';
import '../LandingPage/landing.css';
import img from './sections/pg.jpg';
import DetailSection from './sections/detailSection';
import Tab from './sections/TabSection';
// import '../sections/profilepage.css';
function ProfilePage(props) {
  console.clear();
  console.log(props.match.params);
  const { userId } = props.match.params;
  console.log(userId);
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
          <Col xs={24} lg={24} md={24} sm={24} className="background_image">
            <img src={img} alt="Image here" className="profile_picture" />
          </Col>
          <Col xs={24} lg={24} md={24} sm={24}>
            <DetailSection />
          </Col>
          <Col xs={24} lg={24} md={24} sm={24} className="more_options">
            <Tab />
          </Col>
        </Row>
      </div>
      {/* <div className="component_content">{content}</div> */}
    </div>
  );
}
export default ProfilePage;
