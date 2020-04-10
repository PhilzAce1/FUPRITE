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
  // console.clear();
  const userId = localStorage.getItem('userid');
  if (!Array.isArray(blogs)) return alert(typeof blogs);
  if (blogs.length <= 0) {
    return <div>No blog to display</div>;
  }
  return blogs.map((blog, index) => {
    // console.log(localStorage.userId);

    return (
      <Col key={index} lg={24} md={24} xs={24} className="cards">
        <Card
          hoverable={true}
          actions={[
            // <Icon type="setting" key="setting" />,
            // <Icon type="edit" key="edit" />,
            <Icon type="ellipsis" key="ellipsis" />,
            <LikeDislikes
              // comment
              videoId={blog._id}
              userId={userId}
            />,
          ]}
        >
          {console.log(userId)}
          <Meta
            style={{
              padding: ' 0 20px',
            }}
            avatar={<Avatar src={blog.writer.image} size={50} />}
            title={blog.writer.name}
            // description={

            // }
            description={`@ ${
              blog.writer.username ? blog.writer.username : 'username'
            }`}
            // // extra={<Follower />}
          />
          <Link to={`/blog/post/${blog._id}`}>
            <div
              style={{
                height: ' 45vh',
                marginLeft: '2vw',
                marginRight: '2vw',
                overflowY: 'auto',
                marginTop: 10,
                border: '2px solid #E6ECF0',
                borderRadius: '20px',
                padding: '20px',
              }}
              className="cards"
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
