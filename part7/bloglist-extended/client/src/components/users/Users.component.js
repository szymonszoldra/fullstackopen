import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initUsers } from '../../redux/reducers/usersReducer';

const Users = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUsers());
  }, []);


  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map(user => {
          return <li key={user.id}>{user.name} added {user.blogs.length} blogs</li>;
        })}
      </ul>
    </div>
  );
};

export default Users;