import React from 'react';
import './TwoSplit.css';
import { Col, Row } from 'antd';

export default function TwoSplit({ children, reverse }) {
  if (reverse && reverse === true)
    return (
      <div className="twosplit_container">
        <Row>
          <Col xs={0} sm={0} md={0} lg={12} className="second">
            {children[1]}
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} className="first">
            {children[0]}
          </Col>
        </Row>
      </div>
    );
  return (
    <div className="twosplit_container">
      <Row>
        <Col xs={24} sm={24} md={24} lg={12} className="first">
          {children[0]}
        </Col>
        <Col xs={0} sm={0} md={0} lg={12} className="second">
          {children[1]}
        </Col>
      </Row>
    </div>
  );
}
