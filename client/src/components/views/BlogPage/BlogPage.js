import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import initialContent, { renderCards } from '../RFC/Content/initialContent';
const { Title } = Typography;
const { Meta } = Card;

function BlogPage() {
  const [content, setContent] = useState(initialContent);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/api/blog/getBlogs').then(response => {
      if (response.data.success) {
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
        setContent(renderCards(response.data.blogs));
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
  }, []);

  // const renderCards = blogs.map((blog, index) => {
  //   return (
  //     <Col key={index} lg={32} md={32} xs={32}>
  //       <Card
  //         hoverable
  //         style={{ width: 300, marginTop: 16 }}
  //         actions={[
  //           // <Icon type="setting" key="setting" />,
  //           // <Icon type="edit" key="edit" />,
  //           <a href={`/blog/post/${blog._id}`}>
  //             {' '}
  //             <Icon type="ellipsis" key="ellipsis" />
  //           </a>
  //         ]}
  //       >
  //         <Meta
  //           avatar={<Avatar src={blog.writer.image} />}
  //           title={blog.writer.name}
  //           description="This is the description"
  //         />
  //         <div style={{ height: 150, overflowY: 'hidden', marginTop: 10 }}>
  //           <div dangerouslySetInnerHTML={{ __html: blog.content }} />
  //         </div>
  //       </Card>
  //     </Col>
  //   );
  // });

  return (
    <div className="app">
      <div className="component_header">
        {/* <Drawer /> */}
        Blogs
      </div>
      <div className="component_content">{content}</div>
    </div>
  );
}

export default BlogPage;
