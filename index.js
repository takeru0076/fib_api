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

app.get('/fib', (req, res) => {
  //good
  //入力がない
  //文字列
  //負の数

  //bad
  //小数not
  //1aが1返ってくる,3aが3返ってくる
  try {
    if (!req.query.n) {
      throw new Error('Input is required');
    }

    const n = parseInt(req.query.n);

    if (isNaN(n)) {
      throw new Error('Don\'t input string. Input must be a positive integer');
    }

    if (n < 0) {
      throw new Error('Don\'t input negative number. Input must be a positive integer');
    }

    if (n % 1 !== 0) {
      throw new Error('Don\'t input decimal number. Input must be a positive integer');
    }

    var data = calculateFibonacci(n);
    //data オブジェクトを JSON 文字列に変換
    let result = JSONbig.stringify({ result: data });
    //res.setHeader('Content-Type', 'application/json');//これ必要？
    res.send(result);
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
