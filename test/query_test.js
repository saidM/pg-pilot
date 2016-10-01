'use strict';

require('./test_helper');

describe('POST /query', () => {
  it('returns 401 if there is no active connection to the database', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres2' }) // Invalid credentials on purpose to empty the pg variable
      .end((err, res) => {
        request(app)
          .post('/query')
          .send({ sql: 'select 1+1' })
          .expect(401, done);
      });
  });
  
  it('returns 500 if the query is invalid', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres' })
      .end((err, res) => {
        request(app)
          .post('/query')
          .send({ sql: 'abc' })
          .expect(500, done);
      });
  });
  
  it('returns 200 if the query is valid', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres' })
      .end((err, res) => {
        request(app)
          .post('/query')
          .send({ sql: 'select 1+1' })
          .expect(200, done);
      });
  });
});
