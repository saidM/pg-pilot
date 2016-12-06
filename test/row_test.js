'use strict'

require('./test_helper')

describe('GET /tables/:name/:id', () => {
  it('returns 401 if there is no active connection to the database', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres2' }) // Invalid credentials on purpose to empty the pg variable
      .end((err, res) => {
        request(app)
          .get('/tables/trainers/1')
          .expect(401, done)
      })
  })

  it('returns 404 if the row was not found in the database', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres' })
      .end((err, res) => {
        request(app)
          .get('/tables/trainers/10')
          .expect(404, done)
      })
  })

  it('returns 200 if there is an active connection and the row was found', (done) => {
    request(app)
      .post('/login')
      .send({ database: 'pokemon_test', user: 'postgres' })
      .end((err, res) => {
        request(app)
          .get('/tables/trainers/1')
          .expect(200, done)
      })
  })
})
