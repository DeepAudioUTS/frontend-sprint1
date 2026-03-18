FROM node:22-alpine
WORKDIR /app

# パッケージの設計図を先にコンテナに渡してインストールする
COPY package*.json ./
RUN npm install

# 起動した時に自動でViteの開発サーバーを立ち上げる
CMD ["npm", "run", "dev", "--", "--host"]
