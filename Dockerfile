FROM node:22-alpine
RUN apk add --no-cache bash
WORKDIR /app

# パッケージの設計図を先にコンテナに渡してインストールする
COPY ./deepaudio-frontend/package*.json /app
RUN npm install

COPY ./deepaudio-frontend /app
# 起動した時に自動でViteの開発サーバーを立ち上げる
CMD ["npm", "run", "dev", "--", "--host"]
