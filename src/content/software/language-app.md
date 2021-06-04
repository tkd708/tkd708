---
layout: post
title: 'A language app using google API, Unstated and Asyncstorage'
author: [Naoya]
image: ../img/expo-logo2.jpg
date: '2019-10-01T23:46:37.121Z'
draft: false
tags:
  - Software
  - Mobile App
  - Expo
  - React Native
  - Google API
  - Unstated
  - Asyncstorage
excerpt: A prototype of ios app for language learning, focusing on google API, Unstated and Asyncstorage.
---

## 主に練習したかった機能

- Google 翻訳+axios での API 処理
- Unstated による状態管理
- Asyncstorage でのローカルストレージを用いた単語帳とタグ機能

ソースコードはこちら。

https://github.com/tkd708/language-app

さて、それでは個別にどんな感じで実装したか紹介！

## Google 翻訳+axios での API 処理  

まず翻訳機能を使うのに Google の API Key が必要になります。取得方法は下記参照。

https://cloud.google.com/translate/docs/quickstart-client-libraries

で、その API が公開されちゃうと困るので Public にならないようにする処理はこちら。

https://dev.to/robertchen234/how-to-use-google-translate-api-27l9

さて、翻訳部分の function はこんな感じで書きました。

```javascript
  onTranslate(){
    const URL = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}&source=${this.state.langFrom}&target=${this.state.langTo}&q=${this.state.convertedText}&format=text`;    
    axios.get(URL)
    .then(res => {
      this.setState({ outputText: res.data.data.translations[0].translatedText });
      return
  }).catch(err => {
      console.log('err:', err);
      return
  })
  }
```

API Key に加えて、source=の先に翻訳元言語、target=の先に翻訳先言語を設定して q=の先に翻訳元のテキストを入れる感じです。

これらは UI の Picker とか TextInput で入ってくる状態としました(このコンポーネント内のみで完結)。

ちなみに、format=text を足しとかないと特殊記号('とか各種アクセント記号とか、フランス語だと頻出)が翻訳先で出てきたときに文字コードで返ってきちゃうので注意。

API 使うのに定番の axios、下記がシンプルで分かりやすかった。

https://weblion303.net/1485

Google Translate 実装の部分で参考にしたのはこちら。

http://blog.zenof.ai/create-a-language-translation-mobile-app-using-react-native-and-google-apis

## Unstated による状態管理   

Google Translate API を用いて単語を翻訳してタグもつけて(components/AddScreen.js)、検索した単語を一覧表示する(components/ListScreen.js)のに、これらのコンポーネント間で単語の情報をやり取りするのに状態管理をする必要が出てきます（よね？）。

そこで状態管理といえば王道は Redux。。。なのは間違いないと思われますが、下記の記事にある通りこの程度の試作アプリにはコード量も増えてファイル構造も複雑化してかえって苦労するので、より手軽な unstated を採用。実際、Redux より遥かに手軽だと感じました。

https://qiita.com/kaba/items/b05f680f850dd46548f3

1. Store の役割も兼ねる Container を用意する(import した Container を extends)。Component 間をまたいで参照するような Function たちはこの Container の中に格納しました。

```javascript
export default class WordContainer extends Container {
  constructor(props) { 
        super(props);
        this.state = {
          loadingItems: false,
          allItems: [],
          allTags: [],
          taggedItems: [],
          isCompleted: false,    
        };
  }
```

2. 各 Component から Container を Subscribe する。(下記の例では AddScreen を WordContainer に Subscribe)

```javascript
const AddWrapper = () => (
  <Subscribe to={[WordContainer]}>
        {word => <AddScreen word={word} />}
      
  </Subscribe>
);
export default AddWrapper;
```

3. 全体を Provider で Wrap する。

```javascript
export default class App extends React.Component {
  render() {
    return (
      <Provider>
        <Navigator />
      </Provider>
    );
  }
}
```

こんなもんです。Container に格納された状態や関数にアクセスするには、下記のような書き方など。
(AAA は Subscribe 時に指定した定数、BBB は状態名、CCC は関数名)

```javascript
this.props.AAA.state.BBB;
this.props.AAA.CCC;
```

それなりに大規模アプリになって、コンポーネントも多数、開発人数も多数、となってこない限りは unstated でいいんじゃないかなぁ、と思った次第。

## Asyncstorage でのローカルストレージを用いた単語帳とタグ機能

こちらの機能の実装はほとんどが下記の Todo アプリのチュートリアルから。

https://pusher.com/tutorials/build-to-do-app-react-native-expo

変更点のほとんどが JS 関連のものでした。改めて RN 書くにも JS が基本なんだなと実感。。。

```javascript
onDoneAddItem = (input, output, tags) => {
  if (output !== '') {
    this.setState(prevState => {
      const id = uuid(); // create a new ID using uuid
      const newItemObject = {
        // create an object called newItemObject which uses the ID as a variable for the name.
        [id]: {
          id,
          isCompleted: false,
          wordIn: input,
          wordOut: output,
          tags: tags,
          createdAt: Date.now(),
        },
      }; // create a new object called newState which uses the prevState object, clears the TextInput for newInputValue // and finally adds our newItemObject at the end of the other to do items list.
      const newState = {
        ...prevState,
        allItems: {
          ...prevState.allItems,
          ...newItemObject,
        },
        taggedItems: {
          ...prevState.taggedItems,
          ...newItemObject,
        },
      };
      this.saveItems(newState.allItems);
      return { ...newState };
    });
  }
};

saveItems = newItems => {
  const saveItem = AsyncStorage.setItem('Words', JSON.stringify(newItems));

  let mergedTags = [];
  for (let i = 0; i < Object.values(newItems).length; i++) {
    mergedTags.push(...Object.values(newItems)[i].tags);
  }
  let filteredTags = mergedTags.filter(function (x, i, self) {
    return self.indexOf(x) === i;
  });
  this.setState({
    allTags: filteredTags,
  });
};

loadingItems = async () => {
  try {
    const loadedItems = await AsyncStorage.getItem('Words');
    const allItems = JSON.parse(loadedItems);
    let mergedTags = [];
    for (let i = 0; i < Object.values(allItems).length; i++) {
      mergedTags.push(...Object.values(allItems)[i].tags);
    }
    let filteredTags = mergedTags.filter(function (x, i, self) {
      return self.indexOf(x) === i;
    });
    this.setState({
      loadingItems: true,
      allItems: allItems || {},
      taggedItems: allItems || {},
      allTags: filteredTags,
    });
  } catch (err) {
    console.log(err);
  }
};

onTagPress = selectedTag => {
  let wordsWithTag = {};
  for (let i = 0; i < Object.values(this.state.allItems).length; i++) {
    if (Object(Object.values(this.state.allItems)[i]).tags.indexOf(selectedTag) >= 0) {
      //wordsWithTag.push(Object.values(this.state.allItems)[i]);
      let id = Object.values(this.state.allItems)[i].id;
      let content = Object.values(this.state.allItems)[i];
      var word = { [id]: content };
      let wordsWithTag = { ...wordsWithTag, ...word };
      this.setState({
        taggedItems: wordsWithTag,
      });
    }
  }
};
```

AsyncStorage だと JSON 形式のみなので、逐一 Stringify(上記内では saveItems)と Parse(上記内では loadingItems)しなくちゃいけないからあまりお勧めされないらしい。次は SQLite とか使いたいところ、、、

https://qiita.com/kaba/items/569aafd80889bb5d9328

この JSON 縛りのせいだからか(？)、onDoneAddItem のところで、ID(uuid から生成)を key とし、翻訳前後の単語やタグなどの情報を value とする、入れ子の object 構造を prevState に書き足していくという形式をとっている。そして更新された State を saveItem に送って AsyncStorage に書き込む。

これらは Todo アプリ記事に倣っていて、変更したのは allItems だけでなく taggedItems の Object を増やした点。加えて、saveItems と loadingItems の中にある mergedTags(全単語から付加された Tag をすべて一つの配列に Push したもの)、filteredTags(filter で重複をはじいたもの)、そして最後に allTags(filteredTags を setState)することによってタグ一覧を生成してる。onTagPress はタグを選んだときの Function で、一致するタグを持つ単語を配列（ここでは wordsWithTag)に入れるという作業を for で回して全探索して、その配列を別の状態で保存する(ここでは taggedItems)というやりかた。

これらの Function の s 下の方に DeleteItem, CompleteItem, IncompleteItem と続きますが参考にした Todo アプリ記事と丸被りなのでここでは省略。key にした ID を用いて削除や完了の操作をしている。

さてさて、長くなってしまったけれどこんな感じでした！
