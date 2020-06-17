import React from 'react';
import './Login/login.css';
import Form from './Login/Form';
import Slider from '../../../component/Carousel/Carousel';
export default function LoginPage() {
  return (
    <div className="welcome_container">
      <div className="login_page_container">
        <div className="form">
          <Form />
        </div>
        <div className="slider">
          <Slider />
        </div>
      </div>
    </div>
  );
}
