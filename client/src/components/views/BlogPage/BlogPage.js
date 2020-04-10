import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography } from 'antd';
import { useSelector } from 'react-redux';
import initialContent, { renderCards } from '../RFC/Content/initialContent';

function BlogPage() {
  const [content, setContent] = useState(initialContent);
  const user = useSelector((state) => state.user.userData);

  console.clear();
  // console.log({ ...user }._id);
  const variables = {
    userId: { ...user }._id,
  };
  useEffect(() => {
    axios.post('/api/blog/userpost', variables).then((response) => {
      if (response.data.success) {
        setContent(renderCards(response.data.blogs, { ...user }._id));
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
  }, []);

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
