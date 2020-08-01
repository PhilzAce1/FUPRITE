import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from '../_actions/types';

const initialState = {
  loginSuccess: false,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER: {
      const newState = { ...state };
      if (!action.payload.success) {
        return newState;
      }
      newState.loginSuccess = action.payload.success;
      newState.userID = action.payload.user._id;
      newState.email = action.payload.user.email;
      newState.name = action.payload.user.name;
      newState.username = action.payload.user.username;
      newState.image = action.payload.user.image;
      newState.role = action.payload.user.role;
      newState.notification = action.payload.user.notification;
      return newState;
    }

    case LOGIN_USER: {
      const newState = { ...state };
      if (!action.payload.loginSuccess) {
        return newState;
      }
      newState.loginSuccess = action.payload.loginSuccess;
      newState.userID = action.payload.user._id;
      newState.email = action.payload.user.email;
      newState.name = action.payload.user.name;
      newState.username = action.payload.user.username;
      newState.image = action.payload.user.image;
      newState.role = action.payload.user.role;
      newState.notification = action.payload.user.notification;
      return newState;
    }

    case AUTH_USER: {
      const newState = { ...state };
      if (!action.payload.success) {
        return newState;
      }
      const payload = action.payload.user[0];
      newState.loginSuccess = action.payload.success;
      newState.userID = payload._id;
      newState.email = payload.email;
      newState.name = payload.name;
      newState.username = payload.username;
      newState.image = payload.image;
      newState.role = payload.role;
      newState.notification = payload.notification;
      return newState;
    }
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
