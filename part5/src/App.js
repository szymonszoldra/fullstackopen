import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getBlogs() {
      try {
        const fetchedBlogs = await blogService.getAll();
        setBlogs(fetchedBlogs);
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
    } catch (exception) {
      console.error('Error : ', exception);
    }
  }

  const handleAddNewBlog = async (event) => {
    event.preventDefault();

    try {
      const newBlog = await blogService.create({
        title, author, url
      });

      setBlogs(blogs.concat(newBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
    } catch (exception) {
      console.error('Error : ', exception);
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBloglistUser');
    blogService.setToken(null);
    setUser(null);
  }

  if (user === null) {
    return (
      <form onSubmit={handleLogin}>
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
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={logout}>log out</button></p>
      <form onSubmit={handleAddNewBlog}>
      <h2>create new</h2>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>      
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App