import React, { useState } from 'react';
import NavBar from '../../NavBar/NavBar';
import { Drawer, Button, Icon } from 'antd';
function Drawers(props) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <div
      style={{
        alignSelf: 'flex-end',
      }}
    >
      <Button
        className="menu__mobile-button"
        type="primary"
        onClick={showDrawer}
      >
        <Icon type="align-right" />
      </Button>
      <Drawer
        placement="left"
        className="menu_drawer"
        closable={true}
        onClose={onClose}
        visible={visible}
      >
        <NavBar />
      </Drawer>
    </div>
  );
}
export default Drawers;
