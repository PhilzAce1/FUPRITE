import { Card, Col, Skeleton, Avatar, Icon } from 'antd';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Meta } = Card;

const initialContent = (
  <Col lg={24}>
    <Card>
      <Skeleton loading={true} avatar active>
        <Meta
          avatar={<Avatar loading={true} />}
          title="Card title"
          description="This is the description"
        />
      </Skeleton>
      <Skeleton loading={true}></Skeleton>
    </Card>
  </Col>
);
export const renderCards = blogs => {
  return blogs.map((blog, index) => {
    return (
      <Col key={index} lg={24} md={24} xs={24} className="cards">
        <Card
          hoverable={true}
          actions={[
            // <Icon type="setting" key="setting" />,
            // <Icon type="edit" key="edit" />,
            <Link to={`/blog/post/${blog._id}`}>
              <Icon type="ellipsis" key="ellipsis" />
            </Link>
          ]}
        >
          <Meta
            avatar={<Avatar src={blog.writer.image} />}
            title={blog.writer.name}
            description="This is the description"
          />
          <div
            style={{
              height: ' 30vh',
              marginLeft: '5vw',
              overflowY: 'hidden',
              marginTop: 10,
              border: '2px solid #E6ECF0',
              borderRadius: '20px'
            }}
          >
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
        </Card>
      </Col>
    );
  });
};
export default initialContent;
