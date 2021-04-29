import React, { useState } from 'react'
import blogService from '../services/blogs';

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = async () => {
    try {
      const response = await blogService.addLike(blog);
      blog.likes = response.likes;
      setLikes(response.likes);
    } catch (exception) {
      console.error('Error : ', exception);
    }
  }

  if (!showDetails) {
    return (
      <div style={blogStyle}>
        <p>
         {blog.title} {blog.author} <button onClick={() => setShowDetails(true)}>view</button>
        </p>
      </div> 
    )
  }

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
    </div> 
  )

   
}

export default Blog