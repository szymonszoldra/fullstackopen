import React, { useState } from 'react';
import blogService from '../../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, blogs, setBlogs, loggedUser }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  // In the excercise it was said that I have to send the whole blog object
  // but it seems that I implemented the backend controller differently.
  const addLike = async () => {
    try {
      const response = await blogService.addLike(blog);
      blog.likes = response.likes;
      setLikes(response.likes);
    } catch (exception) {
      console.error('Error : ', exception);
    }
  };

  if (!showDetails) {
    return (
      <div style={blogStyle}>
        <p>
          {blog.title} {blog.author} <button onClick={() => setShowDetails(true)}>view</button>
        </p>
      </div>
    );
  }

  const deleteBlog = async () => {
    if (window.confirm('Are you sure?')) {
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  const hasUserCreatedThatBlog = blog.user.username === loggedUser;

  return (
    <div style={blogStyle}>
      <p>
        {blog.title} {blog.author} <button onClick={() => setShowDetails(false)}>hide</button>
      </p>
      <p>
        {blog.url}
      </p>
      <p>
        likes {likes} <button onClick={addLike}>like</button>
      </p>
      <p>
        {blog.user.name}
      </p>
      {
        hasUserCreatedThatBlog
          ? <button onClick={deleteBlog}>remove</button>
          : null
      }

    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired
};

export default Blog;