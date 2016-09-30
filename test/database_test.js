process.env.NODE_ENV = 'test';

let chai = require('chai'),
    expect = chai.expect,
    chaiAsPromised = require('chai-as-promised'),
    Database = require('../lib/database');

chai.use(chaiAsPromised);

describe('Database Class', () => {
  describe('connect()', () => {
    it('rejects the promise if the credentials are invalid', () => {
      let db = new Database('invalid_db');
      let promise = db.connect();

      return expect(promise).to.be.rejectedWith('error: database "invalid_db" does not exist');
    });
    
    it('resolves the promise if the credentials are ok', () => {
      let db = new Database('pokemon_test');
      let promise = db.connect();

      return expect(promise).to.be.fulfilled;
    });
  });

  describe('getTables()', () => {
    it('rejects the promise if the there is no connection to the database', () => {
      let db = new Database('pokemon_test');
      let promise = db.getTables();

      return expect(promise).to.be.rejectedWith('There is no connection');
    });

    it('resolves the promise with the tables if there is an active connection', () => {
      let db = new Database('pokemon_test');

      return expect(
        db.connect()
        .then(() => {
          return db.getTables();
        })
      ).to.be.fulfilled;
    });
  });

  describe('query', () => {
    it('rejects the promise if the there is no connection to the database', () => {
      let db = new Database('pokemon_test');
      let promise = db.query('select 1+1');

      return expect(promise).to.be.rejectedWith('There is no connection');
    });

    it('rejects the promise if the query is invalid', () => {
      let db = new Database('pokemon_test');

      return expect(
        db.connect()
        .then(() => {
          return db.query('abc');
        })
      ).to.be.rejectedWith('error: syntax error at or near "abc"');
    });

    it('resolves the promise if the query is ok', () => {
      let db = new Database('pokemon_test');

      return expect(
        db.connect()
        .then(() => {
          return db.query('select 1+1');
        })
      ).to.be.fulfilled;
    });
  });
});
