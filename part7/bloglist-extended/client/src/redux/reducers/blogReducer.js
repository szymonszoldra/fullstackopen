import blogService from '../../services/blogs';

const types = {
  INIT: 'INIT',
  ADD_BLOG: 'ADD_BLOG'
};

export const initBlogs = () => {
  return async dispatch => {
    let fetchedBlogs;
    try {
      fetchedBlogs = await blogService.getAll();
    } catch (e) {
      console.log('ERROR FETCHING BLOGS');
    }

    dispatch({
      type: types.INIT,
      data: fetchedBlogs.sort((a, b) => b.likes - a.likes)
    });
  };
};

export const addBlog = (newBlog) => {
  return {
    type: types.ADD_BLOG,
    data: newBlog
  };
};



const blogsReducer = (state = [], action) => {
  switch(action.type) {
  case types.INIT:
    return action.data;
  case types.ADD_BLOG:
    return state.concat(action.data);
  default:
    return state;
  }
};

export default blogsReducer;