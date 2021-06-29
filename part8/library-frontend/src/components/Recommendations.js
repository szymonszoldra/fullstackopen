import React, { useState, useEffect } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import { FAVORITE_GENRE, FAV_GENRE_MATCHING_BOOKS } from '../graphql';

const Recommendations = (props) => {
  const [matchingBooks, setMatchingBooks] = useState([]);
  const favGenreQuery = useQuery(FAVORITE_GENRE);
  const [getMatchingBooks, matchingBooksResult] = useLazyQuery(FAV_GENRE_MATCHING_BOOKS);

  useEffect(() => {
    if ( !favGenreQuery.loading ) {
      getMatchingBooks({ variables: { genreToSearch: favGenreQuery.data.me?.favoriteGenre }});
    }
    // eslint-disable-next-line
  }, [favGenreQuery]); 

  useEffect(() => {
    if (matchingBooksResult.data) {
      setMatchingBooks(matchingBooksResult.data.allBooks);
    }
  }, [matchingBooksResult]);

  if ( !props.show ) {
    return null;
  }

  if ( favGenreQuery.loading ) {
    return <div>loading...</div>
  }

  if (!matchingBooks.length) {
    return (
      <div>
        <h2>recommendations</h2>
        <p>there is no books in your favorite genre <strong>{favGenreQuery.data.me?.favoriteGenre}</strong> : (</p>
      </div>
    )
  }

  return ( 
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{favGenreQuery.data.me?.favoriteGenre}</strong></p>
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
          {matchingBooks.map(a =>
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
}
 
export default Recommendations;