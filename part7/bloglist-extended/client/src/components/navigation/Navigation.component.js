import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const NavigationContainer = styled.div`
  display: flex;
  background-color: lightgray;
  margin-bottom: 20px;
  font-weight: bold;
  p {
    margin-left: 20px;
    span {
      color: green;
    }
  }

  p:hover {
    transform: scale(1.1);
  }
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
      <p><span>{user.name}</span> logged in <button onClick={logout}>log out</button></p>
    </NavigationContainer>
  );
};

export default Navigation;