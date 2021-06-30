require('dotenv').config();
const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub  } = require('apollo-server');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
  })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const pubsub = new PubSub();

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    Author: Author!
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) =>  {
      const books = await Book.find({}).populate('Author', { name: 1, born: 1});
      return books
                .filter(book => book.Author.name === args.author || !args.author)
                .filter(book => book.genres.includes(args.genre) || !args.genre);
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },

  Author: {
    bookCount: async (root) => root.books.length
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if ( !context.currentUser ) {
        throw new AuthenticationError('This action can be perform only by signed users!');
      }

      let author = await Author.findOne({ name: args.author });
      
      if ( !author ) {
        author = new Author({
          name: args.author,
          born: null
        });
        
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          });
        }
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        Author: author._id,
        genres: args.genres
      });

      author.books = author.books.concat(book._id);
      try {
        await author.save();
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        });
      }

      const b = await Book.findById(book._id).populate('Author', { name: 1, born: 1})
      pubsub.publish('BOOK_ADDED', { bookAdded: b})
      return b;
    },

    editAuthor: async (root, args, context) => {
      if ( !context.currentUser ) {
        throw new AuthenticationError('This action can be perform only by signed users!');
      }

      const author = await Author.findOne({ name: args.name });
      
      if ( !author ) {
        return null;
      }

      author.born = args.setBornTo;
      
      await author.save();

      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      });
      try {
        return user
          .save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
  
      // hashing wasn't part of the exercise
      // >>>> Like in the course material, you can assume all users have the same hardcoded password <<<<
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials');
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      };
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      let decodedToken;
      try {
        decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      } catch (err) {
        return null;
      }
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  }
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})