import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
import { Col, Row } from 'antd';

// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import PostPage from './views/PostPage/PostPage';
import BlogPage from './views/BlogPage/BlogPage';
import CreateBlogPage from './views/BlogPage/Section.js/CreatePage';
import Drawer from './views/RFC/Drawer/Drawer';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Row>
        <Col xs={0} sm={0} md={8} lg={6} className="col">
          <NavBar />
        </Col>
        <Col
          xs={24}
          lg={10}
          md={16}
          sm={24}
          className="col"
          // style={{ background: 'black' }}
        >
          <Drawer />
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />

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
          </Switch>
          {/* <Footer /> */}
        </Col>
        <Col
          xs={0}
          md={0}
          sm={0}
          className="col"
          lg={8}
          // style={{ background: 'green' }}
        >
          3 col-order-2
        </Col>
      </Row>
    </Suspense>
  );
}

export default App;
