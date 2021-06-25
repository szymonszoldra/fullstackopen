import React from 'react';
import { Link } from 'react-router-dom';
const Users = ({ users = [] }) => {
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map(user => {
          return (
            <Link key={user.id} to={`/users/${user.id}`}>
              <li key={user.id}>{user.name} added {user.blogs.length} blogs</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;