---
layout: post
title: 'expo-auth-sessionとFirebase login (Google & Apple signin)'
author: [Naoya]
image: ../img/firebase-logo.png
date: '2022-01-28T23:42:37.121Z'
draft: false
tags:
  - Software
  - React Native
  - Expo
  - expo-auth-session
  - Firebase
excerpt: React Native + Expoでのアプリ開発におけるFirebaseログイン(今回はGoogleとApple)の実装の記録。
---

Google や Facebook でのログインを随分前に実装していたが、もたもたしてる間に Expo の authentication API に変化があったため更新することに。
また、2022 年 1 月現在 App Store に置く際に Google などのサードパーティログインを試用している場合 Apple ID でのログインも用意することが義務付けられているためこちらも実装。

<br>

## Google

Google ログインは依然は**expo-google-app-auth**と**expo-google-sign-in**を Expo Go と Standalone で使い分ける形にしていたが、これらは Deprecated となった。

[https://docs.expo.dev/versions/latest/sdk/google-sign-in/](https://docs.expo.dev/versions/latest/sdk/google-sign-in/)

後継は**expo-auth-session**で、Expo Go でも Standalone でも同様の実装で済む模様。

[https://docs.expo.dev/versions/latest/sdk/auth-session/](https://docs.expo.dev/versions/latest/sdk/auth-session/)

[https://docs.expo.dev/guides/authentication/#google](https://docs.expo.dev/guides/authentication/#google)

公式にある Firebase ログイン用の Google での Authentication のコードそのままでは動かず、provider と signInWithCredential の部分は下記のように書き換えた。

```javascript
React.useEffect(() => {
  if (response?.type === 'success') {
    const { id_token } = response.params;
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = provider.credential(id_token);
    firebase.auth().signInWithCredential(credential);
  }
}, [response]);
```

ちなみに expo-auth-session/providers/google の Google.useIdTokenAuthRequest を、他の事例見て Google.useAuthRequest で試したものの Expo Go では上手くいかなかった。

上記で Expo Go では無事ログインできたものの、テストフライトにおいてみたら Standalone ではこのようなエラーが。

Error 400: invalid_request
custom scheme URIs are not allowed for web client type

...iosClientId と androidClientId を設定してなかった。設定してみると上記のエラーはなくなったものの代わりに下記をいただく。

Error 400: redirect_uri_mismatch

[https://stackoverflow.com/questions/54333951/how-to-fix-redirect-uri-mismatch-error-while-using-expo-google-loginasync-in-r](https://stackoverflow.com/questions/54333951/how-to-fix-redirect-uri-mismatch-error-while-using-expo-google-loginasync-in-r)

どうも Bundle ID の設定に問題がある模様。
下記記事に従ってパッケージ名（Bundle ID）を**host.exp.exponent**にするという対処法を試す。というか依然この設定でログイン実装していたのにどこかのタイミングで自動生成された client ID に切り替えていたために Bundle ID も付随して変更されていたので、戻す形に。

[https://www.amelt.net/imc/app/6119/](https://www.amelt.net/imc/app/6119/)

- google-services.json >> client >> services >> appinvite_service >> other_platform_oauth_client >> client_id, bundle_id を変更
- GoogleService-Info.plist >> CLIENT_ID, RESERVED_CLIENT_IDm BUNDLE_ID を変更
- app.json >> ios >> config >> googleSignIn >> reservedClientId を変更 & extra の env.var IOS_clientId も変更

この状態で Expo Go でまず確認するも問題なし。まぁ Client ID の違いのみだろうから当然か。しかし Standalone では上記もダメだった。同じく Error 400: redirect_uri_mismatch

App.json の Bundle ID がアプリのサービス ID になっていたので host.exp.exponent で再挑戦。しかしこれは Buld の時点ではじかれた。

ということは Google OAuth2.0 のほうでアプリのサービス ID をにした client 作る必要があるのか。Google Cloud Platform で認証情報から OAuth2.0 Client ID を新規作成して、そちらの clientID と URL scheme で上記の各種ファイルを更新して再挑戦。

無事 Expo と Standalone 両方での動作を確認！

<br>

## Apple

そしてアプリのストア申請してから気づいた AppleID Signin の実装。

Apple Authentication 自体は公式の例そのままで ok。

[https://docs.expo.dev/versions/latest/sdk/apple-authentication/](https://docs.expo.dev/versions/latest/sdk/apple-authentication/)

あとは Apple 側からの credential 使って Firebase のログイン。

Google ログインの際は firebase.auth の provider は google 専用のものが用意されていたが Apple 用のものはないので generic な OAuthProvider で apple.com を指定。そこから credential に apple 側の credential から identityToken を idToken, authorizationCode を accessToken として provider に渡す。

```javascript
const provider = new firebase.auth.OAuthProvider('apple.com');
const credentialFirebase = provider.credential({
  idToken: credentialApple.identityToken,
  accessToken: credentialApple.authorizationCode,
});
firebase
  .auth()
  .signInWithCredential(credentialFirebase)
  .then(res => anyActionOnSignIn(res));
```

Error: The identity provider configuration is not found.

OAuth の AccessToken と IdToken が得られているのにエラー...? Firebase 側の設定のし忘れだった。

[https://zenn.dev/kazukimiyazato/scraps/80661848bd8ae5](https://zenn.dev/kazukimiyazato/scraps/80661848bd8ae5)

そして当然といえば当然ながら Apple Developer Console にも設定が必要。

[https://firebase.google.com/docs/auth/ios/apple?authuser=0](https://firebase.google.com/docs/auth/ios/apple?authuser=0)

Apple Developer Console の Identifiers にある Sign in with Apple で、Firebase 側から与えられた redirectURL を貼り付け。

Identifiers、standalone と Expo Go でそれぞれあるので両方に共通で追加したものの、依然エラー....

Error: The audience in ID Token [host.exp.Exponent] does not match the expected audience Y.

Y は Apple 側にある Bundle ID。[host.exp.Exponent]はどこで設定されてるのか....Apple 側の Bundle ID に置き換えなくちゃ。と思いきや逆に Firebase のプロバイダ設定側で Service ID を host.exp.Exponent に指定することでログイン成功。Standalone 時にはアプリの Bundle ID に切り替える必要あり。

[https://danielwsinger.medium.com/adding-sign-in-with-apple-to-a-managed-expo-app-using-firebase-authentication-ca331b4de05](https://danielwsinger.medium.com/adding-sign-in-with-apple-to-a-managed-expo-app-using-firebase-authentication-ca331b4de05)

Expo Go で動作確認後、Firebase のプロバイダ設定の Service ID をアプリの Bundle ID に変更することでテストフライト上の Standalone でも無事に動作を確認できた。上記記事の通り、公開後は Expo Go での確認には手間取るかな。。。
