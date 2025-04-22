const request = require('supertest');
const app = require('../../app'); // adjust if necessary
const mongoose = require('mongoose');

let token;

beforeAll(async () => {
  const res = await request(app).post('/api/auth/login').send({
    email: 'testuser@example.com',
    password: 'TestPass123',
  });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close(); // cleanly close DB after tests
});

describe('GET /api/books', () => {
  it('should return all books when authorized', async () => {
    const res = await request(app)
      .get('/api/books')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});