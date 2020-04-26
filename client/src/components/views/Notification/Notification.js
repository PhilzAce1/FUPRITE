import React, { useState, useEffect } from 'react';
import Tabs from './sections/Tabs';
function Notification(props) {
  return (
    <div className="app">
      <div className="component_header">Notifications</div>
      <div className="component_content">
        <Tabs userId={{ ...props.user.userData }._id} />
      </div>
    </div>
  );
}
export default Notification;
