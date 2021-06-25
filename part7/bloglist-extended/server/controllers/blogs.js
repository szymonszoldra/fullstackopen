const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { tokenExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 } );
  response.json(blogs);
});

blogsRouter.post('/', tokenExtractor, async (request, response) => {
  const { user } = request;

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

blogsRouter.delete('/:id', tokenExtractor, async (request, response) => {
  const { user } = request;

  const blog = await Blog.findById(request.params.id);

  if (blog?.user?.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'you do not have permission to delete this blog ' });
  }

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