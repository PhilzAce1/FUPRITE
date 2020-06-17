import React from 'react';
import Nav from '../Nav/Nav';
import Slider from '../../../../component/Carousel/Carousel';
import './Home.css';
export default function Home() {
  return (
    <div className="home">
      <Nav />
      <div className="content">
        <div className="welcome_text">
          <h1 className="heading">
            Get authenticated News and Stay Connected with friends
          </h1>
          <h3 className="welcome_text_content">
            Fuprepeeps is a communication system designed specially for Fupre
            University students to pass information easily and quickly
          </h3>
        </div>
        <div className="sliders">
          <Slider />
        </div>
      </div>
    </div>
  );
}
