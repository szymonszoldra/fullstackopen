const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');

const helper = require('./test_helper');

const app = require('../app');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog));

  const promiseArray = blogObjects.map(blog => blog.save());
  await Promise.all(promiseArray);
});

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs');

    const contents = response.body.map(blog => blog.title);
    expect(contents).toContain('React patterns');
  });

  test('blog has id property', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });
});

afterAll(() => {
  mongoose.connection.close();
});