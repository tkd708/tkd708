---
layout: post
title: 'Life Report 3. React Navigation v5'
author: [Naoya]
image: ../img/lifereport.png
date: '2020-03-21T23:46:37.121Z'
draft: false
tags:
  - Software
  - Mobile App
  - React Navigation
  - Expo
  - React Native
excerpt: Some technical notes on my first ios app "Life Report". This article focuses on React Navigtaion v5.
---

React Native と Expo による家計簿アプリ開発記録、今回はページングで定番の**React Navigation (v5)**の紹介になります。

本記事のコードを含むファイルなどはこちら。

https://github.com/tkd708/Life-Report/blob/master/Router.js

<br>

## React Navigation

---

https://reactnavigation.org/

自分が今回のアプリに取り掛かり始めたころはまだ React Navigation v4 だったのですが、ゆーーっくり開発している間に v5 が出てしまいました。

これまた日本語で解説してくださっている素晴らしい記事がいくつかありますので、ぜひ参考に。

https://qiita.com/YutamaKotaro/items/e3bc6a16237fc241ef7c

https://qiita.com/shinnoki/items/e32e20b812606ce7219c

英語での例もいくつか貼っときます。

https://medium.com/dooboolab/react-navigation-v5-news-and-examples-7d885d537aae

https://blog.yikkok.com/2019/09/22/react-navigation-version-5-0/

<br>

### App.js でのラップ

---

多少書き方が変わっただけで、最上層の Navigator をラップする、というのは変わりませんね。

注意点としては、一番最初に import 'react-native-gesture-handler'を持ってくるように、とのこと。

下記で Router.js に書かれている Navigator の中身を解説していきます。

```javascript
import 'react-native-gesture-handler';
import React from 'react';
import { Navigator } from './Router';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'unstated';

//Provider must wrap all the components to have share the states
export default class App extends React.Component {
  render() {
    return (
      <Provider>
                        
        <NavigationContainer>
                              
          <Navigator />
                          
        </NavigationContainer>
                    
      </Provider>
    );
  }
}
```

<br>

### Router.js での Import

---

基本的な使い方として、import { creatXNavigator } from @react-navigation/X 　というようにスタックやタブやドロワーや、X にあたる部分を書き換えてそれぞれインポートし、それらのインスタンスを指定することになります。

```javascript
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
```

<br>

### Stack

---

X.Screen でスクリーンを指定し、さらにその中で options としてヘッダーなど指定できます。

自分は後に設定する Drawer を開くいわゆるハンバーガーアイコンをヘッダーに置きたかったので、それぞれのスタックで指定しました。

この Stack は下記にあるように Bottom tab に渡されるんですが、そちらの option でまとめてヘッダー指定...とはできず。

```javascript
const RecordStack = () => {
  return (
    <Stack.Navigator>
                  
      <Stack.Screen
        name="Record expenses"
        component={RecordWrapper}
        options={({ navigation }) => ({
          headerLeft: () => (
            <FontAwesome
              name="bars"
              size={24}
              onPress={() => {
                navigation.openDrawer();
              }}
              style={{ paddingLeft: 20 }}
            />
          ),
        })}
      />
              
    </Stack.Navigator>
  );
};
```

<br>

### Tab

---

で、作ったそれぞれの Stack を下記のように Bottom tab に渡しました。

ここの screenOptions では Bottom tab のアイコンを route.name によって指定しつつ active かどうかで色を分けてる感じです。

見直したら focused のとこ使ってないし、if 文も三項演算子でやればよかったな。

```javascript
const RecordBottomTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Record') {
            iconName = 'pluscircleo';
          } else if (route.name === 'Report') {
            iconName = 'piechart';
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'dodgerblue',
        inactiveTintColor: 'gray',
      }}
    >
                  
      <Tab.Screen name="Record" component={RecordStack} />
                  
      <Tab.Screen name="Report" component={ReportStack} />
              
    </Tab.Navigator>
  );
};
```

<br>

### Drawer

---

特にアプリらしい挙動の Drawer。

自分の場合これが最上層の Navigator になってるので、最初の App.js でラップするために export されてます。

Bottom tab の時と同じ要領で、アイコンを指定しています。

```javascript
export const Navigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Record expenses"
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Record expenses') {
            iconName = 'addfile';
          } else if (route.name === 'Daily chart') {
            iconName = 'linechart';
          } else if (route.name === 'Setting') {
            iconName = 'setting';
          }
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'dodgerblue',
        inactiveTintColor: 'gray',
      }}
    >
                  
      <Tab.Screen name="Record expenses" component={RecordBottomTab} />
                  
      <Tab.Screen name="Daily chart" component={DailyChartBottomTab} />
                  
      <Tab.Screen name="Setting" component={SettingStack} />
              
    </Drawer.Navigator>
  );
};
```

<br>

### useIsFocused

---

Router での諸々とは別に取り上げたかったのが、この useIsFocused。

Bottom Tab なんかでスクリーンを移動したときに、その挙動に合わせて関数を実行したい時なんかに便利。

https://reactnavigation.org/docs/function-after-focusing-screen

自分の場合、記録しているお金と時間の Daily chart を Bottom Tab それぞれ配置していて、けど Chart そのものは同じコンポーネントで、Bottom Tab の Focus してるスクリーンによって Chart に入るデータを切り替える必要があった。

このためにわざわざ v5 に書き換えたといっても過言ではない（同様の機能のものが v4 以前でもあったかもしれないけど知らなかった)。

こちら、前回記事で載せたのと同じコードなんですが改めて。インポートした useIsFocused のインスタンスを作ると、それがそのままそのスクリーン（タブ）を開いているかどうかの Boolean 型の変数になるので、それを useEffect の配列に入れつつ、内部の関数実行の条件にもしています。これが反対側のタブ（このタブは Money の方なので、反対は Time）にも書かれていて、タブを移るたびにそれぞれで指定された関数が実行される、というもの。

```javascript
import { useIsFocused } from '@react-navigation/native';

const DailyReportScreenMoney = ({ container }) => {

const isFocused = useIsFocused();
    const [categorySelected, setCategory] = useState('Daily total')
    const [lowerDate, setLowerDate] = useState(moment(new Date()).add(-28, 'days').format('YYYY-MM-DD'))
    const [upperDate, setUpperDate] = useState(moment(new Date()).add(0, 'days').format('YYYY-MM-DD'))

    useEffect(　() => {
        isFocused && container.getDailyExpenses("Money", categorySelected, lowerDate, upperDate)
    },
        [isFocused, categorySelected, lowerDate, upperDate])
```

この挙動、あるいは Unstated の container に Router.js の方からアクセスできれば各 Navigation の options からアイコンを操作したみたいにして container の method を実行できたのかも。でも最上層の Navigator をラップしても、該当する Navigator をラップしても上手くいかなかった...単に書き方がどこかおかしかったのかもしれない。実例あれば見てみたいし、どなたかご教授いただければ幸いです。

<br>

## 所感

---

これまたささやかな実装例にとどまってますが、v5 では Hooks を全面的に導入してさまざまな動きが可能となっているみたいです。

今後のアプリ開発でも間違いなくお世話になる React Navigation、まだまだ開拓していきたいですね。
