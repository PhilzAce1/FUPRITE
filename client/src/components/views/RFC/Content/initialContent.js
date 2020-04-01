import React from 'react';

import { Card, Col, Skeleton, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import Follower from '../FollowerBtn/Follower';
import LikeDislikes from '../../PostPage/sections/LikeDislikes';

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
export function renderCards(blogs) {
  const user = localStorage.getItem('userid');
  if (!Array.isArray(blogs)) return alert(typeof blogs);
  if (blogs.length <= 0) {
    return <div>No blog to display</div>;
  }
  return blogs.map((blog, index) => {
    return (
      <Col key={index} lg={24} md={24} xs={24} className="cards">
        <Card
          hoverable={true}
          actions={[
            // <Icon type="setting" key="setting" />,
            // <Icon type="edit" key="edit" />,
            <Icon type="ellipsis" key="ellipsis" />,
            <LikeDislikes
              comment
              commentId={blog._id}
              userId={localStorage.getItem('userId')}
            />
          ]}
        >
          <Meta
            avatar={<Avatar src={blog.writer.image} />}
            title={blog.writer.name}
            description={<Follower userTo={blog.writer._id} userFrom={user} />}
            // extra={<Follower />}
          />
          <Link to={`/blog/post/${blog._id}`}>
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
          </Link>
        </Card>
      </Col>
    );
  });
}
export default initialContent;
