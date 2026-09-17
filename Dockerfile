# --- ステージ1: コンパイル（ビルド） ---
FROM node:20-alpine AS builder
WORKDIR /app

# パッケージ情報のコピーとインストール
COPY package*.json ./
RUN npm ci

# ソースコードのコピーとコンパイル（ビルド）
COPY . .
RUN npm run build

# --- ステージ2: パッケージング（実行用イメージの作成） ---
FROM nginx:alpine
# ビルド成果物をNginxの公開フォルダにコピー
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]