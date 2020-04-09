import React from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
function Tab(props) {
  // console.clear();
  console.log(props);
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        // tabBarStyle={{ width: '100%', fontSize: '3rem' }}
        size={'large'}
      >
        <TabPane tab="Posts" key="1">
          Somehitng
        </TabPane>
        <TabPane tab="Likes & comments" key="2">
          Content of tab 2
        </TabPane>
        <TabPane tab="Contact Form" key="3">
          Content of tab 3
        </TabPane>
      </Tabs>
    </div>
  );
}
export default Tab;
