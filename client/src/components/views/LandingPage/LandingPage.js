import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import initialContent, { renderCards } from '../RFC/Content/initialContent';
import axios from 'axios';
import { message } from 'antd';

function LandingPage(props) {
  const user = useSelector((state) => state.user);
  const userId = user.userId;
  const [content, setContent] = useState(initialContent);
  useEffect(() => {
    axios
      .get('/api/blog/getBlogs')
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          setContent(renderCards(response.data.blogs, userId));
        } else {
          message.error('unable to get BLog');
          console.log(response.data);
        }
      })
      .catch((e) => {
        console.error(e);
        message.error('there was an error | please reload this page');
        return window.location.reload;
      });
  }, [props.history, userId]);
  return (
    <div className="app">
      <div className="component_header">Home</div>
      <div className="component_content">{content}</div>
    </div>
  );
}

export default LandingPage;
