import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { ALL_AUTHORS, CHANGE_YEAR } from '../graphql';


const Authors = (props) => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');

  const authors = useQuery(ALL_AUTHORS);

  const [changeYear] = useMutation(CHANGE_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS} ]
  });

  if (!props.show) {
    return null;
  }
  
  if (authors.loading)  {
    return <div>loading...</div>
  }

  const handleUpdate = (e) => {
    e.preventDefault();

    changeYear({ variables: { name, year}});

    setName('');
    setYear('');
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={handleUpdate}>
        <p>name<input type="text" value={name} onChange={(e) => setName(e.target.value)}/></p>
        <p>born<input type="number" value={year} onChange={(e) => setYear(Number(e.target.value))}/></p>
        <button>update</button>
      </form>
    </div>
  );
};

export default Authors;
