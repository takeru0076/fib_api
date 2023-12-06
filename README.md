# fib_api

技術課題・問題1  フィボナッチ数を返すAPIサービスの開発

# 概要

## 実装言語、実行環境、フレームワーク
* 実装言語:JavaScript
* 実行環境:Node.js
* フレームワーク:Express(Node.js上で動作するWebアプリケーションフレームワーク)


## ソースコードの構成
fib_api/  
|-- node_modules/  
|-- app.js  
|-- app.test.js  
|-- package.json  
|-- package-lock.json  

* node_modules
プロジェクトが依存するパッケージ（ライブラリやモジュール）が格納されるディレクトリ
* app.js
Expressを使用したnode.jsアプリケーション
'/fib' エンドポイントを通じてFibonacci数列を計算してJSON形式で返すREST API
* app.test.js
'/fib' エンドポイントに対して異なる入力値や条件に基づいて正しいレスポンスが返されるかどうかを確認するためのテストコード
* package-lock.json
  npm installで作られる
Node.js プロジェクトにおいて依存関係のバージョンを厳密に管理し、再現性を確保するためのもの
* package.json
npm initで作られる。
Node.jsのプロジェクトの構成や依存関係、実行可能なスクリプトなどを一元管理する役割

### installしたライブラリ、モジュール、フレームワーク
* express: Node.js製のウェブアプリケーションフレームワーク
* json-bigint: JSON 文字列と BigInt 型の相互変換をサポートするライブラリ
* supertest: Node.js アプリケーションの HTTP テストを行うためのライブラリ
* mocha: JavaScriptのテストフレームワーク
* assert: アサーションテストを行うためのメソッドを提供するNode.jsの組み込みモジュール


## 機能
前提条件としてECMAScript(JavaScript言語の標準仕様を規定した文書のこと)において、以下の数値として扱われるものの中で自然数をふさわしい入力とします。  

ECMAScriptにおいて、数値として扱われるものは主に以下の半角のものです(ChatGPTより)  

* 整数 (Integers): 整数は通常の数値です。例えば、1 や -42 などが整数に該当します。  
* 浮動小数点数 (Floating-point numbers): JavaScriptにおいては、全ての数値は浮動小数点数として表現されます。例えば、3.14 や -0.01 などが浮動小数点数に該当します。  
* 指数表記 (Exponential notation): 大きな数値や小さな数値は指数表記を使用して表現できます。例えば、3.14e2 は 314、1.2e-3 は 0.0012 に該当します。  
* Infinity (無限大): Infinity は正の無限大を表します。例えば、1/0 の結果は Infinity です。  
* NaN (Not a Number): 数学的に定義されない演算や不正な数値操作が行われた場合、NaN が返されます。  


**リクエスト**
* HTTPメソッド : GET
* URL : https://(sample.com等任意のサーバ)/fib?/n=x
* curlコマンド例 : curl -X GET -H "Content-Type: application/json" "http://localhost:3000/fib?n=x"
* xに当てはまるリクエスト成功時パラメータ
  1. 自然数(1,2,3,......,)
  2. 小数点があっても可(1.0, 99.0)
  3. 指数表記の自然数(3.14e2,1e2)
* xに当てはまるエラーパラメータの例
  1. 数値でない入力(空文字列、abc、９９、全角テst、0123)
  2. 自然数でない半角の入力(0、0.1、-1、99.01, 1.2e-3, Infinity, NaN)

**レスポンス**
* n=99の成功時レスポンス例(json) :{"result":218922995834555169026}

* エラー時レスポンス例(json):{"status":400,"message":"Bad Request. Input must be a positive integer."}

**ステータスコード**
* 200:リクエスト成功
* 400:不正なリクエストパラメータを示す
* 404:存在しないエンドポインURLを指定

## ユニットテスト
* テスト実行コマンド： npm test
* ユニットテストで入力してる値をテストする
