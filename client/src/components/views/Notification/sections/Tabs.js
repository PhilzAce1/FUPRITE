import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, message } from 'antd';
import { Link } from 'react-router-dom';
const { TabPane } = Tabs;

function TabSec(props) {
  const [section, setSection] = useState('');
  const userId = { ...props }.userId;
  console.log(userId);
  useEffect(() => {
    axios
      .post('/api/users/followupdate', { userId })

      .then((response) => {
        if (response.data.success === true) {
          message.success('Notifications');
          setSection(response.data.notifications);
        } else {
          message.error('Something went wrong');
        }
      });
  }, [userId]);
  const render = (noti, type) => {
    if (!noti) {
      return <div style={{ textAlign: 'center' }}>NO Notifications</div>;
    } else {
      return noti.map((x, i) => (
        <Link
          key={i}
          to={
            type === 'user' ? `profilepage/${x.user}` : `/blog/post/${x.blog}`
          }
        >
          <div
            style={{
              width: '100%',
              padding: '10px',
              textAlign: 'center',
              fontSize: '1rem',
              color: 'var(--bodyfontcolor)',
              textTransform: 'capitalize',
              borderBottom: '4px solid  var(--primarybordercolor)',
            }}
            key={i}
          >
            {x.content}
          </div>
        </Link>
      ));
    }
  };

  return (
    <Tabs defaultActiveKey="1" size={'large'} animated={true}>
      <TabPane tab={<span className="tabpane">NEW POST</span>} key="1">
        {render(section.user, 'blog')}
      </TabPane>
      <TabPane tab={<span className="tabpane">NEW FOLLOWER</span>} key="2">
        {render(section.user, 'user')}
      </TabPane>
    </Tabs>
  );
}
export default TabSec;
