import React from 'react';
import { Card, Col, Skeleton, Avatar, Icon } from 'antd';
import { Link } from 'react-router-dom';
import LikeDislikes from '../../PostPage/sections/LikeDislikes';
import { CommentOutlined, ShareAltOutlined } from '@ant-design/icons';
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
  const userId = localStorage.getItem('userid');
  if (!Array.isArray(blogs)) return alert(typeof blogs);
  if (blogs.length <= 0) {
    return <div>No blog to display</div>;
  }
  return blogs.map((blog, index) => {
    return (
      <Col key={index} lg={24} md={24} xs={24} className="cards">
        <Card
          // style={{
          //   // height:
          // }}
          hoverable={true}
          // actions={[
          //   <Icon type="ellipsis" key="ellipsis" />,
          //   <LikeDislikes
          //     // comment
          //     videoId={blog._id}
          //     userId={userId}
          //   />,
          // ]}
        >
          <Meta
            style={{
              padding: ' 0 20px 0 0 ',
            }}
            avatar={<Avatar src={blog.writer.image} size={64} />}
            title={blog.writer.name}
            description={
              blog.writer.username ? `@ ${blog.writer.username}` : 'username'
            }
          />
          {blog.writer.title && <div className="title">Gekkk</div>}
          <Link to={`/blog/post/${blog._id}`}>
            <div
              style={{
                maxHeight: '43vh',
                maxWidth: '80%',
                marginLeft: '10%',
                marginRight: '1vw',
                overflowY: 'hidden',
                marginTop: 10,
                // border: '2px solid #E6ECF0',
                borderRadius: '20px',
                padding: '0px',
              }}
              className="cards"
            >
              <div
                className="showimg"
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
