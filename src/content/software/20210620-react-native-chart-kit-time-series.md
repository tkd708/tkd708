---
layout: post
title: 'react-native-chart-kitで時系列データを表示する'
author: [Naoya]
image: ../img/react-native-chart-kit.jpg
date: '2021-06-20T01:42:37.121Z'
draft: false
tags:
  - Software
  - Expo
  - React Native
  - react-native-chart-kit
excerpt: Expoでのアプリ開発でグラフ表示するとなると、現状react-native-chart-kitが基本の選択肢となりますが、デフォルトでは時系列データの表示に対応していないので、試行錯誤してみました。
---

Expo でのアプリ開発でグラフ表示するとなると、現状 react-native-chart-kit が基本の選択肢となりますが、デフォルトでは時系列データの表示に対応していません。
本記事では、データの整形や表示の設定などの工夫によって時系列データを表示する方法を紹介します。
なお、いくつかの表示設定機能の都合で、react-native-chart-kit の中でも LineChart コンポーネントを使っての表示になります。

<br>

こんな感じにデータをチャートコンポーネントに渡してやるのですが、単に時系列データのポイントをそれぞれ配列にしても、時間間隔に関係なく配列順にただデータがプロットされてしまいます。
例えば 1 つ目と 2 つ目のデータの間隔が 1 日、2 つ目と 3 つ目のデータの間隔が 7 日だったとしても、グラフ上では等間隔に並べられてしまうということです。

```javascript
const dataset = {
  labels: xLabelArray,
  datasets: [
    {
      data: yPointArray,
    },
  ],
};
```

<br>

そのため、基本方針は表示したい期間において等間隔のデータセットに成形してからチャートに渡すことになります。
例えば、1 か月間日毎のデータ表示にする、など。

```javascript
const dataDailyFilled = [];
for (let i = 0; i < datePeriod.length; i++) {
  dataDaily[datePeriod[i]]
    ? dataDailyFilled.push(dataDaily[datePeriod[i]])
    : dataDailyFilled.push(null);
}
```

上記の例では、datePeriod の日数分、データがあればそのデータを配列に加え、そうでなければ null を入れる、ということにしました。
ただ、react-native-chart-kit における y 軸データでの null の扱いは 0 になっているようで、折れ線グラフにするとデータの欠損日があるたびに 0 に振れて極端にギザギザしてしまいます。
そこで、上記の null で埋めた y 軸データを impute してやります。下記の回答コードを使わせてもらいました。

https://www.notion.so/react-native-chart-kit-a3e0c33dcbcb4f4c99d731426f842045#1e8452d654554e388015b9c817be66ef

<br>

さて、これで y 軸データは問題ありません。x 軸データは単に指定期間の日付を並べた配列にすればよい...と思っていたのですが、実際に表示するラベルとの兼ね合いで少し工夫が必要でした。

どうも、x 軸ラベルについて interval を指定したりスキップする機能はデフォルトには無いようです。

https://github.com/indiespirit/react-native-chart-kit/blob/master/src/line-chart/LineChart.tsx

代わりに、formatXLabel を使って、x 軸データの value について条件式を設定して、満たしているときは日付を入れて、そうでなければ空白にするというフォーマットにしました。
そのため、x 軸データには直接日付データを入れた配列にするのではなく、指定期間開始日からの日数とし、表示したい間隔(下記 labelSkipDays)で割り切れる場合に表示するという形にしました。

```javascript
                formatXLabel={(value) =>
                    (Number(value) + 1) % labelSkipDays == 0
                        ? String(
                              periodStart
                                  .clone()
                                  .add(Number(value) + 1, 'days')
                                  .format('M月D日')
                          )
                        : ''
                }

```

<br>

ちなみに、この x 軸ラベル表示間隔の数字を yAxisInterval に渡してやると、垂直方向の点線の間隔と x 軸ラベルの間隔を合わせられます。

```javascript
yAxisInterval = { labelSkipDays };
```

<br>

これでひとまず時系列データをそれっぽく表示することができたはずです。
ただ、折れ線チャートでデータポイントに対して点の表示をオンにしている場合、このままだと Impute された欠損日のデータにも点が表示されます。
これを消すのに、hidePointsAtIndex といういかにもな項目があるのですが、これに欠損日の Index を渡すと、点の表示だけでなくそれに対応する x 軸ラベルも消えてしまいます。
対応策として、getDotColor を使いデータポイントの index によって欠損日には透明にする、としました。

```javascript
getDotColor={(datapoint, index) =>
                    nullIndexArray.includes(index)
                        ? 'rgba(255, 255, 255, 0)'
                        : '#000000'
            }
```

<br>

上記の nullIndexArray は Inpute する前のデータについて、null を index に、逆にデータポイントがあるところには null を入れることで、元のデータセットにおいて欠損している個所の index を並べた配列になってます。

```javascript
const nullIndexArray = dataDailyFilled.map((e, index) => (!e ? index : null));
```

<br>

断片的なコードによる説明でしたが、

1. y 軸データを欠損時には impute して等間隔にそろえる
2. x 軸ラベルは formatXLabel に条件式を設定して表示する
3. データポイントは getDotColor に条件式を設定して表示する

これらのステップで react-native-chart-kit でも時系列データを表示できるはずです。
