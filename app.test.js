const request = require('supertest');
const assert = require('assert');
const app = require('./app.js'); // your Express app file path

describe('GET /fib', function () {
  it('should calculate Fibonacci for a given input', function (done) {
    const input = 5; // replace with the input you want to test

    request(app)
      .get('/fib')
      .query({ n: input })
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);

        assert.deepStrictEqual(res.body, { result: calculateFibonacci(5) }); // replace with the expected result
        done();
      });
  });

  it('should handle invalid input gracefully', function (done) {
    const invalidInput = 'invalid'; // replace with invalid input

    request(app)
      .get('/fib')
      .query({ n: invalidInput })
      .expect(400)
      .end(function (err, res) {
        if (err) return done(err);

        assert.deepStrictEqual(res.body.status, 400);
        assert.ok(res.body.message.includes('positive integer'));
        done();
      });
  });

  // Add more test cases as needed
});
