import React from 'react';
import { Card, Col, Skeleton, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import LikeDislikes from '../../PostPage/sections/LikeDislikes';
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
const { Meta } = Card;

const initialContent = (
  <Col lg={24}>
    <Card style={{ background: 'var(--bgcolor)', border: 'none' }}>
      <Skeleton loading={true} avatar active>
        <Meta
          avatar={<Avatar loading={true} />}
          title="Card title"
          description="This is the description"
        />
      </Skeleton>
      <Skeleton
        style={{ background: 'green', color: 'black' }}
        loading={true}
      ></Skeleton>
    </Card>
  </Col>
);
export function renderCards(blogs) {
  const userId = localStorage.getItem('userid');
  if (!Array.isArray(blogs)) return alert(typeof blogs);
  if (blogs.length <= 0) {
    return <div>No blog to display</div>;
  }
  return blogs.map((blog, index) => {
    return (
      <Col key={index} lg={24} md={24} xs={24} className="cards">
        <Card className="card" hoverable={true}>
          <Link to={`profilepage/${blog.writer._id}`}>
            {' '}
            <Meta
              style={{
                padding: ' 0 20px 0 0 ',
              }}
              avatar={<Avatar src={blog.writer.image} className="avatar" />}
              title={<span className="card_name">{blog.writer.name}</span>}
              description={
                <span className="card_username">
                  {blog.writer.username ? `@ ${blog.writer.username}` : ''}
                </span>
              }
            />
          </Link>

          {blog.title ? (
            <div className="title" style={{ fontSize: '1.2rem' }}>
              {blog.title}
            </div>
          ) : (
            <div
              className="showtitle title"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          )}

          <Link to={`/blog/post/${blog._id}`}>
            <div className="cards card_inner">
              <div
                className="showimg "
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </div>
          </Link>
          <div className="actions">
            <LikeDislikes videoId={blog._id} userId={userId} />
            <span>
              <CommentOutlined />
            </span>
            <span>
              <ShareAltOutlined />
            </span>
          </div>
        </Card>
      </Col>
    );
  });
}
export default initialContent;
