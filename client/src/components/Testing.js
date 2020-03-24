import React, { Suspense } from 'react';
import { Col, Row } from 'antd';
import './testing.css';
import Navbar from '../Testing/NavBar/NavBar';
import Auth from '../hoc/auth';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './views/LandingPage/LandingPage';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import PostPage from './views/PostPage/PostPage';
import BlogPage from './views/BlogPage/BlogPage';
import CreateBlogPage from './views/BlogPage/Section.js/CreatePage';

function Testing() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Row>
        <Col md={0} sm={0} lg={6} className="col">
          <Navbar />
        </Col>
        <Col
          lg={12}
          md={32}
          sm={32}
          className="col"
          // style={{ background: 'black' }}
        >
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, null)} />
            <Route exact path="/testing" component={Auth(Testing, null)} />

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
        </Col>
        <Col
          md={0}
          sm={0}
          className="col"
          lg={6}
          // style={{ background: 'green' }}
        >
          3 col-order-2
        </Col>
      </Row>
    </Suspense>
  );
}

export default Testing;
