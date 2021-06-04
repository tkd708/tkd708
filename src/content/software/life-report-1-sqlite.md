---
layout: post
title: 'Life Report 1. SQLite'
author: [Naoya]
image: ../img/lifereport.png
date: '2019-11-18T23:46:37.121Z'
draft: false
tags:
  - Software
  - Mobile App
  - SQLite
  - Expo
  - React Native
excerpt: Some technical notes on my first ios app "Life Report". This article focuses on expo-SQLite.
---

React Native と Expo による家計簿アプリ開発記録の第１弾です！

下記はほぼ前回の単語帳アプリから引き続き。

- アプリの Routing は react-navigation
- パーツ類は Native base
- State 管理は unstated

で、今回の注目点はデータベースを Asyncstorage ではなく**expo-SQLite**にしたというところです。

- データベース：expo-SQLite

https://docs.expo.io/versions/latest/sdk/sqlite/

SQLite そのものの使い方は下記など。

https://www.tutorialspoint.com/sqlite/index.htm

https://www.sqlitetutorial.net/

では中身の紹介です。相変わらず未熟なので、改善案を絶賛募集中です。

本記事のコードを含むファイルなどはこちら。

https://github.com/tkd708/Life-Report/blob/master/Router.js

## expo-sqlite でのデータ管理

---

1. データベースの生成

```javascript
const LifeReport = SQLite.openDatabase('LifeReport');
```

これはそのまま...（）内がデータベース名で、存在しなければ自動生成されます。

<br>

2. テーブルの生成

```javascript
LifeReport.transaction(
  tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS expenses (' +
        'ID text primary key not null,' +
        'Date text,' +
        'Category text,' +
        'Amount integer,' +
        'Remark text' +
        ');',
    );
  },
  () => {
    console.log('fail');
  },
  () => {
    console.log('success_tableCheck');
  },
);
```

基本的な書き方は、データベース変数.transaction からのアロー関数で excuteSql、その中身に実際の SQL で実行されるコードを書きます。ここは好みですが、自分は上記のように文字列を＋で連結する形にして行を増やしていきました。

<br>

3. データポイントの挿入

```javascript
onDoneAddExpense = (id, date, category, amount, remark) => {
  if (amount !== '') {
    LifeReport.transaction(
      tx => {
        tx.executeSql(
          'INSERT INTO expenses' +
            '(ID, Date, Category, Amount, Remark)' +
            ' VALUES (?, ?, ?, ?, ?);',
          [id, date, category, amount, remark],
        );
      },
      () => {
        console.log('fail');
      }, // callback at failure
      () => {
        this.updateExpenses(), this.getTodaysExpenses();
      }, // callback at success
    );
  }
};
```

特徴的？なのは SQL のコードの中に？を入れて、executeSql の次の引数に配列を入れることでその中身が順番に代入されていくことでしょう。

executeSql を閉じた先で、失敗時と成功時のコールバック関数を指定できます。

<br>

4. 特定の日付間かつ指定のカテゴリの合計金額を日ごとに持ってくる

```javascript
LifeReport.transaction(
  tx => {
    tx.executeSql(
      'SELECT Date, SUM(Amount) Subtotal ' + // SUM() Variable_name
        'FROM expenses ' +
        'WHERE Category = ? AND Date BETWEEN ? AND ? ' +
        'GROUP BY Date ' +
        ';',
      [category, lowerDate, upperDate],
      (_, { rows: { _array } }) => {
        this.setState({
          dailyExpenses_dates: _array.map(x => x.Date),
          dailyExpenses_amounts: _array.map(x => x.Subtotal),
        });
      },
    );
  },
  () => {
    console.log('fail');
  },
  () => {
    console.log('success_daily');
  },
);
```

そしてデータを持ってくる部分 SELECT、FROM、WHERE、GROUP BY なんかは SQL の基本ですね。

クエリに対してのレスポンスの受け取り方は公式のをそのままです...単に res を console.log()とかで見ればわかりますがネストがほんのり複雑なので深追いせず転用です。

一点補足しておくと、一つの Function(例えば３．の onDoneAddExpense)の中に transaction を複数入れても、実行されるのは最初の一つだけの模様です。

それなのに transaction の中のコールバックは成功の方が実行されるので、成功したはずなのに SQL の実行結果が反映されない...？といったことに。実行してないから失敗してないし成功っしょってな、紛らわしいわ。

複数の SQL コードを実行したい場合、transaction のアロー関数の先に複数つっこむ必要があるみたいです（公式の Example のコードがその書き方）。...という理解なのですが、詳しい方、できればぜひ正しくわかりやすい解説をば。

<br>

## 所感

---

あとそもそも AsyncStorage ではなく SQLite にする意義があるのか？みたいなとこ疑問に思いながらやってみたのですが、やっぱりデータの操作は SQL でいじってそれから取り出す方が楽ですよね。

transaction 頻繁にするより一回で全部取り出して js の書き方でデータ操作する方が処理は速いのでしょうか？データ量が多くなった時のこのあたりのバランスは不明です。

expo-sqlite は sqlite のコードを直書きしなきゃいけないのが最初好きになれなかったけれど、そもそもがシンプルな記述のみだから慣れてくるとそんなに気にならなくなりました。
