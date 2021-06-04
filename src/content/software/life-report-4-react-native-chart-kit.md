---
layout: post
title: 'Life Report 4. react-native-chart-kit'
author: [Naoya]
image: ../img/lifereport.png
date: '2020-03-21T23:46:37.121Z'
draft: false
tags:
  - Software
  - Mobile App
  - react-native-chart-kit
  - Expo
  - React Native
excerpt: Some technical notes on my first ios app "Life Report". This article focuses on react-native-chart-kit.
---

本記事では家計簿アプリの中心的機能の一つ、react-native-chart-kit によるグラフ化を紹介します。

本記事のコードを含むファイルなどはこちら。

https://github.com/tkd708/Life-Report/blob/master/Router.js

<br>

## react-native-chart-kit

https://www.npmjs.com/package/react-native-chart-kit

https://aboutreact.com/react-native-chart-kit/

### データの指定

---

```javascript
<LineChart
                data={{
                    labels: chartLabels,
                    datasets: [{
                        data: chartDatasets,
                        remarks: chartRemarks,
                        strokeWidth: 2,
                    }],
                }}
```

LineChart 直下の data のオブジェクト内に全部入れます。x 軸に表示させたい配列は labels に、y 軸に表示させたい配列は datasets.data のにそれぞれセットします。

今回はこれらに加えて、remarks というのを自分で足しました。もともとの LineChart の機能としては表示されませんが、以下の tooltip の部分で使うための配列です。

react-native-chart-kit の方ではデータそのものをほとんど処理できないので、事前の整形がすべてになります。

配列を作る際の注意としては、x 軸で実際に表示する順番でデータを入れていくこと。数値なら小から大になっているべきで、自分のように日付なら時系列に並んでいないといけません。labels と datasets.data の配列は index で結びつけられて x 軸上に等間隔で並べられます（記事後半でもぼやいてますけど、これどうにかならないんでしょうか）。

<br>

### 折れ線グラフに tooltip（ツールチップ）を追加する

---

データを記録する際に、例えば出費で、カテゴリは外食で、金額はいくらで、という必須情報に加えて、例えばどこで何を食べた、みたいなメモ書き（Remark）も足せるようにしていました。

カテゴリ毎にチャートで表示する際には、このメモ書きがデータポイントごとにタップで表示できたらなぁ、ということでこの tooltip を導入することにしました。

下記、素晴らしい記事でした。自分のは単にこれを組み込んだだけです。

https://swallow-incubate.com/archives/blog/20200212

今回の例では、useState で保持しておく状態は Visible かどうかの Boolean 型変数と、座標と remark の文字列を key に持つオブジェクト です。useEffect で Visible が False になるように設定しているのは、グラフ化されているカテゴリが変更された時に、元のカテゴリでのグラフで表示されていたメモ書きが残らないようにするためです。

```javascript
const [toolTipVisible, setToolTipVisible] = useState(false);
const [toolTipPoint, setToolTipPoint] = useState({ x: '', y: '', value: '' });

useEffect(() => {
  setToolTipVisible(false);
}, [categorySelected]);
```

Tooltip そのものは Chart のタグの外に書いてあります。この Tooltip タグが後ほど Chart のタグに組み込まれるので、その際に props に相当する部分は受け渡されることになります。

```javascript
const Tooltip = (props) => {
        if (props.visible) {
            return (
                <View style={{
                    marginVertical: 'auto',
                    marginHorizontal: 'auto',
                    backgroundColor: 'rgba(35, 24, 21, 1)',
                    padding: 5,
                    width: Math.max(...props.point.value.map(e => e.length)) == 0
                    ? 0
                    : Math.max(50, 8 * Math.max(...props.point.value.map(e => e.length))),
                    //height: 25,
                    top: props.point.y - 25,
                    left: props.point.x - 8 * Math.max(...props.point.value.map(e => e.length)) / 2,
                }}
                >
                    {props.point.value.filter(e => e.length > 0).map((item, index) => {
                        return (
                            <Text style={{
                                color: 'rgba(255, 255, 255, 1)',
                                fontSize: 11,
                                textAlign: 'center',
                                key: index
                            }}>
                                {item}
                            </Text>
                        )
                    })}
                </View >
            );
        } else {
            return null;
        }
```

View でごちゃごちゃとやっているのは、Remark の文字列の長さによって tooltip のエリアを調節してる。
今回のアプリの作り方では、同じ日に同じカテゴリで money や time を記録した場合にはここで渡される Remark が配列となる。
ゆえに map と.length でその配列の書く文字列の長さを取り出して、長いものに View の長さや起点を合わせる仕様に。
中で表示される Text も、配列から一つずつ取り出して列に並べる形になっている。...というこれらの操作は js だし今回のアプリの仕様のに合わせてるだけですね。

汎用的なまとめとしては、props で渡された Visible の状態によって View か Null を返していて、View の中では props から渡ってきた座標と表示する文字列を元に tooltip を形成しているだけです。

react-native-chart-kit としての要点はここ。実際には更に chartConfig とかが続きますが今回は関係ないので割愛。

```javascript
<LineChart
                data={{
                    labels: chartLabels,
                    datasets: [{
                        data: chartDatasets,
                        remarks: chartRemarks,
                        strokeWidth: 2,
                    }],
                }}
                onDataPointClick={(data) => {
                    if (toolTipVisible && data.x === toolTipPoint.x && data.y === toolTipPoint.y) {
                        setToolTipVisible(false);
                        return;
                    }
                    setToolTipPoint({
                        x: data.x,
                        y: data.y,
                        value: data.dataset.remarks[data.index],
                    })
                    setToolTipVisible(true);
                }}
                decorator={(data) => {
                    return (
                        <Tooltip point={{
                            x: toolTipPoint.x,
                            y: toolTipPoint.y,
                            value: toolTipPoint.value
                        }}
                            visible={toolTipVisible}
                        />
                    )
                }}
```

もともと LineChart の中に、onDataPointClick というものが設定できて、これによってデータポイントの座標と Index を取得できる（data.x と data.y と data.index)ようになっています。

最初の if 文で、既に表示されている tooltip をタップした場合には非表示にし、そうでなければその下の setToolTipPoint で座標と index に対応する remark をそれぞれ toolTipPoint の x,y,value にセットしています。

で、その下の decorator というとこに上記で作った tooltip タグを置いて、セットした State を渡してやってるわけですね。point と visible に分かれてて、これらをまとめて props として上記で受け取っていたわけですが、もしかして分ける必要もなくまた tooltip タグの方でも props じゃなく個別に展開して受け取るように書くべきでしょうか？

<br>

### 軸設定とグラフエリア

---

ここからは上手くいかなかったな、てことのメモ書きです。

グラフ化するライブラリなのに軸が設定できないのはどうなんでしょう。どうもデータポイントのｘの値は labels に、ｙの値は datasets.data に、それぞれ配列として入ってくけどこれらは Index で結びついているだけでｘ軸 y 軸に値に基づいてプロットされているわけじゃない。だからｘの値はデータポイントの数で単に等間隔に配置されちゃうし、困ったことにデータポイント少なすぎるとグラフエリア自体の幅が小さくなっちゃう。ここは本当にどうにかならないのかなって調べたり試行錯誤もしてみたけれど良い解決策見つからず、、、募集中です。

ついでに言うと backgroundColor も上手く処理されず、今回２つの Bottom tab で Chart は同じコンポーネントをそれぞれに渡す形でレンダーしていたらそれぞれのスクリーンで背景色の適用範囲が異なるという謎の事態に...backgroundGradientFrom/To の Opacity を０にして背景色なしで統一することに（０なら背景色自体設定しても意味なかった....）。

```javascript
chartConfig={{
                    //fillShadowGradient: '#fff'
                    //backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientFromOpacity: 0,   
                    backgroundGradientTo: '#fff',
                    backgroundGradientToOpacity: 0,
                    decimalPlaces: 0,
                    color: (opacity = 0.5) => `rgba(10, 10, 10, ${opacity})`,
                    style: {
                        borderRadius: 5,
                    },
                }}
```

<br>

### 軸タイトル設定  

---

もう一個は些細だけれどそれぞれの軸の単位が設定できないこと。軸タイトルではなく軸ラベルに yAxisLabel あるいは yAxisSuffix で文字列を追加する、という方式なので単位が全ラベルに引っ付く形に。。。

money と time のスクリーンで Daily chart のコンポーネントを共有しているので、money だったら単位を前に、time だったら単位（hour だけだけど）を後に付けるべくこのような形に。

```javascript
yAxisLabel={chartUnit!='hours' ? chartUnit + ' ' : ''}
yAxisSuffix={chartUnit=='hours' ? ' ' + chartUnit : ''}
```

<br>

## 所感

---

この辺触ってみると、R の ggplot て本当によくできてるよなぁ。。。React Native の方だったらもっといろんなパッケージがあるのかな。Expo に対応しているのがこの React-native-chart-kit だけって絶対困ると思うけど、みんな WebView とかで上手くやりすごしてるのかな？

今回はただただ苦戦したことの備忘録でした、みなさんの対応策を絶賛募集しております。
