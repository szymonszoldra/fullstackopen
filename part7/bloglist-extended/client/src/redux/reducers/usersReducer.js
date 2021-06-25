import usersService from '../../services/users';

const types = {
  INIT_USERS: 'INIT_USERS'
};

export const initUsers = () => {
  return async dispatch => {
    const users = await usersService.getAllUsers();
    dispatch({
      type: types.INIT_USERS,
      data: users
    });
  };
};

const usersReducer = (state = [], action) => {
  switch(action.type) {
  case types.INIT_USERS:
    return action.data;
  default:
    return state;
  }
};

export default usersReducer;