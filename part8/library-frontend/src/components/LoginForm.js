import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql'

const LoginForm = ({ show, setError, setToken }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
  });

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('phonenumbers-user-token', token);
    }
  }, [result.data]); // eslint-disable-line

  const handleLogin = (event) => {
    event.preventDefault();
    login({ variables: { username: name, password } });
    setName('');
    setPassword('');
  };

  if (!show) {
    return null;
  }
  return (
    <form onSubmit={handleLogin}>
      <p>name:     <input value={name} onChange={(e) => setName(e.target.value)}/></p>
      <p>password: <input value={password} onChange={(e) => setPassword(e.target.value)}/></p>
      <button>login</button>
    </form>
  )
};

export default LoginForm;