import React, { useState } from 'react'
const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
        likes {blog.likes} <button>like</button>
      </p>
      <p>
        {blog.user.name}
      </p>
    </div> 
  )

   
}

export default Blog