import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function (ComposedClass, isAuth = false, adminRoute = null) {
  function AuthenticationCheck(props) {
    useEffect(authChecker, []);
    const dispatch = useDispatch();
    const history = useHistory();
    let user = useSelector((state) => state);
    const userId = localStorage.getItem('rememberMe');

    function authChecker() {
      if (isAuth) {
        if (!user.user.loginSuccess && !userId) {
          history.push('/');
        } else if (!user.user.loginSuccess && userId) {
          dispatch(auth({ userId: userId }));
        }
      } else if (!isAuth) {
        if (user.user.loginSuccess) {
          history.push('/home');
        } else if (!user.user.loginSuccess && userId) {
          dispatch(auth({ userId: userId }));
        }
      }
    }

    return <ComposedClass {...props} user={user} />;
  }
  return AuthenticationCheck;
}
