import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import { Col, Row } from 'antd';

// pages for this product
import SearchPage from './views/SearchPage/SearchPage';
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import PostPage from './views/PostPage/PostPage';
import BlogPage from './views/BlogPage/BlogPage';
import CreateBlogPage from './views/BlogPage/Section.js/CreatePage';
import Drawer from './views/RFC/Drawer/Drawer';
import FollowingPage from './views/Following/Following';
import ProfilePage from './views/ProfilePage/ProfilePage';
import EditProfile from './views/ProfilePage/sections/EditProfile';
import Welcome from './views/Welcome/index';
import Notification from './views/Notification/Notification';
import ErroPage from './views/Welcome/404';
import ErrorPage from './views/Welcome/404';
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
            {/* <Route exact path="/" component={Auth(Left, null)} /> */}

            <Route exact path="/home" component={Auth(NavBar, null)} />
            <Route
              exact
              path="/followingsBlog"
              component={Auth(NavBar, null)}
            />
            <Route exact path="/blog" component={Auth(NavBar, null)} />
            <Route exact path="/blog/create" component={Auth(NavBar, null)} />
            <Route
              exact
              path="/blog/post/:postId"
              component={Auth(NavBar, null)}
            />
            <Route
              exact
              path="/profilepage/:userId"
              component={Auth(NavBar, null)}
            />
            <Route exact path="/searchpage" component={Auth(NavBar, null)} />
            <Route exact path="/notification" component={Auth(NavBar, null)} />
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

            <Route exact path="/home" component={Auth(LandingPage, null)} />
            <Route
              exact
              path="/followingsBlog"
              component={Auth(FollowingPage, null)}
            />

            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route
              exact
              path="/register"
              component={Auth(RegisterPage, false)}
            />
            <Route exact path="/blog" component={Auth(BlogPage, null)} />
            <Route
              exact
              path="/blog/create"
              component={Auth(CreateBlogPage, null)}
            />
            <Route
              exact
              path="/blog/post/:postId"
              component={Auth(PostPage, null)}
            />
            <Route
              exact
              path="/profilepage/:userId"
              component={Auth(ProfilePage, null)}
            />
            <Route
              exact
              path="/searchpage"
              component={Auth(SearchPage, null)}
            />
            <Route
              exact
              path="/notification"
              component={Auth(Notification, null)}
            />

            <Route exact path="*" component={Auth(ErrorPage, false)} />
          </Switch>
          {/* <Footer /> */}
        </Col>
        <Col xs={0} md={0} sm={0} className="col" lg={8}>
          <Route exact path="/home" component={Auth(SearchPage, null)} />
          <Route
            exact
            path="/followingsBlog"
            component={Auth(SearchPage, null)}
          />
          <Route exact path="/blog/create" component={Auth(SearchPage, null)} />
          <Route
            exact
            path="/blog/post/:postId"
            component={Auth(SearchPage, null)}
          />
          <Route
            exact
            path="/profilepage/:userId"
            component={Auth(SearchPage, null)}
          />
          <Route
            exact
            path="/notification"
            component={Auth(SearchPage, null)}
          />
        </Col>
      </Row>
      <Footer />
    </Suspense>
  );
}

export default App;
