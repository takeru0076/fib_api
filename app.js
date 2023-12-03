const express = require('express');
const app = express();
const port = 3000;
//BigInt 型の値を JSON 文字列に変換するため
//JSONbig.stringify() メソッドを呼び出すことができるようになる
const JSONbig = require('json-bigint');


function calculateFibonacci(n) {
  var current = BigInt(1);
  var next = BigInt(1);
  var tmp;
  for (let i = 1; i < n; i++) {
    tmp = current + next;
    current = next;
    next = tmp;
  }
  return current;
}

//１文字目が0の時

app.get('/fib', (req, res) => {
  try {
    if (!req.query.n) {
      throw new Error('Input is required. Input must be a positive integer.');
    }

    if (req.query.n.charAt(0) === '0') {
      throw new Error('Don\'t input a 0 in the first letter. Input must be a positive integer.');
    }

    const n = parseFloat(req.query.n);

    if (isNaN(n) || isNaN(req.query.n)) {
      throw new Error('Don\'t input string. Input must be a positive integer.');
    }

    if (n <= 0) {
      throw new Error('Don\'t input non-positive number. Input must be a positive integer.');
    }

    if (n % 1 !== 0) {
      throw new Error('Don\'t input decimal number. Input must be a positive integer.');
    }

    var data = calculateFibonacci(n);
    //data オブジェクトを JSON 文字列に変換
    let result = JSONbig.stringify({ result: data });
    res.send(result);
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = app;