import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography } from 'antd';
import initialContent, { renderCards } from '../RFC/Content/initialContent';

function BlogPage() {
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    axios.get('/api/blog/getBlogs').then(response => {
      if (response.data.success) {
        setContent(renderCards(response.data.blogs));
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
