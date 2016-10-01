'use strict';

require('./test_helper');

describe('Database Class', () => {
  describe('connect()', () => {
    it('rejects the promise if the credentials are missing', () => {
      let db = new Database('pokemon_test');
      let promise = db.connect({ password: 'invalid password' }); // Missing user

      return expect(promise).to.be.rejectedWith('Missing credentials');
    });

    it('rejects the promise if the database does not exist', () => {
      let db = new Database('invalid_db');
      let promise = db.connect({ user: 'postgres', password: '' });

      return expect(promise).to.be.rejectedWith('database "invalid_db" does not exist');
    });
    
    it('rejects the promise if the role does not exist', () => {
      let db = new Database('pokemon_test');
      let promise = db.connect({ user: 'invalid_user', password: '' });

      return expect(promise).to.be.rejectedWith('role "invalid_user" does not exist');
    });
    
    it('resolves the promise if the credentials are ok', () => {
      let db = new Database('pokemon_test');
      let promise = db.connect({ user: 'postgres', password: '' });

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
        db.connect({ user: 'postgres', password: '' })
        .then(() => {
          return db.getTables();
        })
      ).to.eventually.have.property('tables');
    });
  });

  describe('query()', () => {
    it('rejects the promise if the there is no connection to the database', () => {
      let db = new Database('pokemon_test');
      let promise = db.query('select 1+1');

      return expect(promise).to.be.rejectedWith('There is no connection');
    });

    it('rejects the promise if the query is invalid', () => {
      let db = new Database('pokemon_test');

      return expect(
        db.connect({ user: 'postgres', password: '' })
        .then(() => {
          return db.query('abc');
        })
      ).to.be.rejectedWith('syntax error at or near "abc"');
    });

    it('resolves the promise if the query is ok', () => {
      let db = new Database('pokemon_test');

      return expect(
        db.connect({ user: 'postgres', password: '' })
        .then(() => {
          return db.query('select 1+1');
        })
      ).to.be.fulfilled;
    });
  });

  describe('export()', () => {
    it('rejects the promise if the there is no connection to the database', () => {
      let db = new Database('pokemon_test');
      let promise = db.export();

      return expect(promise).to.be.rejectedWith('There is no connection');
    });

    it('resolves the promise with the SQL dump if there is a connection', () => {
      let db = new Database('pokemon_test');

      return expect(
        db.connect({ user: 'postgres', password: '' })
        .then(() => {
          return db.export();
        })
      ).to.be.fulfilled;
    });
  });
  
  describe('import()', () => {
    it('rejects the promise if the there is no connection to the database', () => {
      let db = new Database('pokemon_test');
      let promise = db.import('select 1+1');

      return expect(promise).to.be.rejectedWith('There is no connection');
    });
    
    it('rejects if the SQL is invalid', () => {
      let db = new Database('pokemon_test');

      return expect(
        db.connect({ user: 'postgres', password: '' })
        .then(() => {
          return db.import('abc');
        })
      ).to.be.rejected;
    });

    it('resolves the promise if the SQL file was successfully imported in the database', () => {
      let db = new Database('pokemon_test');

      return expect(
        db.connect({ user: 'postgres', password: '' })
        .then(() => {
          return db.import('select 1+1');
        })
      ).to.be.fulfilled;
    });
  });
});
