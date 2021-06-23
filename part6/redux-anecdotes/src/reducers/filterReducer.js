const types = {
  SET_FILTER: 'SET_FILTER'
};

export const setFilter = (filter) => {
  return {
    type: types.SET_FILTER,
    data: filter
  };
};

const filterReducer = (state = '', action) => {
  switch(action.type) {
    case types.SET_FILTER:
      return action.data
    default:
      return state;
  };
};

export default filterReducer;