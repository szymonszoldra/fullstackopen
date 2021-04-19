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

describe('addition of a new blog', () => {
  test('succeds with valid data', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtTheEnd = await helper.blogsInDb();
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length + 1);

    const contents = blogsAtTheEnd.map(blog => blog.title);
    expect(contents).toContain('Canonical string reduction');
  });

  test('without likes property sets default value for likes to 0', async () => {
    const blogWithoutLikes = {
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    };

    await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blog = await Blog.findOne({ title: blogWithoutLikes.title });

    expect(blog.likes).toEqual(0);
  });

  test('with title or url missing will pursue to status 400', async () => {
    const blogWithMissingTitle = {
      author: 'Example Author',
      url: 'exampleURL.com',
      likes: 15
    };

    await api
      .post('/api/blogs')
      .send(blogWithMissingTitle)
      .expect(400);

    const blogWithMissingUrl = {
      author: 'Example Author',
      title: 'Example Blog',
      likes: 15
    };

    await api
      .post('/api/blogs')
      .send(blogWithMissingUrl)
      .expect(400);
  });
});

describe('deleting blog', () => {
  test('succeds with valid id', async () => {
    const blogsBefore = await Blog.countDocuments();

    await api
      .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
      .expect(200);

    const blogsAfter = await Blog.countDocuments();

    expect(blogsBefore - blogsAfter).toEqual(1);
  });

  test('fails with nonexistent id', async () => {
    await api
      .delete(`/api/blogs/${1233333}`)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

describe('updating blog', () => {
  test('succeds with valid id', async () => {
    const id = helper.initialBlogs[0]._id;
    const likes = 100;

    await api
      .put(`/api/blogs/${id}`)
      .send({ likes })
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const response = await Blog.findById(id);

    expect(response.likes).toEqual(likes);
  });

  test('fails with nonexistent id', async() => {
    await api
      .put('/api/blogs/12321313')
      .send({ likes: 1000 })
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });
});

afterAll(() => {
  mongoose.connection.close();
});