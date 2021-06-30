import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name,
      born,
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title,
      Author {
        name
      }
      published
      genres
    }
  }
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      Author {
        name
      }
      published
    }
  }
`;

export const CHANGE_YEAR = gql`
  mutation changeYear($name: String!, $year: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $year
    ) {
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

// 8.21 books by genre with GraphQL done in 8.20 already

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    Author {
      name
    }
    published
    genres
    id
  }
`;

export const FAV_GENRE_MATCHING_BOOKS = gql`
  query findBook($genreToSearch: String!){
    allBooks(
      genre: $genreToSearch
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }

  }
    ${BOOK_DETAILS}
`;