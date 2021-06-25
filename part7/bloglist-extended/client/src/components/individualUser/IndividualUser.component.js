import React from 'react';

const IndividualUser = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div>
      <h3>{user.name}</h3>
      <h5>added blogs</h5>
      <ul>
        {user.blogs.map(blog => {
          return <li key={blog.id}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default IndividualUser;