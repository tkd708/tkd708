---
layout: post
title: 'Expo MediaLibrary to select multiple photos'
author: [Naoya]
image: ../img/expo-logo2.jpg
date: '2020-07-25T23:46:37.121Z'
draft: false
tags:
  - Software
  - Mobile App
  - Expo
  - React Native
  - MediaLibrary
excerpt: How to select multiple photos in React Native + Expo app using MediaLibrary... ImagePicker has been an easy and popular way to select a photo, but not able to select multiple photos.
---

React Native ＋ Expo のアプリ開発で、ImagePicker では一枚ずつしか写真の選択ができない！

これまで写真の選択から加工まで ImagePicker ＋ ImageManipulator に頼り切ってたので意気消沈です。

そもそもなんで一枚ずつしか選択できないなんて仕様なんだ。

でもよくよく調べてみたら、MediaLibrary の方に写真や動画やらの扱いが搭載されているようですね。

[https://docs.expo.io/versions/v38.0.0/sdk/media-library/:title]

意外と例が見当たらなかったので、軽く触れておこうと思います。

## requestPermissionsAsync

ImagePIcker の時もですが、カメラロールにアクセスするには Permission が必要ですね。

```typeScript
const getPermissionAsync = async (): Promise<void> => {
        if (Platform.OS !== 'ios') return;
        const { status } = await MediaLibrary.requestPermissionsAsync();
        status !== 'granted' &&
            alert('Sorry, we need camera roll permissions to make this work!');
    };
```

## getAssetsAsync

そしてこちらが写真や動画にアクセスするメソッドです。公式にある通りですが、mediaType で写真か動画か両方かなどの指定、はじめからいくつのデータを取ってくるだとか、ID でいくつ以降だとか、日付でいつ以前・以降だとか、いろいろ指定できます。

下記の例では写真のみを指定し、今日から 2 週間前から最初の 10 枚を選択しています。

```typeScript
const media = await MediaLibrary.getAssetsAsync({
            first: 10,
            mediaType: ['photo'],
            createdAfter: moment(new Date()).add(-14, 'days').toDate(),
        });
```

## getAssetInfoAsync

そして、アクセスした写真や動画などのオブジェクトを、さらに getAssetInfoAsync の方に投げます。上記で複数選択している場合はオブジェクトの配列になっているので、map などで個々にメソッドに入れてやることになりますね。

```typeScript
 const photo = await MediaLibrary.getAssetInfoAsync(media.assets[4]);
```

これによって、uri をはじめ、location や orientation などの情報のほか、さらに詳細なメタデータ exif にもアクセスすることができます。

## 所感

まだ大量の写真で試してはいないけれど、ロケーションとかでデータを絞りたい場合は本当は getAssetsAsync の時点でそこまでアクセスできたらいいのになぁというところ。

getAssetsAsync では何千というデータにアクセスしてるはずだけど、メタデータ的な部分のみなので時間もさほどかかってないはず。

getAssetInfoAsync もそれほど問題ない、か？その後でメタデータを使ってフィルターなりして、ImageManipulator に渡して基本的な処理をするなどできるはず。

さて、またアプリ開発もいろいろいじってみよう！
