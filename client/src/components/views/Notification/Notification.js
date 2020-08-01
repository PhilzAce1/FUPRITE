import React from 'react';
import Tabs from './sections/Tabs';
import { useSelector } from 'react-redux';
function Notification(props) {
  const user = useSelector((state) => state.user);
  return (
    <div className="app">
      <div className="component_header">Notifications</div>
      <div className="component_content">
        <Tabs userId={user.userID} />
      </div>
    </div>
  );
}
export default Notification;
