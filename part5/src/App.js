import React, { useState, useEffect, useRef } from 'react';

import Blog from './components/blog/Blog.component';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import BlogForm from './components/blogForm/BlogForm.component';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    async function getBlogs() {
      try {
        const fetchedBlogs = await blogService.getAll();
        setBlogs(fetchedBlogs.sort((a, b) => b.likes - a.likes));
      } catch (exception) {
        console.error('Error: ', exception);
      }
    }
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
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
      setUser(user);
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
      setBlogs(blogs.concat(newBlog));
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
    setUser(null);
    sendMessage('you are now logged out', true);
  };

  const sendMessage = (content, positive) => {
    setMessage({
      content,
      positive
    });

    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
        <Notification message={message} />
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
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={logout}>log out</button></p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm handleAddNewBlog={handleAddNewBlog} />
      </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} loggedUser={user.username} />
      )}
    </div>
  );
};

export default App;