const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization?.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }

  return null;
};

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 } );
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken?.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  console.log(decodedToken);
  const user = await User.findById(decodedToken.id);
  console.log(user);
  const data = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0,
    user: user._id
  };

  const blog = new Blog(data);
  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(200).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { likes } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(id, { likes }, { new: true });
  response.json(updatedBlog);
});

module.exports = blogsRouter;