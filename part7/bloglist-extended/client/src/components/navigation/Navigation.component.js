import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = ({ logout }) => {
  const user = useSelector(state => state.currentUser);
  return (
    <div>
      <Link to='/'>
        <p> blogs </p>
      </Link>
      <Link to='/users'>
        <p> users </p>
      </Link>
      <p>{user.name} logged in <button onClick={logout}>log out</button></p>
    </div>
  );
};

export default Navigation;