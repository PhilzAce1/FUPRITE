import React from 'react';
import './Reg/res.css';
import Form from './Reg/Form';
import Slider from '../../../component/Carousel/Carousel';
export default function RegisterPage() {
  return (
    <div className="welcome_container">
      <div className="register_page_container">
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
