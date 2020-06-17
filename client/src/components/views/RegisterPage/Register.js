import React, { useState } from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../../_actions/user_actions';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import il from '../Theme/il.png';
import logo from '../NavBar/Sections/Logo.png';

import { Form, Input, Button, message } from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="welcome_container">
      <nav>
        <div id="logo" style={{ fontSize: 'large' }}>
          <img src={logo} className="image" />
          <span
            className="logo_text"
            style={{
              marginLeft: '-10px',
            }}
          >
            {' '}
            FUPREPEEPs
          </span>
        </div>
        <div id="btn-section"></div>
      </nav>
      <main>
        <div
          className="welcome x"
          style={{
            margin: '-10vh 0 0 0',
            padding: '0 10px',
            // maxHeight: '40vh',
          }}
        >
          <Formik
            initialValues={{
              email: '',
              username: '',
              name: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required('Name is required'),
              username: Yup.string().required('User Name is required'),
              email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
              password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Confirm Password is required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setLoading(true);
                let dataToSubmit = {
                  email: values.email,
                  password: values.password,
                  name: values.name,
                  username: values.username,
                  image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
                };

                dispatch(registerUser(dataToSubmit))
                  .then((response) => {
                    setLoading(false);
                    if (response.payload.success) {
                      props.history.push('/login');
                    } else {
                      message.error(response.payload.msg);
                      // alert(response.payload.msg);
                    }
                  })
                  .catch((e) => console.log(e));

                setSubmitting(false);
              }, 500);
            }}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                // dirty,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit,
                // handleReset,
              } = props;
              return (
                <div
                  // className="app"
                  style={
                    {
                      // alighItems: 'center',
                      // paddingTop: '10vh',
                    }
                  }
                >
                  <Form
                    style={{ minWidth: '375px' }}
                    // className="signup-form"
                    {...formItemLayout}
                    onSubmit={handleSubmit}
                  >
                    <h2>Sign up</h2>
                    <Form.Item required label="Name">
                      <Input
                        id="name"
                        placeholder="Enter your name"
                        type="text"
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.name && touched.name
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.name && touched.name && (
                        <div className="input-feedback">{errors.name}</div>
                      )}
                    </Form.Item>
                    <Form.Item required label="User Name">
                      <Input
                        id="username"
                        placeholder="Enter your User Name"
                        type="text"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.username && touched.username
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.username && touched.username && (
                        <div className="input-feedback">{errors.username}</div>
                      )}
                    </Form.Item>
                    <Form.Item
                      required
                      label="Email"
                      hasFeedback
                      validateStatus={
                        errors.email && touched.email ? 'error' : 'success'
                      }
                    >
                      <Input
                        id="email"
                        placeholder="Enter your Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.email && touched.email && (
                        <div className="input-feedback">{errors.email}</div>
                      )}
                    </Form.Item>
                    <Form.Item
                      required
                      label="Password"
                      hasFeedback
                      validateStatus={
                        errors.password && touched.password
                          ? 'error'
                          : 'success'
                      }
                    >
                      <Input
                        id="password"
                        placeholder="Enter your password"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.password && touched.password && (
                        <div className="input-feedback">{errors.password}</div>
                      )}
                    </Form.Item>
                    <Form.Item required label="Confirm" hasFeedback>
                      <Input
                        id="confirmPassword"
                        placeholder="Enter your confirmPassword"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.confirmPassword && touched.confirmPassword
                            ? 'text-input error'
                            : 'text-input'
                        }
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <div className="input-feedback">
                          {errors.confirmPassword}
                        </div>
                      )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button
                        onClick={handleSubmit}
                        type="primary"
                        disabled={isSubmitting}
                        loading={loading}
                        disabled={loading}
                      >
                        Submit
                      </Button>
                      <span
                        style={{
                          fontSize: '1.3rem',
                        }}
                      >
                        {/* If you have an Account */}
                        <Link to="/login">Or Login now!</Link>
                      </span>
                    </Form.Item>
                  </Form>
                </div>
              );
            }}
          </Formik>
        </div>
        <div className="illustration">
          <img
            src={il}
            style={{
              maxHeight: '70vh',
              maxWidth: '70vw',
              marginRight: '10vw',
            }}
          />
        </div>
      </main>
    </div>
  );
}

export default RegisterPage;
