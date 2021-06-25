import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  background-color: lightgray;
`;

const Navigation = ({ logout }) => {
  const user = useSelector(state => state.currentUser);
  return (
    <NavigationContainer>
      <Link to='/'>
        <p> blogs </p>
      </Link>
      <Link to='/users'>
        <p> users </p>
      </Link>
      <p>{user.name} logged in <button onClick={logout}>log out</button></p>
    </NavigationContainer>
  );
};

export default Navigation;