import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { USER_SERVER } from '../../Config';
import axios from 'axios';
import {
  UserOutlined,
  BellOutlined,
  MessageOutlined,
  HomeOutlined,
  MoreOutlined,
  TeamOutlined,
  LogoutOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import { logoutUser } from '../../../_actions/user_actions';
import { Modal, Button, Input, message, Form } from 'antd';
import More from '../More/More';
import Logo from './Sections/Logo.png';

function CreatePost(props) {
  const user = useSelector((state) => state.user);

  const [title, setTitle] = useState('');
  const onTitleChange = (value) => {
    setTitle(value.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (user.userData && !user.userData.isAuth) {
      return message.error('Please Log in first');
    }

    const variables = {
      userID: user.userData._id,
      title: title,
    };

    axios.post('/api/blog/createPost', variables).then((response) => {
      if (response) {
        message.success('Post Created!');
        setTitle('');
        props.handleCancle();
        // setTimeout(() => {
        // }, 2000);
      }
    });
  };
  return (
    <div>
      <Input.TextArea
        placeholder="Title Here"
        maxLength={60}
        size={'middle'}
        onChange={onTitleChange}
      />
      <Form onSubmit={onSubmit}>
        <div style={{ textAlign: 'center', margin: '2rem' }}>
          <Button
            size="large"
            htmlType="submit"
            className=""
            onSubmit={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

function NavBar(props) {
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [postVisible, setPostVisible] = useState(false);
  const [moreVisible, setMoreVisible] = useState(false);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        dispatch(logoutUser());
        // props.history.push('/');
        localStorage.clear();
        window.location.pathname = '/login';
        // window.location.reload();
      } else {
        message.error('Log Out Failed');
      }
    });
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleCancle = () => {
    setPostVisible(false);
    setVisible(false);
    setMoreVisible(false);
  };
  const handleMoreModal = () => {
    setMoreVisible(true);
  };
  const handlePostVisible = () => {
    setPostVisible(true);
  };
  if (!{ ...user }._id) {
    return (
      <nav className="menu" style={{ zIndex: 1 }}>
        <div className="menu__logo">
          <NavLink to="/">
            <img src={Logo} className="image" />
          </NavLink>
        </div>
        <div className="menu_items">
          <div className="menu__content">
            <NavLink
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/"
            >
              Home
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/login"
            >
              Login
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/register"
            >
              Register
            </NavLink>
          </div>
        </div>{' '}
      </nav>
    );
  } else {
    return (
      <nav className="menu" style={{ zIndex: 1 }}>
        <div className="menu__logo">
          <NavLink to="/">
            <img src={Logo} className="image" />
          </NavLink>
        </div>
        <div className="menu_items">
          <div className="menu__content">
            <NavLink
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/home"
            >
              <HomeOutlined className="icon" />
              Home
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link hideinfull"
              to="/notification"
            >
              <BellOutlined className="icon" />
              Notification
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/blog"
            >
              <MessageOutlined className="icon" />
              Blogs
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link hideinfull"
              to="/followingsblog"
            >
              {' '}
              <TeamOutlined className="icon" />
              Following
            </NavLink>
          </div>
          <div className="menu__content">
            <NavLink
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              to="/profilepage/:user"
            >
              <UserOutlined className="icon" />
              Profile
            </NavLink>
          </div>
          <div className="menu__content">
            <button
              style={{
                background: 'transparent',
              }}
              className="link"
              onClick={handleMoreModal}
            >
              <MoreOutlined className="icon" />
              More
            </button>
          </div>
          <div className="menu__content">
            <a
              activeStyle={{
                // backgroundColor: '#2ba6f32d',
                color: '#2ba7f3',
                borderRadius: '30px',
              }}
              className="link"
              onClick={logoutHandler}
            >
              <LogoutOutlined className="icon" />
              Logout
            </a>
          </div>
        </div>{' '}
        <div className="menu__content">
          <button
            style={{
              marginTop: '-10px',
            }}
            className="create_btn"
            onClick={showModal}
          >
            <EditOutlined />
            Create
          </button>

          <Modal
            visible={visible}
            title="What do you want to write"
            onCancel={handleCancle}
            footer={null}
          >
            <div
              style={{
                display: 'flex',
                flexFlow: 'column nowrap',
                height: '20vh',
                justifyContent: 'space-between',
              }}
            >
              <NavLink to="/blog/create">
                <Button type="primary" block={false} onClick={handleCancle}>
                  Create Article
                </Button>
              </NavLink>

              <Button type="primary" block={false} onClick={handlePostVisible}>
                ShortPOst
              </Button>
            </div>
          </Modal>

          <Modal
            visible={postVisible}
            title="Write Something"
            onCancel={handleCancle}
            footer={null}
          >
            <CreatePost handleCancle={handleCancle} />
          </Modal>
          <Modal
            visible={moreVisible}
            title={
              <span style={{ fontSize: '2rem', fontWeight: 'bolder' }}>
                MORE
              </span>
            }
            onCancel={handleCancle}
            footer={null}
            mask={true}
          >
            <More handleCancle={handleCancle} />
          </Modal>
        </div>
      </nav>
    );
  }
}

export default NavBar;
