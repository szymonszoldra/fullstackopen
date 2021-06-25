import React, { useState } from 'react';
import blogService from '../../services/blogs';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeBlog } from '../../redux/reducers/blogReducer';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Blog = ({ blog, loggedUser }) => {
  const [likes, setLikes] = useState(blog.likes);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const addLike = async () => {
    try {
      const response = await blogService.addLike(blog);
      blog.likes = response.likes;
      setLikes(response.likes);
    } catch (exception) {
      console.error('Error : ', exception);
    }
  };

  const deleteBlog = async () => {
    if (window.confirm('Are you sure?')) {
      await blogService.remove(blog.id);
      dispatch(removeBlog(blog.id));
      history.push('/');
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    if (!comment) {
      return;
    }

    await axios.post(`/api/blogs/${blog.id}/comments`, { content: comment });
    blog.comments = blog.comments.concat(comment);
    console.log();
    setComment('');
  };

  const hasUserCreatedThatBlog = blog.user.username === loggedUser;

  return (
    <>
      <div style={blogStyle} className="blog">
        <p>
          {blog.title} {blog.author}
        </p>
        <p>
          {blog.url}
        </p>
        <p>
        likes <span className="number-of-likes">{likes}</span>{' '}<button onClick={addLike}>like</button>
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
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input type="text" value={comment} name="commentinput" onChange={(e) => setComment(e.target.value)} /><button>add comment</button>
      </form>
      <ul>
        {blog.comments.map(comment => <li key={comment + blog.id}>{comment}</li>)}
        {blog.comments.length === 0 ? 'No comments for this blog!' : null}
      </ul>
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object,
  loggedUser: PropTypes.string.isRequired
};

export default Blog;