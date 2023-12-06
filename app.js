const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
//BigInt 型の値を JSON 文字列に変換するため
//JSONbig.stringify() メソッドを呼び出すことができるようになる
const JSONbig = require('json-bigint');

function calculateFibonacci(n) {
  let current = BigInt(1);
  let next = BigInt(1);
  let tmp;
  for (let i = 1; i < n; i++) {
    tmp = current + next;
    current = next;
    next = tmp;
  }
  return current;
}

app.get('/fib', (req, res) => {
  try {
    if (req.query.n.charAt(0) === '0') {
      throw new Error('Bad Request. Input must be a positive integer.');
    }

    const n = Number(req.query.n);

    if (!Number.isInteger(n) || n <= 0) {
      throw new Error('Bad Request. Input must be a positive integer.');
    }

    const data = calculateFibonacci(n);
    //data オブジェクトを JSON 文字列に変換
    const result = JSONbig.stringify({ result: data });
    res.header('Content-Type', 'application/json')
    res.send(result);
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
});

app.use((req, res, next) => {
  res.status(404).json({ status: 404, message: "Not found" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;