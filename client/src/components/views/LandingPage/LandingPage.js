import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import initialContent, { renderCards } from '../RFC/Content/initialContent';
import axios from 'axios';
import { message } from 'antd';

function LandingPage(props) {
  const user = useSelector((state) => state.user.userData);
  localStorage.setItem('userid', { ...user }._id);
  const userId = { ...user }._id;
  const [content, setContent] = useState(initialContent);
  useEffect(() => {
    axios
      .get('/api/blog/getBlogs')
      .then((response) => {
        if (response.data.success) {
          setContent(renderCards(response.data.blogs, userId));
        } else {
          message.error('Couldnt get blog`s lists');
          props.history.push('/');
        }
      })
      .catch((e) => {
        console.error(e);
        message.error('there was an error | please reload this page');
        return window.location.reload;
      });
  }, []);
  return (
    <div className="app">
      <div className="component_header">Home</div>
      <div className="component_content">{content}</div>
    </div>
  );
}

export default LandingPage;
