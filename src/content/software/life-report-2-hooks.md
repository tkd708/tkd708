---
layout: post
title: 'Life Report 2. Hooks'
author: [Naoya]
image: ../img/lifereport.png
date: '2020-03-21T23:46:37.121Z'
draft: false
tags:
  - Software
  - Mobile App
  - SQLite
  - Expo
  - React Native
excerpt: Some technical notes on my first ios app "Life Report". This article focuses on Hooks.
---

React Native と Expo による家計簿アプリ開発記録の第２弾です！

今回は特定の機能というわけではないのですが、**Hooks**を導入したというところです。

本記事のコードを含むファイルなどはこちら。

https://github.com/tkd708/Life-Report/blob/master/Router.js

## Hooks とは

---

さて、Hooks の概要や基本的な例は公式を参照。

「要するにフックとは？フックとは、関数コンポーネントに state やライフサイクルといった React の機能を “接続する (hook into)” ための関数です。フックは React をクラスなしに使うための機能ですので、クラス内では機能しません。」

https://ja.reactjs.org/docs/hooks-overview.html

https://ja.reactjs.org/docs/hooks-state.html

https://ja.reactjs.org/docs/hooks-effect.html

だそうです。

正直自分はまだ Hooks のことをちゃんと理解できている気がしないので、解説やらは丸投げです。

https://qiita.com/ossan-engineer/items/99739b60b391c8013928

https://sbfl.net/blog/2019/02/09/react-hooks-usestate/

<br>

## Hooks 導入例

---

なので早速コードをつらつら紹介していくと、DailyReportScreenMoney ってのが今回 Hooks を導入していった Function Component になります。

```javascript
const DailyReportScreenMoney = ({ container }) => {

const isFocused = useIsFocused();
    const [categorySelected, setCategory] = useState('Daily total')
    const [lowerDate, setLowerDate] = useState(moment(new Date()).add(-28, 'days').format('YYYY-MM-DD'))
    const [upperDate, setUpperDate] = useState(moment(new Date()).add(0, 'days').format('YYYY-MM-DD'))

    useEffect( () => {
        isFocused && container.getDailyExpenses("Money", categorySelected, lowerDate, upperDate)
    },
        [isFocused, categorySelected, lowerDate, upperDate])
```

4 行並んでる const ～の部分が、Function Component に State を導入している部分で、useState の中身は初期値になります。下半分にある useEffect~のところで、指定したいずれかの State が更新されるたびにアロー関数で指定した Method（これ自体は container で記述されてます。）を実行する、ということになっています。ちなみに useEffect の配列の部分を空にすることで、これまで componentDidMount()で実行していた Method を導入するような使い方が一般的だと思うのですが、空でなくとも Mount 後に実行されます。なので「Mount 後＋配列に指定の State が更新された時」にアロー関数の内部が実行されるということになります（はずです？）。

この部分が関連しているのは UI では下記画像のような感じなのですが、"Daily total"となってる部分が categorySelected、From と To の日付がそれぞれ lower/upperDate になっていて、ユーザーがそれらを変更したら対応するデータを  container.getDailyExpenses()で sqlite のデータベースから取ってくる（後ほどそれをチャートに渡す）という運びです。あともう一つの isFocused ってのは UI 下部のタブ選択（Money か Time）のことで、それぞれでレンダーし直すように useEffect の中に入れました（これの導入のために Navigation も前回までの v4 から最新の v5 に、、、また別記事で）。

<br>

## Function Component に対する Unstated の使い方

---

Hooks 導入時の Function Component と Unstated との共存も、下記のように通常の Class 型コンポーネントの時と同様にしてラップすることができました。原理分かってる人からすれば当然なのかもですが、Unstated の例では基本 Class 型をラップしたものしか見たことが無かったので、一応。

```javascript
const DailyReportMoneyWrapper = () => (
  <Subscribe to={[AppContainer]}>
            {container => <DailyReportScreenMoney container={container} />}
        
  </Subscribe>
);
export default DailyReportMoneyWrapper;
```

上記の繰り返しになりますが、Function Component を指定する際に下記のように container を渡してやることでコンポーネント内で container にアクセスできます。Class 型の時は this.props.container みたいに書いてましたけど、この場合は単に container でおっけーですね。

```javascript
const DailyReportScreenMoney = ({ container }) => {
```

Method だけでなく、今回はチャート表示に必要なデータセットを下記のように container の state から引っ張ってきて訂正して入れています。配列が Null だとチャートがエラー吐いてしまうので length==0 の時はとりあえず適当にデータポイント突っ込むことにしました。

```javascript
let labelArray =
  container.state.dailyExpenses_dates.length !== 0
    ? container.state.dailyExpenses_dates.map(date => moment(date).format('MMM-DD'))
    : ['NA'];
let dataArray =
  container.state.dailyExpenses_amounts.length !== 0 ? container.state.dailyExpenses_amounts : [0];
let remarkArray =
  container.state.dailyExpenses_remarks.length !== 0 ? container.state.dailyExpenses_remarks : [''];
```

<br>

## まとめと所感

---

この Function Component の一連の流れをまとめると、

1.　 useState でユーザーの入力値を保持しておく State を定める

2.　 useEffect で１.で指定した State が更新された際に container で指定された method を実行

3.　 2.の method により sqlite とやりとり、取り出したデータセットが container の State に入る

4.　 container の State に入ったデータセットにアクセスしてチャートに必要なデータを用意

5.　 4.のデータをチャートに渡して図示

<br>

こんな感じです。1.と 2.が Hooks 関連、2.~4.は Unstated 関連の動作ですね。

これらによってユーザーの入力値に応じてチャートの表示が更新される(5.)という機能を実装しています。

Hooks 導入というタイトルにした通り、これはもともと 1.と 2.を Class 型コンポーネントで実装していた部分(this.state.～なやつ）を Hooks で書き換えただけなんですね。公式の説明にも「フックは既存のコードと併用することができるので、段階的に採用していくことが可能です。」とあります。

Hooks 導入の動機は「ステートフルなロジックをコンポーネント間で再利用するのは難しい」「複雑なコンポーネントは理解しづらくなる」からみたいですが、そう状況にもまだあまり遭遇していません。が、これは React のコンポーネント思想に真っ向から立ち向かうかのような書き方をしてきたからですね...前回と同じく、基本的に 1 ページにつき１ js ファイルという状況です。  まぁまだどんな部分をどれくらい使いまわしていくものか肌感覚で分かっていないから仕方ないですかね。

一応、徐々に実感したのは、render()が肥大化してきたらそれは分割して function/method として書いた方がよくて、頻出のものならコンポーネントとして独立させていくべきだろうという点。あとは container で state 集中管理してるからそれらを扱う function が container.js にどんどん増えてくこと。これらは Hooks 使いながら独立させていくべきなんだろうかと想像してます。

今後のアプリ開発の中で、「関連する機能に基づいて、1 つのコンポーネントを複数の小さな関数に分割することを可能に」する Hooks の恩恵を感じながら、より開発・管理しやすい構造にしていくことができればな、という次第です。

https://ja.reactjs.org/docs/hooks-intro.html

さて、以上は Hooks 導入の一例に過ぎませんが、本当はもっといろいろとできることや注意点やあるみたいです。

まだ自分も試してみたばかりで勉強中ですので、アドバイスいただければ幸いです！
