---
layout: post
title: 'Life Report 5. csv export'
author: [Naoya]
image: ../img/lifereport.png
date: '2020-03-22T23:46:37.121Z'
draft: false
tags:
  - Software
  - Mobile App
  - FileSystem
  - Sharing
  - csv export
  - Expo
  - React Native
excerpt: Some technical notes on my first ios app "Life Report". This article focuses on csv export using FileSystem and Sharing.
---

さて、このシリーズも家計簿アプリの実装紹介としては最後で、データベースを csv として他のメディアに投げる機能の実装例紹介になります。

もともと費やしたお金と時間を全部記録して可視化するアプリがほしい！という動機で作り始めたはいいものの...

なんだかんだこのアプリのデータベースだけに記録が閉じ込められちゃうのも不安だし、思ったほど高度な可視化や分析はできなさそうだし...

ということで、一応データベースを csv にしてエクスポートしたい（逃）！ということで実装した機能の紹介です。

本記事のコードを含むファイルなどはこちら。

https://github.com/tkd708/Life-Report/blob/master/Router.js

<br>
 

## FileSystem

---

とはいえ調べていても csv export の実装例は見当たらず....出てきたのは text file を作ってアプリ内部に保存する、というもの。

https://stackoverflow.com/questions/54586216/how-to-create-text-file-in-react-native-expo

そこで出てきたこの FileSystem、これによってアプリのファイルシステムにアクセスしてファイルを書き込んだり消したりできるんですね。いろんな操作があるみたいです。

https://docs.expo.io/versions/v36.0.0/sdk/filesystem/

こうしてインポートしておけばそれぞれの関数が実行できます。

```javascript
import \* as FileSystem from 'expo-file-system';
```

<br>

## JSON to CSV

---

上記の StackOverFlow の例では text だったけれど、要はこれをカンマ区切りの記述に直してファイルの拡張子を.csv で保存してやればいいんだよね？ということで、JSON object を csv format にするコードは適当に拝借しました。

https://medium.com/@danny.pule/export-json-to-csv-file-using-javascript-a0b7bc5b00d2

```javascript
const convertToCSV = objArray => {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  var headerLine = 'ID, Date, Type, Category, Amount, Remark';
  str += headerLine + '\r\n';

  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ',';

      line += array[i][index];
    }

    str += line + '\r\n';
  }

  return str;
};
```

こんな感じで修正し、データベースから引っ張ってきた配列（その一つ一つがオブジェクトで、更にその Key が Header に対応する形のデータセット）を csv 形式に変更する関数を導入。

<br>

## Sharing

---

ただ、自分としては生成したファイルをアプリ内に保存しておくのではなく、例えば自分の PC とかに置いておけるように Dropbox なりに Export したい...他のアプリでもできてるアレはどうやって実装されてるの？

と探し回っていたらありました、Expo Sharing なるものが。これで冒頭の画像のように他のメディアに投げるアレを出すことができるみたいです。

https://docs.expo.io/versions/latest/sdk/sharing/

インポートも同じように。

```javascript
import \* as Sharing from 'expo-sharing';
```

で、これら FileSystem と Sharing をまとめて csv エクスポート用の関数を用意してみたのがこちら。

```javascript
const exportFile = async () => {
  let fileName =
    'LifeReport*allExpenses*' + String(moment(new Date()).add(0, 'days').format('YYYY-MM-DD'));
  let fileUri = FileSystem.documentDirectory + fileName + '.csv';
  let txtFile = convertToCSV(container.state.allExpenses);
  await FileSystem.writeAsStringAsync(fileUri, txtFile, { encoding: FileSystem.EncodingType.UTF8 });
  await Sharing.shareAsync(fileUri);
  await FileSystem.deleteAsync(fileUri);
};
```

大体そのまま読めると思いますが、fileName はアプリ名とデータ名に日付を足したもので、FileSystem.documentDirectory と拡張子と組み合わせることで保存先 uri になっています。

で、txtFile となってますがこれは上記の関数でデータベースを csv 化したもの。

これを FileSystem.writeAsStringAsync で保存した状態で、Sharing.shareAsync によってユーザーの好きなメディアにエクスポートできるようになっています。

今回はエクスポートが目的で、アプリにファイルを保存したいわけではないので、最後に削除する一文を足しています。

<br>

## 所感

---

ちなみに自分は未だに非同期処理を書きなれていないので、はじめの方で引用していた permission を挟んでいた事例に従って書いたこの async await の書き方に意味があるのかは分かりません。

まぁともかく、React native + Expo でも JSON/string からなるデータであれば結構シンプルに csv 化してエクスポートできるよ！という記事でした。
