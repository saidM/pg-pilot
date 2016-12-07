'use strict'

require('./test_helper')

describe('GET /tables/:name', () => {
  it('returns 401 if there is no active connection to the database', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres2' }) // Invalid credentials on purpose to empty the pg variable
      .end((err, res) => {
        request(app)
          .get('/tables/trainers')
          .expect(401, done)
      })
  })

  it('returns 404 if the table was not found in the database', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres' })
      .end((err, res) => {
        request(app)
          .get('/tables/invalid_table')
          .expect(404, done)
      })
  })

  it('returns 200 if there is an active connection and the table was found', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres' })
      .end((err, res) => {
        request(app)
          .get('/tables/trainers')
          .expect(200, done)
      })
  })
})
