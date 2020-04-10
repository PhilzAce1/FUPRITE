import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import initialContent, { renderCards } from '../../RFC/Content/initialContent';
import axios from 'axios';
const { TabPane } = Tabs;
function Tab(props) {
  const [content, setContent] = useState(initialContent);
  const [secondTab, setSecondTab] = useState(initialContent);

  const userId = props.userId;
  // const { userId } = props.match.params;
  const variables = {
    userId,
  };
  useEffect(() => {
    axios.post('/api/blog/userpost', variables).then((response) => {
      if (response.data.success) {
        setContent(renderCards(response.data.blogs, userId));
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
    axios.post('/api/blog/getlikesandcomment', variables).then((response) => {
      if (response.data.success) {
        setSecondTab(renderCards(response.data.blogs));
      } else {
        alert('Couldnt get blog`s lists');
      }
    });
  }, []);
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        // tabBarStyle={{ widthdhjh: '100%', fontSize: '3rem' }}
        size={'large'}
      >
        <TabPane tab="Posts" key="1">
          {content}
        </TabPane>
        <TabPane tab="Likes & comments" key="2">
          {secondTab}
        </TabPane>
        <TabPane tab="Contact Me" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </div>
  );
}
export default Tab;
