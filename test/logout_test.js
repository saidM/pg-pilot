'use strict'

require('./test_helper')

describe('DELETE /logout', () => {
  it('returns 200 if the connection to the database was closed successfully', () => {
    return request(app)
      .delete('/logout')
      .expect(200)
  })
})
