import React from 'react';
import { Menu, Icon } from 'antd';
import { useSelector } from 'react-redux';
import { Row, Col, Layout } from 'antd';
// import { UserOutlined } from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;

function LeftMenu(props) {
  const user = useSelector(state => state.user);

  if (props.mode == 'inline') {
    return (
      <div>
        <Layout>
          <Header
            style={{
              height: '30vh'
            }}
          >
            Header
          </Header>
          <Content
            style={{
              height: '40vh'
            }}
            className="content-of-drawer"
          >
            <div>
              <Icon type=" user-outlined" /> Profile
            </div>
            <div>Blogs</div>
            <div>Announcement</div>
            <div>Something</div>
            <div>Something</div>
          </Content>
          <Footer
            style={{
              height: '10vh'
            }}
          >
            Footer
          </Footer>
        </Layout>
      </div>
    );
  }

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="blog">
          <a href="/blog">Blog</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="blog">
          <a href="/blog">Blog</a>
        </Menu.Item>

        <Menu.Item key="create">
          <a href="/blog/create">Create</a>
        </Menu.Item>
      </Menu>
    );
  }
}
export default LeftMenu;
