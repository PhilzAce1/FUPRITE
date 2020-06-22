import React from 'react';
import './feature.css';
import { Col, Row, Card } from 'antd';

export default function Feature() {
  const cardList = [
    {
      src:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'SOmethijng',
      description:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur consectetur vel ut corrupti, cumque minus consequuntur dolore, recusandae illum sint sequi magni molestiae ullam quasi possimus repellat adipisci placeat eius?',
    },
    {
      src:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'SOmethijng',
      description:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur consectetur vel ut corrupti, cumque minus consequuntur dolore, recusandae illum sint sequi magni molestiae ullam quasi possimus repellat adipisci placeat eius?',
    },
    {
      src:
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
      title: 'SOmethijng',
      description:
        ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur consectetur vel ut corrupti, cumque minus consequuntur dolore, recusandae illum sint sequi magni molestiae ullam quasi possimus repellat adipisci placeat eius?',
    },
  ].map((x, i) => (
    <Col xs={24} sm={24} md={8} lg={8} hoverable={true}>
      <Card style={{ width: 300 }} cover={<img alt="example" src={x.src} />}>
        <Card.Meta title={x.title} description={x.description} />
      </Card>
    </Col>
  ));
  return (
    <div className="feature">
      <div className="feature_heading">
        <h1 style={{ color: 'white' }}>What Can You Do on Fuprepeeps </h1>
      </div>
      <div className="feature_content">
        <Row className="rows" gutter={[48, 24]}>
          {cardList}
        </Row>
      </div>
    </div>
  );
}
