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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

