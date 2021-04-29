import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ handleAddNewBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const formHandler = (event) => {
    event.preventDefault();
    handleAddNewBlog({
      title,
      author,
      url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <form onSubmit={formHandler}>
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
  )
}

BlogForm.propTypes = {
  handleAddNewBlog: PropTypes.func.isRequired
}

export default BlogForm;