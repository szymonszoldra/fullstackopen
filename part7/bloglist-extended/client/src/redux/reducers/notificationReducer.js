const types = {
  DISPLAY_NOTIFICATION: 'DISPLAY_NOTIFICATION',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION'
};

let id = null;

export const displayNotification = (content, positive) => {
  return dispatch => {
    if (id) {
      clearTimeout(id);
    }

    dispatch({
      type: types.DISPLAY_NOTIFICATION,
      data: {
        content,
        positive
      }
    });

    id = setTimeout(() => dispatch(hideNotification()), 5000);
  };
};

export const hideNotification = () => {
  id = null;
  return {
    type: types.HIDE_NOTIFICATION
  };
};

const notificationReducer = (state = null, action) => {
  switch(action.type) {
  case types.DISPLAY_NOTIFICATION:
    return action.data;
  case types.HIDE_NOTIFICATION:
    return null;
  default:
    return state;
  }
};

export default notificationReducer;