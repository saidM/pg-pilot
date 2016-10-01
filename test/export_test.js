'use strict';

require('./test_helper');

describe('GET /export', () => {
  it('returns 401 if there is no active connection to the database', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres2' }) // Invalid credentials on purpose to empty the pg variable
      .end((err, res) => {
        request(app)
          .get('/export')
          .expect(401, done);
      });
  });
  
  it('returns 200 if there is an active connection', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres' })
      .end((err, res) => {
        request(app)
          .get('/export')
          .expect(200, done);
      });
  });
});
