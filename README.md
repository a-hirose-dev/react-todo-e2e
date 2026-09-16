<div id="top"></div>

## 使用技術一覧

<p style="display: inline">
  <img src="https://img.shields.io/badge/-Node.js-000000.svg?logo=node.js&style=for-the-badge">
  <img src="https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
  <img src="https://img.shields.io/badge/-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/-githubactions-FFFFFF.svg?logo=github-actions&style=for-the-badge">
  <img src="https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white">
</p>

## 目次

1. [プロジェクトについて](#プロジェクトについて)
2. [環境](#環境)
3. [ディレクトリ構成](#ディレクトリ構成)
4. [開発環境構築](#開発環境構築)
5. [トラブルシューティング](#トラブルシューティング)

## プロジェクト名

TypeScript + React (Vite) タスク管理アプリ

## プロジェクトについて

次回案件でのCD（自動デプロイ）構築およびMagicPod / Autify等での画面自動テスト（E2E）の予行演習を目的としたCRUD（作成・読み込み・更新・削除）タスク管理アプリケーションです。

### 主な機能・特徴

- **タスクのCRUD機能**: タスクの追加・編集・削除およびステータス変更（未着手／進行中／完了）
- **データの永続化**: `useEffect` を利用した `localStorage` へのタスクデータ保存・自動読み込み
- **E2Eテスト最適化**: E2Eテストツール（MagicPod/Autify）で操作・検証しやすいよう各要素へ `data-testid` 属性を付与
- **CD（自動デプロイ）**: GitHub Actions を利用し、`main` ブランチへの Push 時に Vercel へ自動デプロイ

<p align="right">(<a href="#top">トップへ</a>)</p>

## 環境

| 言語・フレームワーク・ツール | バージョン |
| ---------------------------- | ---------- |
| Node.js                      | 20.x 以上  |
| React                        | 18.x       |
| TypeScript                   | 5.x        |
| Vite                         | 5.x        |
| GitHub Actions               | -          |
| Vercel                       | -          |

その他のパッケージのバージョンは package.json を参照してください

<p align="right">(<a href="#top">トップへ</a>)</p>

## ディレクトリ構成

❯ tree -a -I "node_modules|.git" -L 2
.
├── .github
│ └── workflows
│ └── deploy.yml
├── index.html
├── package-lock.json
├── package.json
├── src
│ ├── App.css
│ ├── App.tsx
│ ├── assets
│ ├── index.css
│ ├── main.tsx
│ └── vite-env.d.ts
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

<p align="right">(<a href="#top">トップへ</a>)</p>

## 開発環境構築

### パッケージのインストールと起動

依存パッケージをインストールします。

npm install

以下のコマンドでローカル開発サーバーを起動します。

npm run dev

### 動作確認

http://localhost:5173 にアクセスできるか確認
アクセスできたら成功

### 環境変数の一覧 (GitHub Secrets)

GitHub Actions を利用した Vercel への自動デプロイに必要な環境変数です。  
GitHub リポジトリの `Settings` > `Secrets and variables` > `Actions` に設定します。

| 変数名            | 役割                                            | デフォルト値 | DEV 環境での値 |
| ----------------- | ----------------------------------------------- | ------------ | -------------- |
| VERCEL_TOKEN      | Vercel API アクセストークン                     | -            | -              |
| VERCEL_ORG_ID     | Vercel 組織 ID (`.vercel/project.json`)         | -            | -              |
| VERCEL_PROJECT_ID | Vercel プロジェクト ID (`.vercel/project.json`) | -            | -              |

### コマンド一覧

| npm コマンド    | 実行する処理                   | 元のコマンド                                                              |
| --------------- | ------------------------------ | ------------------------------------------------------------------------- |
| npm run dev     | 開発サーバーの起動             | npx vite                                                                  |
| npm run build   | プロダクションビルド           | npx tsc && vite build                                                     |
| npm run preview | ビルド後のローカルプレビュー   | npx vite preview                                                          |
| npm run lint    | コードの静的解析（Linter実行） | eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 |

## トラブルシューティング

### Node.js のバージョンエラーが発生する

Node.js のバージョンが古い可能性があります。`node -v` を実行し、`v18` 以上（推奨: `v20` 以上）になっているか確認してください。

### GitHub Actions でデプロイが失敗する

GitHub リポジトリの `Secrets` に `VERCEL_TOKEN`、`VERCEL_ORG_ID`、`VERCEL_PROJECT_ID` の3つが正しく設定されているか確認してください。

### ブラウザをリロードするとタスクが消えてしまう

`localStorage` の読み込み処理（`useEffect`）でエラーが発生しているか、ブラウザのシークレットモード等でストレージへの書き込みがブロックされている可能性があります。

<p align="right">(<a href="#top">トップへ</a>)</p>
