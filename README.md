# shd-nayamimatch

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 要求定義書
### 役割

| PO（決済者） | |
| --- | --- |
| プロダクトマネージャー |  |
| 開発者 |  |
| デザイナー |  |
| ビジネス担当者 |  |
| 関連部署・担当者 |  |

### プロダクトコンセプト

### 背景

```
💡 記載ポイント

- 何を解決しようとしているのか？
- なぜこのプロダクトが(ビジネス・)ユーザーにとって重要なのか？
- 現在では(ビジネスや)ユーザーがどうその問題を緩和しているのか？
- 仮説を裏付ける証拠は？
```

- 子育ての悩みやモヤモヤをおおきく受け止め、軽くしたい
- 子育ての悩みや心配ごとはパターン化できないほど多種多様であり、「これはここ」と言える吐き出し口がない場合には何もできない
- SNSに投稿される漫画やエピソードに共感したり、情報まとめサイトなどで情報を発見することで緩和している

### 課題
  - 誰の
    - 子育てをしている人の
  - どんな([元データ](https://www.nhk.or.jp/gendai/comment/0028/topic018.html))
    - **ワンオペの苦しさ**
      - 「主人はコロナ診療をしています。ひどい時は一歳の子どもと全く接することできませんでした。毎日子どもと2人きりの生活。心が塞ぎ込み、頭にモヤがかかったような日々が続いています」（３０代後半・女性）
      - 「在宅勤務が増えた夫は、部屋にこもっていたり、好きな時間に起きてきたり、お昼なに？と聞かれたりと…モヤモヤは絶えません」（３０代前半・女性）
    - **孤独感**
      - 「子どもとふたりきりで、どこか息抜きにいくこともはばかられ、友だちに遊びにきてもらうこともできず毎日息が詰まるようでした。夜遅くに帰宅する夫も仕事に疲れてほとんど会話をしてくれず、人生で一番孤独を感じました」（３０代前半・女性）
      - 「自分の人生のなかの子育て期間がコロナに塗りつぶされそうで憂鬱になる」（３０代後半・女性）
    - **子育ての情報不足**
      - 「子どもは思い切り体を動かしたそうにしているのですが、忙しさのあまり上手な時間の使い方や遊ばせ方がわからず、家にこもりきりでこんなのでいいのかなあといつもモヤモヤしています。皆さんはコロナ禍で赤ちゃんとどんな過ごし方をしているのか知りたいです」（３０代後半・女性）
      - 「SNS上でしかつながれなくて、今まで大して悩みじゃなかったことも、もしかしてこれ私だけ…と視野がすごく狭くなってもやもやが増える」（４０代前半・女性）


### 仮説

#### ターゲットユーザー（顧客仮説）
- 言葉にできないモヤモヤを抱える子育て現在進行形の親

#### 問題設定（問題仮説）

- ユーザーが抱える問題
    - 情報をまとめたサイトで結局ほしい情報が見つからない
    - 相談窓口があるのは知っているが、相談先があっているのかわからない
    - 相談窓口が電話だけの場合、電話自体にハードルを感じる
    - 漠然としたモヤモヤを言語化すること自体がエネルギーが必要なので文字にして質問したり検索することが億劫
    - 悩みや心配ごとはパターン化できないほど多種多様であり、「これはここ」と言える吐き出し口がない場合には何もできない

- その問題の規模感(市場規模、ユーザーボリューム、競合環境)
    - 市場規模
        - ？
    - ユーザーボリューム
        - ？
    - 競合環境
        - ？
- **なぜ今か（市場にこのプロダクトを投入するタイミングが最適であると思う背景）**
    - コロナ禍で外出が規制され、課題が大きくなっている

### ユーザーへの提供価値（価値仮説）
- 悩みの種類・深さにしばられず、とりあえず話してみるだけで良いというインターフェースで、「ここでいいのかな？」という不安がなくなる。
- 誰かに伝わるような言語化をしなくてもよく、今感じていること、思いをそのまま話すだけで少し自分の気持ちを整理できる。
- 話した内容から悩みのポイントをある程度予測して集められた各種SNSやWebサイトからの関連情報から、心が軽くなるものや具体的な相談先が見つかります
- 同じような悩みを話した人が近所にいることがわかることで、自分だけではないという安心感を感じてもらい、次の行動への後押しができる。


### ゴール
```
💡 記載ポイント
- あなたのプロダクトの目標は何か？
- トレードオフが必要な場合の主な目標は何か？
```

### ソリューションの概要
- どんなお悩み・厳しい口調でもしっかり受け止めます
- あなたの言葉からお悩みキーワードを自動抽出します
- お悩みキーワードに関する情報をネットから集めて提供します

### 計測方法

### **主要指標（KPI）**
```
💡 記載ポイント

- このプロダクトが成功であるかどうかを図る指標について記述する
- 必要であれば指標だけでなく現在の基準値やクエリに関する情報も含める
```