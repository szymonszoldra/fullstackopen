const mongoose = require('mongoose');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

const helper = require('./test_helper');

const app = require('../app');

const api = supertest(app);

let exampleUserToken;

beforeEach(async () => {
  await Blog.deleteMany({});
  const credentials = {
    username: 'testUser',
    name: 'test User',
    password: 'passwd'
  };

  await User.deleteMany({});

  await api.post('/api/users').send(credentials);

  const response = await api
    .post('/api/login')
    .send({ username: credentials.username, password: credentials.password });

  const exampleUser = jwt.verify(response.body.token, process.env.SECRET);

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog({ ...blog, user: exampleUser.id }));

  const user = await User.findById(exampleUser.id);

  const promiseArray = blogObjects.map(async (blog) => {
    blog.save();
    user.blogs = user.blogs.concat(blog.id);
  });
  await Promise.all(promiseArray);
  await user.save();
  exampleUserToken = response.body.token;
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
      .set('Authorization', `bearer ${exampleUserToken}`)
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
      .set('Authorization', `bearer ${exampleUserToken}`)
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
      .set('Authorization', `bearer ${exampleUserToken}`)
      .send(blogWithMissingTitle)
      .expect(400);

    const blogWithMissingUrl = {
      author: 'Example Author',
      title: 'Example Blog',
      likes: 15
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${exampleUserToken}`)
      .send(blogWithMissingUrl)
      .expect(400);
  });

  test('without the token fails', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtTheEnd = await helper.blogsInDb();
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('with invalid token fails', async () => {
    const newBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer x${exampleUserToken.substring(1)}`)
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtTheEnd = await helper.blogsInDb();
    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deleting blog', () => {
  test('succeds with valid id', async () => {
    const blogsBefore = await Blog.countDocuments();

    await api
      .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
      .set('Authorization', `bearer ${exampleUserToken}`)
      .expect(200);

    const blogsAfter = await Blog.countDocuments();

    expect(blogsBefore - blogsAfter).toEqual(1);
  });

  test('fails with nonexistent id', async () => {
    await api
      .delete(`/api/blogs/${1233333}`)
      .set('Authorization', `bearer ${exampleUserToken}`)
      .expect(400)
      .expect('Content-Type', /application\/json/);
  });

  test('fails without the token', async () => {
    const blogsBefore = await Blog.countDocuments();

    await api
      .delete(`/api/blogs/${helper.initialBlogs[0]._id}`)
      .expect(401);

    const blogsAfter = await Blog.countDocuments();

    expect(blogsBefore - blogsAfter).toEqual(0);
  });

  test('fails with invalid token', async () => {
    const blogsBefore = await Blog.countDocuments();

    await api
      .delete(`/api/blogs/${helper.initialBlogs[1]._id}`)
      .set('Authorization', `bearer x${exampleUserToken.substring(1)}`)
      .expect(401);

    const blogsAfter = await Blog.countDocuments();

    expect(blogsBefore - blogsAfter).toEqual(0);
  });

  test('with valid token that is not the author\'s token fails', async () => {
    const credentials = {
      username: 'testUser2',
      name: 'test User2',
      password: 'passwd'
    };
    await api.post('/api/users').send(credentials);

    const response = await api
      .post('/api/login')
      .send({ username: credentials.username, password: credentials.password });

    const blogsBefore = await Blog.countDocuments();

    const response2 =await api
      .delete(`/api/blogs/${helper.initialBlogs[2]._id}`)
      .set('Authorization', `bearer ${response.body.token}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAfter = await Blog.countDocuments();

    expect(blogsBefore - blogsAfter).toEqual(0);
    expect(response2.body.error).toContain('you do not have permission to delete this blog ');
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