const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', name:'root root', passwordHash });

    await user.save();
  });

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe('adding new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('secret', 10);
    const user = new User({ username: 'root', name:'root root', passwordHash });

    await user.save();
  });

  test('without username or password returns suitable status code and fails', async () => {
    const usersAtStart = await helper.usersInDb();

    const noPassword = {
      username: 'noPasswordUser',
      name: 'No Pass'
    };

    await api
      .post('/api/users')
      .send(noPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const noUsername = {
      name: 'No Username',
      password: 'passwd'
    };

    await api
      .post('/api/users')
      .send(noUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('with password od username shorter than 3 chars fails', async () => {
    const usersAtStart = await helper.usersInDb();

    const tooShortName = {
      username: 'aa',
      name: 'aaaaa',
      password: 'secret'
    };

    await api
      .post('/api/users')
      .send(tooShortName)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const tooShortPassword = {
      username: 'aaaaa',
      name: 'aaaaa',
      password: 'aa'
    };

    await api
      .post('/api/users')
      .send(tooShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test('with username already taken fails', async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain('`username` to be unique');

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});