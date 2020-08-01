import React from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function (ComposedClass, isAuth = false, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    let user = useSelector((state) => state);
    const userId = localStorage.getItem('rememberMe');
    if (isAuth) {
      if (!user.user.loginSucess && !userId) {
        history.push('/');
      }
      if (!user.user.loginSuccess && userId) {
        dispatch(auth({ userId: userId }));
      }
    } else {
      if (user.user.loginSuccess) {
        history.push('/home');
      }
      if (!user.user.loginSuccess && userId) {
        dispatch(auth({ userId: userId }));
      }
    }

    return <ComposedClass {...props} user={user} />;
  }
  return AuthenticationCheck;
}
