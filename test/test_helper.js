'use strict';

process.env.NODE_ENV = 'test';

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised');

global.chai = chai;
global.expect = chai.expect;
global.chai.use(chaiAsPromised);
global.request = require('supertest');
global.app = require('../server');
global.Database = require('../lib/database');
