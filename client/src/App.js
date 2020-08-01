import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from './hoc/auth';
import { Col, Row } from 'antd';

// pages for this product
import SearchPage from './components/views/SearchPage/SearchPage';
import LandingPage from './components/views/LandingPage/LandingPage.js';
import LoginPage from './components/views/LoginPage/LoginPage.js';
import RegisterPage from './components/views/RegisterPage/RegisterPage.js';
import NavBar from './components/views/NavBar/NavBar';
import Footer from './components/views/Footer/Footer';
import PostPage from './components/views/PostPage/PostPage';
import BlogPage from './components/views/BlogPage/BlogPage';
import CreateBlogPage from './components/views/BlogPage/Section.js/CreatePage';
import Drawer from './components/views/RFC/Drawer/Drawer';
import FollowingPage from './components/views/Following/Following';
import ProfilePage from './components/views/ProfilePage/ProfilePage';
import Welcome from './components/views/Welcome/index';
import Notification from './components/views/Notification/Notification';
import ErrorPage from './components/views/Welcome/404';
function App() {
  // const { toggleTheme, themeName } = React.useContext(ThemeSelectorContext);
  // React.useEffect(() => toggleTheme('white'));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Row>
        <Col
          xs={0}
          sm={0}
          md={8}
          lg={6}
          className="col"
          style={{ maxHeight: '100vh', overflow: 'auto' }}
        >
          <Switch>
            <Route exact path="/home" component={Auth(NavBar, true)} />
            <Route
              exact
              path="/followingsBlog"
              component={Auth(NavBar, true)}
            />
            <Route exact path="/blog" component={Auth(NavBar, true)} />
            <Route exact path="/blog/create" component={Auth(NavBar, true)} />
            <Route
              exact
              path="/blog/post/:postId"
              component={Auth(NavBar, false, true)}
            />
            <Route
              exact
              path="/profilepage/:userId"
              component={Auth(NavBar, true)}
            />
            <Route exact path="/searchpage" component={Auth(NavBar, null)} />
            <Route exact path="/notification" component={Auth(NavBar, true)} />
            {/* <Route exact path="*" component={Auth(NavBar, null)} /> */}
          </Switch>
        </Col>
        <Col
          xs={24}
          lg={10}
          md={16}
          sm={24}
          className="col"
          style={{
            maxHeight: '100vh',
            overflow: 'auto',
            position: 'static',
          }}
        >
          <Drawer
            style={{
              position: 'absolute',
              float: 'right',
              marginRight: '20px',
            }}
          />
          <Switch>
            <Route exact path="/" component={Auth(Welcome, false)} />

            <Route exact path="/home" component={Auth(LandingPage, true)} />
            <Route
              exact
              path="/followingsBlog"
              component={Auth(FollowingPage, true)}
            />

            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/blog" component={Auth(BlogPage, true)} />
            <Route
              exact
              path="/blog/create"
              component={Auth(CreateBlogPage, true)}
            />
            <Route
              exact
              path="/blog/post/:postId"
              component={Auth(PostPage, false, true)}
            />
            <Route
              exact
              path="/profilepage/:userId"
              component={Auth(ProfilePage, true)}
            />
            <Route
              exact
              path="/searchpage"
              component={Auth(SearchPage, null)}
            />
            <Route
              exact
              path="/notification"
              component={Auth(Notification, true)}
            />

            <Route exact path="*" component={Auth(ErrorPage, false)} />
          </Switch>
          {/* <Footer /> */}
        </Col>
        <Col xs={0} md={0} sm={0} className="col" lg={8}>
          <Route exact path="/home" component={Auth(SearchPage, true)} />
          <Route
            exact
            path="/followingsBlog"
            component={Auth(SearchPage, true)}
          />
          <Route exact path="/blog/create" component={Auth(SearchPage, true)} />
          <Route
            exact
            path="/blog/post/:postId"
            component={Auth(SearchPage, false, true)}
          />
          <Route
            exact
            path="/profilepage/:userId"
            component={Auth(SearchPage, true)}
          />
          <Route
            exact
            path="/notification"
            component={Auth(SearchPage, true)}
          />
        </Col>
      </Row>
      <Footer />
    </Suspense>
  );
}

export default App;
