import React, { useState } from 'react';
import moment from 'moment';
import { Formik } from 'formik';
import { registerUser } from '../../../../_actions/user_actions';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import { Form, Button, message } from 'antd';

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

function Forme(props) {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(props);
  return (
    <div>
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
                  message.success('User Created');
                  history.push('/login');
                } else {
                  message.error(response.payload.msg);
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
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <div>
              <form onSubmit={handleSubmit} className="register_form">
                <h2>Sign up</h2>
                <input
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
                <input
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
                {/* {errors.email && touched.email ? 'error' : 'success'} */}
                <input
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
                {/* {errors.password && touched.password ? 'error' : 'success'} */}
                <input
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
                <input
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
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
                <Button
                  onClick={handleSubmit}
                  type="primary"
                  disabled={isSubmitting}
                  loading={loading}
                  disabled={loading}
                  size="large"
                  style={{
                    fontSize: '1.5rem',
                  }}
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
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

export default Forme;
