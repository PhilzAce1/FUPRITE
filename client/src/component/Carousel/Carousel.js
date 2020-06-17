import React from 'react';
import './k.css';
import { Carousel } from 'antd';
import img1 from '../../assets/images/2.png';
import img2 from '../../assets/images/3.png';
import img3 from '../../assets/images/4.png';
import img4 from '../../assets/images/5.png';
import img5 from '../../assets/images/6.png';

export default function Slide() {
  return (
    <Carousel autoplay dots={false}>
      <div>
        <img src={img1} alt="illustration" />
      </div>
      <div>
        <img src={img2} alt="illustration" />
      </div>
      <div>
        <img src={img3} alt="illustration" />
      </div>
      <div>
        <img src={img4} alt="illustration" />
      </div>
      <div>
        <img src={img5} alt="illustration" />
      </div>
    </Carousel>
  );
}
