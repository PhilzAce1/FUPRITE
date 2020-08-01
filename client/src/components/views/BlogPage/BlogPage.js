import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import initialContent, { renderCards } from '../RFC/Content/initialContent';

function BlogPage() {
  const [content, setContent] = useState(initialContent);
  const user = useSelector((state) => state.user);
  const variables = {
    userId: user.userID,
  };
  useEffect(() => {
    axios.post('/api/blog/userpost', variables).then((response) => {
      if (response.data.success) {
        setContent(renderCards(response.data.blogs, user.userID));
      } else {
        message.error('Couldnt get blog`s lists');
      }
    });
  }, [variables, user.userID]);

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
