FROM node:18-alpine

WORKDIR /usr/src/app

# パッケージ情報をコピーして TypeScript の依存関係をインストール
COPY package*.json ./
RUN npm install

# TypeScript をインストール（必要ならグローバルにも）
RUN npm install -g ts-node

# アプリのコードをコピー
COPY . .

# ポートを開放
EXPOSE 6010

# TypeScript を直接実行
# CMD ["npm","start"]
