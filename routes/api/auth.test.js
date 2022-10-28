const { expression } = require('joi');
const mongoose = require('mongoose');
const request = require('supertest');
require('dotenv').config();
const app = require('../../app');
const { User } = require('../../models/user');

const { DB_TEST_HOST, PORT = 3000 } = process.env;

describe('test auth routes', () => {
  let server;
  beforeAll(() => {
    server = app.listen(PORT);
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(done => {
    mongoose.connect(DB_TEST_HOST).then(() => done());
  });

  afterEach(done => {
    User.remove({}, () => {
      mongoose.connection.close(() => done());
    });
  });

  test('test login route', async () => {
    const newUser = {
      name: 'Garik',
      email: 'garik@mail.com',
      password: '123456',
    };

    await request(app).post('/api/auth/register').send(newUser);

    const loginUser = {
      email: 'garik@mail.com',
      password: '123456',
    };

    const loginResponse = await request(app).post('/api/auth/login').send(loginUser);
    const { body, statusCode } = loginResponse;
    const user = await User.findOne({ email: body.user.email });

    expect(statusCode).toBe(200);
    expect(body.token).toBeTruthy();
    expect(body.token).toBe(user.token);
    expect(typeof body.token === 'string').toBeTruthy();
    expect(body.user.email).toBeTruthy();
    expect(body.user.email).toBe(user.email);
    expect(typeof body.user.email === 'string').toBeTruthy();
    expect(body.user.subscription).toBeTruthy();
    expect(body.user.subscription).toBe(user.subscription);
    expect(typeof body.user.subscription === 'string').toBeTruthy();
  });
});
