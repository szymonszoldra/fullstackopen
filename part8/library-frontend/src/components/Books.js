import React, { useState, useEffect } from 'react';
import { useQuery, useSubscription } from '@apollo/client';

import { ALL_BOOKS, BOOK_ADDED } from '../graphql';

const Books = (props) => {
  const [uniqueGenres, setUniqueGenres ] = useState([]);
  const [currentGenre, setCurrentGenre] = useState('all genres');
  const books = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (!books.loading) {
      const temp = [];
      books.data.allBooks.forEach(book => temp.push(...book.genres));
      setUniqueGenres([...new Set(temp)]);
    }
  }, [books]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
      alert('NEW BOOK ADDED');
    }
  });

  if (!props.show) {
    return null;
  }

  if (books.loading)  {
    return <div>loading...</div>
  }

  const booksToShow = currentGenre === 'all genres'
    ? books.data.allBooks
    : books.data.allBooks.filter(book => book.genres.includes(currentGenre));

  return (
    <div>
      <h2>books</h2>
      <button onClick={() => setCurrentGenre('all genres')}>all genres</button>
      {uniqueGenres.map(genre => (
        <button key={genre} onClick={() => setCurrentGenre(genre)}>{genre}</button>
      ))}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.Author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Books;