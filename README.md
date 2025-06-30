[![pages-build-deployment](https://github.com/hrjp/oneline_rosenv/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/hrjp/oneline_rosenv/actions/workflows/pages/pages-build-deployment)
[![Deploy to GitHub Pages](https://github.com/hrjp/oneline_rosenv/actions/workflows/deploy.yml/badge.svg)](https://github.com/hrjp/oneline_rosenv/actions/workflows/deploy.yml)
# oneline_rosenv

`oneline_rosenv`は、ROS (Robot Operating System) のDocker環境を簡単に生成するためのウェブアプリケーションです。GitHub Pagesで公開されており、直感的なUIを通じて、必要なROSバージョンやCUDAバージョン、その他のオプションを選択するだけで、対応する`docker run`コマンドを生成できます。

## 公開URL

このアプリケーションは以下のURLで公開されています。

[https://hrjp.github.io/oneline_rosenv](https://hrjp.github.io/oneline_rosenv)

## 機能

- **ROSバージョン選択**: Melodic, Noetic, Foxy, Humble, Jazzyなど、主要なROSディストリビューションから選択できます。
- **CUDAバージョン選択**: 選択したROSバージョンに基づいて、利用可能なCUDAバージョンが動的に表示されます。GPUサポートが必要な場合に選択します。
- **コンテナ名**: 生成されるDockerコンテナの名前を自動で提案し、必要に応じて変更できます。
- **共有フォルダ**: ホストマシンとコンテナ間でファイルを共有するためのパスを指定できます。
- **追加オプション**: GPU有効化、コンテナ終了時の自動削除、ホストネットワークの使用など、追加のDocker実行オプションを簡単に切り替えられます。
- **コマンドコピー機能**: 生成された`docker run`コマンドをワンクリックでクリップボードにコピーできます。
- **多言語対応**: 英語と日本語の表示を切り替えることができます。

## 使い方

1.  上記の公開URLにアクセスします。
2.  ウェブサイトのUIで、希望するROSバージョン、CUDAバージョン、コンテナ名、共有フォルダ、その他のオプションを選択します。
3.  選択内容に基づいて、リアルタイムで`docker run`コマンドが生成されます。
4.  「Copy」ボタンをクリックして、生成されたコマンドをコピーします。
5.  コピーしたコマンドをターミナルに貼り付けて実行することで、設定したROS Docker環境を起動できます。

## 開発について

このプロジェクトはReactで開発されており、GitHub Actionsを使用してGitHub Pagesに自動デプロイされます。

### ローカルでの実行

プロジェクトをローカルで実行するには、以下の手順に従ってください。

1.  リポジトリをクローンします。
    ```bash
    git clone https://github.com/hrjp/oneline_rosenv.git
    cd oneline_rosenv
    ```
2.  依存関係をインストールします。
    ```bash
    npm install
    ```
3.  開発サーバーを起動します。
    ```bash
    npm start
    ```
    ブラウザで `http://localhost:3000` を開くと、アプリケーションが表示されます。

### デプロイ

`master`ブランチにプッシュすると、GitHub Actionsが自動的にビルドとデプロイを行います。