const types = {
  LOGIN: 'LOGIN'
};

export const loginUser = (user) => {
  return {
    type: types.LOGIN,
    data: user
  };
};

const currentUserReducer = (state = null, action) => {
  switch(action.type) {
  case types.LOGIN:
    return action.data;
  default:
    return state;
  }
};

export default currentUserReducer;