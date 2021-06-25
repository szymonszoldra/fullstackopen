import React, { useState, useEffect, useRef } from 'react';

import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { displayNotification } from './redux/reducers/notificationReducer';
import { initBlogs, addBlog } from './redux/reducers/blogReducer';
import { loginUser } from './redux/reducers/currentUserReducer';
import { initUsers } from './redux/reducers/usersReducer';

import Blog from './components/blog/Blog.component';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/blogForm/BlogForm.component';
import Users from './components/users/Users.component';
import IndividualUser from './components/individualUser/IndividualUser.component';
import Navigation from './components/navigation/Navigation.component';

// import GlobalStyle from './globalStyles';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const blogFormRef = useRef();

  const user = useSelector(state => state.currentUser);
  const blogs = useSelector(state => state.blogs);
  const users = useSelector(state => state.users);

  useEffect(() => {
    dispatch(initUsers());
    dispatch(initBlogs());
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(loginUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username, password,
      });

      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      );

      blogService.setToken(user.token);
      dispatch(loginUser(user));
      setUsername('');
      setPassword('');
      sendMessage('you are now logged in', true);
    } catch (exception) {
      sendMessage('Wrong credentials', false);
      console.error('Error : ', exception);
    }
  };

  const handleAddNewBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(addBlog(newBlog));
      blogFormRef.current.toggleVisibility();
      sendMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`, true);
    } catch (exception) {
      sendMessage('Something went wrong', false);
      console.error('Error : ', exception.message);
    }
  };

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    blogService.setToken(null);
    dispatch(loginUser(null));
    sendMessage('you are now logged out', true);
  };

  const sendMessage = (content, positive) => {
    dispatch(displayNotification(content, positive));
  };

  let match = useRouteMatch('/users/:id');
  const userInfo = match
    ? users.find(u => u.id === match.params.id)
    : null;

  match = useRouteMatch('/blogs/:id');
  const blogInfo = match
    ? blogs.find(b => b.id === match.params.id)
    : null;

  if (user === null) {
    return (
      <>
        {/* <GlobalStyle /> */}
        <form onSubmit={handleLogin}>
          <Notification />
          <h2>log in to application</h2>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  }

  return (
    <div>
      {/* <GlobalStyle /> */}
      <h2>blogs</h2>
      <Notification />
      <Navigation logout={logout}/>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleAddNewBlog={handleAddNewBlog} />
      </Togglable>
      <Switch>
        <Route path='/blogs/:id'>
          {blogInfo && <Blog blog={blogInfo} loggedUser={user.username} />}
        </Route>
        <Route path='/users/:id'>
          <IndividualUser user={userInfo} />
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
        <Route path='/'>
          {blogs.map(blog =>
            <Link key={blog.id} to={`/blogs/${blog.id}`}>
              <li style={{
                paddingTop: 10,
                paddingLeft: 2,
                border: 'solid',
                borderWidth: 1,
                marginBottom: 5
              }}>{blog.title}</li>
            </Link>
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;