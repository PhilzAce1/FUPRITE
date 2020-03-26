import { Card, Col, Skeleton, Avatar, Icon } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Follower from '../FollowerBtn/Follower';

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
        <Link to={`/blog/post/${blog._id}`}>
          <Card
            hoverable={true}
            actions={[
              // <Icon type="setting" key="setting" />,
              // <Icon type="edit" key="edit" />,
              <Icon type="ellipsis" key="ellipsis" />
            ]}
          >
            <Meta
              avatar={<Avatar src={blog.writer.image} />}
              title={blog.writer.name}
              description={
                <Follower
                  userTo={blog.writer._id}
                  userFrom={localStorage.getItem('userId')}
                />
              }
              // extra={<Follower />}
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
        </Link>
      </Col>
    );
  });
};
export default initialContent;
