import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import initialContent, { renderCards } from '../RFC/Content/initialContent';
import axios from 'axios';
import './landing.css';

function LandingPage() {
  const user = useSelector((state) => state.user.userData);
  localStorage.setItem('userid', { ...user }._id);
  // console.clear();

  const userId = { ...user }._id;
  console.log(userId);
  const [content, setContent] = useState(initialContent);
  useEffect(() => {
    axios
      .get('/api/blog/getBlogs')
      .then((response) => {
        if (response.data.success) {
          // console.log(response.data.blogs);
          setContent(renderCards(response.data.blogs, userId));
        } else {
          alert('Couldnt get blog`s lists');
        }
      })
      .catch((e) => {
        console.error(e);
        alert('there was an error | please reload this page');
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
