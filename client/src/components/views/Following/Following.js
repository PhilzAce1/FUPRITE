import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import initialContent, { renderCards } from '../RFC/Content/initialContent';
import axios from 'axios';
import { message } from 'antd';
function FollowingPage(props) {
  const user = useSelector((state) => state.user.userData);
  const [content, setContent] = useState(initialContent);
  let variable = {
    userFrom:
      localStorage.getItem('userid') ||
      localStorage.getItem('userId') ||
      { ...user }._id,
  };
  useEffect(() => {
    axios
      .post('/api/blog/getFollowingPosts', variable)
      .then((response) => {
        if (response.data.success) {
          setContent(renderCards(response.data.blogs));
        } else {
          message.error('Couldnt get blog`s lists');
        }
      })
      .catch((e) => {
        console.error(e);
        message.error('there was an error | please reload this page');
        // return window.location.reload();
      });
  }, []);
  return (
    <div className="app">
      <div className="component_header">From People you follow</div>
      <div className="component_content">{content}</div>
    </div>
  );
}
export default FollowingPage;
