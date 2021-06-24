const types = {
  DISPLAY_NOTIFICATION: 'DISPLAY_NOTIFICATION',
  HIDE_NOTIFICATION: 'HIDE_NOTIFICATION'
}

let id = null;

export const displayNotification = (message, time) => {
  return dispatch => {
    if (id) {
      clearTimeout(id);
    }
  
    dispatch({
      type: types.DISPLAY_NOTIFICATION,
      data: message
    });
    
    id = setTimeout(() => dispatch(hideNotification()), time * 1000);
  };
};

export const hideNotification = () => {
  id = null;
  return {
    type: types.HIDE_NOTIFICATION
  };
};

const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case types.DISPLAY_NOTIFICATION:
      return action.data;
    case types.HIDE_NOTIFICATION:
      return '';
    default:
      return state;
  }
};

export default notificationReducer;