import React, { useEffect, useState } from 'react';
import Drawer from '../RFC/Drawer/Drawer';
import initialContent, { renderCards } from '../RFC/Content/initialContent';
import axios from 'axios';
import './landing.css';

function LandingPage() {
  const [blogs, setBlogs] = useState([]);
  const [content, setContent] = useState(initialContent);
  useEffect(() => {
    axios
      .get('/api/blog/getBlogs')
      .then(response => {
        if (response.data.success) {
          console.log(response.data.blogs);
          setBlogs(response.data.blogs);
          setContent(renderCards(response.data.blogs));
        } else {
          alert('Couldnt get blog`s lists');
        }
      })
      .catch(e => console.error(e));
  }, []);
  return (
    <div className="app">
      <div className="component_header">
        {/* <Drawer /> */}
        Home
      </div>
      <div className="component_content">{content}</div>
    </div>
  );
}

export default LandingPage;
