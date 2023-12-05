const request = require('supertest');
const app = require('./app');
const assert = require('assert');

describe('GET /fib', () => {

  it('Returns JSON with the calculated Fibonacci result', (done) => {
    request(app)
      .get('/fib')
      .query({ n: 5 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          result: 5
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('Returns JSON with the calculated Fibonacci result', (done) => {
    request(app)
      .get('/fib')
      .query({ n: 99 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          result: 218922995834555169026
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('Returns JSON with the calculated Fibonacci result', (done) => {
    request(app)
      .get('/fib')
      .query({ n: 1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          result: 1
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('Rejects negative input and responds with the expected error message.', (done) => {
    request(app)
      .get('/fib')
      .query({ n: -1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Don't input non-positive number. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('Rejects empty input and responds with the expected error message.', (done) => {
    request(app)
      .get('/fib')
      .query({ n: "" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Input is required. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('Rejects string input and responds with the expected error message.', (done) => {
    request(app)
      .get('/fib')
      .query({ n: "abc" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Don't input string. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('Rejects decimal input and responds with the expected error message.', (done) => {
    request(app)
      .get('/fib')
      .query({ n: 0.1 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Don't input a 0 in the first letter. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('Rejects input starting with 0 and responds with the expected error message.', (done) => {
    request(app)
      .get('/fib')
      .query({ n: "0123" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Don't input a 0 in the first letter. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('Rejects input of 0 and responds with the expected error message.', (done) => {
    request(app)
      .get('/fib')
      .query({ n: 0 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Don't input a 0 in the first letter. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

});
