// just for task purpose
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (acc, post) => acc + post.likes;

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {

  if (!blogs.length) return { };

  const reducer = (max, blog) => Math.max(max, blog.likes);
  const { title, author, likes } =  blogs.find((blog) => blog.likes === blogs.reduce(reducer, 0));

  return { title, author, likes };
};

const mostBlogs = (blogs) => {
  if (!blogs.length) return {};

  // Unnecessary, function will work correctly but there's no reason to do rest of the code if I can return it at the beginning.
  if (blogs.length === 1) return {
    author: blogs[0].author,
    blogs: 1
  };

  const authors = {};

  blogs.forEach((blog) => {
    if (blog.author in authors ) {
      authors[blog.author]++;
    } else {
      authors[blog.author] = 1;
    }
  });

  // Simple JavaScript sort, author with most blogs will be at index of 0.
  const authorWithMostBlogs = Object.keys(authors).sort((a, b) => authors[b] - authors[a])[0];

  return {
    author: authorWithMostBlogs,
    blogs: authors[authorWithMostBlogs]
  };
};

const mostLikes = (blogs) => {
  if (!blogs.length) return {};

  // Unnecessary, function will work correctly but there's no reason to do rest of the code if I can return it at the beginning.
  if (blogs.length === 1) return {
    author: blogs[0].author,
    likes: blogs[0].likes
  };

  const authors = {};

  blogs.forEach((blog) => {
    if (blog.author in authors ) {
      authors[blog.author]+= blog.likes;
    } else {
      authors[blog.author] = blog.likes;
    }
  });

  // Simple JavaScript sort, author with most likes will be at index of 0.
  const authorWithMostLikes = Object.keys(authors).sort((a, b) => authors[b] - authors[a])[0];

  return {
    author: authorWithMostLikes,
    likes: authors[authorWithMostLikes]
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

