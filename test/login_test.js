'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai'),
    expect = chai.expect,
    request = require('supertest'),
    app = require('../server');

describe('POST /login', () => {
  it('returns 400 if the database or the user is missing', () => {
    return request(app)
      .post('/login')
      .expect(400);
  });
  
  it('returns 401 if the credentials are incorrect', () => {
    return request(app)
      .post('/login')
      .send({ database: 'invalid_db', user: 'postgres' })
      .expect(401);
  });

  it('returns 200 if the connection to the database was made', () => {
    return request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres' })
      .expect(200);
  });
});
