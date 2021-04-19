const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
  const data = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes ? request.body.likes : 0
  };

  const blog = new Blog(data);
  const savedBlog = await blog.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
  console.log(request.params);
  const x = await Blog.findByIdAndDelete(request.params.id);
  console.log(x);
  response.status(200).end();
});

module.exports = blogsRouter;