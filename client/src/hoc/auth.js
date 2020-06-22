import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from 'react-redux';

export default function (ComposedClass, reload, adminRoute = null) {
  function AuthenticationCheck(props) {
    let user = useSelector((state) => state.user);
    localStorage.setItem('user', user);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then(async (response) => {
        console.log(response.payload);

        if (await !response.payload.isAuth) {
          if (reload) {
            props.history.push('/register');
          }
        } else {
          console.log('user has not auth');

          if (adminRoute && !response.payload.isAdmin) {
            props.history.push('/home');
          } else {
            if (reload === false) {
              props.history.push('/home');
            }
          }
        }
        console.log('user has should be auth');
      });
    }, [dispatch, props.history, user.googleAuth]);

    return <ComposedClass {...props} user={user} />;
  }
  return AuthenticationCheck;
}
