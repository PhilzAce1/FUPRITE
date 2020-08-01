import React from 'react';
import './feature.css';
import { Col, Row, Card } from 'antd';

export default function Feature() {
  const cardList = [
    {
      src:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Create An Account ',
      description:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur consectetur vel ut corrupti, cumque minus consequuntur dolore, recusandae illum sint sequi magni molestiae ullam quasi possimus repellat adipisci placeat eius?',
    },
    {
      src:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Create a Post',
      description:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur consectetur vel ut corrupti, cumque minus consequuntur dolore, recusandae illum sint sequi magni molestiae ullam quasi possimus repellat adipisci placeat eius?',
    },
    {
      src:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'Invite Your Friends',
      description:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur consectetur vel ut corrupti, cumque minus consequuntur dolore, recusandae illum sint sequi magni molestiae ullam quasi possimus repellat adipisci placeat eius?',
    },
  ].map((x, i) => (
    <Col xs={24} sm={24} md={8} lg={8} hoverable="true" key={i}>
      <Card
        style={{
          width: 300,
          borderRadius: '20px',
          boxShadow: '0px 10px 10px  rgba(0, 0, 0, 0.541);',
        }}
        cover={<img alt="example" src={x.src} />}
      >
        <Card.Meta
          title={x.title}
          description={x.description}
          style={{
            borderRadius: '20px 20px 0 0',
          }}
        />
      </Card>
    </Col>
  ));
  return (
    <div className="feature">
      <div className="feature_heading">
        <h1 style={{ color: 'white' }}>How To Get Started</h1>
      </div>
      <div className="feature_content">
        <Row className="rows" gutter={[48, 24]}>
          {cardList}
        </Row>
      </div>
    </div>
  );
}
