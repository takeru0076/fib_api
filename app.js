const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const JSONbig = require('json-bigint');

function multiply(a, b) {
  const c = initializeMatrix(a.length, b[0].length);
  for (let i = 0; i < a.length; i++) {
    for (let k = 0; k < b.length; k++) {
      for (let j = 0; j < b[0].length; j++) {
        c[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return c;
}

function power(a, n) {
  let result = initializeMatrix(a.length, a.length);
  for (let i = 0; i < a.length; i++) {
    result[i][i] = BigInt(1);
  }
  while (n > 0) {
    if (n % 2 === 1) {
      result = multiply(a, result);
    }
    a = multiply(a, a);
    n >>= 1;
  }
  return result;
}

function initializeMatrix(xlen, ylen) {
  const matrix = new Array(xlen);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(ylen).fill(BigInt(0));
  }
  return matrix;
}

function fibonacci(n) {
  const baseMatrix = [
    [BigInt(1), BigInt(1)],
    [BigInt(1), BigInt(0)],
  ];
  const poweredMatrix = power(baseMatrix, n);
  return poweredMatrix[0][1];
}

//405エラー処理と500エラー処理を実装すればよかった

// 405エラー処理
app.use((req, res, next) => {
  if (req.method !== 'GET') {
    res.status(405).json({ status: 405, message: 'Method Not Allowed' });
  } else {
    next();
  }
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/fib', (req, res) => {
  try {
    if (req.query.n.charAt(0) === '0') {
      throw new Error('Bad Request. Input must be a positive integer.');
    }

    const n = Number(req.query.n);

    if (!Number.isInteger(n) || n <= 0) {
      throw new Error('Bad Request. Input must be a positive integer.');
    }

    const result = fibonacci(n);
    const response = JSONbig.stringify({ result });
    res.header('Content-Type', 'application/json');
    res.send(response);
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
});

/*app.use((req, res, next) => {
  res.status(404).json({ status: 404, message: 'Not found' });
});*/

app.use((req, res, next) => {
  const existingPaths = ['/', '/fib']; // 存在するパスのリスト
  if (!existingPaths.includes(req.path)) {
    res.status(404).json({ status: 404, message: 'Not found' });
  } else {
    next(); // 存在するパスなら次の中間処理へ
  }
});

// 500エラー処理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, message: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;