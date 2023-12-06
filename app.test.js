const request = require('supertest');
const app = require('./app');
const assert = require('assert');

describe('GET /fib', () => {

  it('n=5', (done) => {
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

  it('n=99', (done) => {
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

  it('n=1', (done) => {
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

  it('n=3.14e2', (done) => {
    request(app)
      .get('/fib')
      .query({ n: 3.14e2 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          result: 187341518601536966291015050946540312701895836604078191803255601777
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=0', (done) => {
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
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=0.1', (done) => {
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
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=-1', (done) => {
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
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=９９', (done) => {
    request(app)
      .get('/fib')
      .query({ n: "９９" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=99.01', (done) => {
    request(app)
      .get('/fib')
      .query({ n: 99.01 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=1.2e-3', (done) => {
    request(app)
      .get('/fib')
      .query({ n: 1.2e-3 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=0123', (done) => {
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
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=""', (done) => {
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
          message:"Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=abc', (done) => {
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
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

  it('n=全角テst', (done) => {
    request(app)
      .get('/fib')
      .query({ n: "全角テst" })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 400,
          message: "Bad Request. Input must be a positive integer."
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });
  
  it('Specify a nonexistent endpoint URL', (done) => {
    request(app)
      .get('/other')  // 未知のエンドポイント
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);

        const expectedResponse = {
          status: 404,
          message: "Not found"
        };

        assert.deepStrictEqual(res.body, expectedResponse, 'Response body does not match expected structure');

        done();
      });
  });

});