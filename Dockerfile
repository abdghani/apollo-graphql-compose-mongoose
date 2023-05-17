FROM node:18-alpine

WORKDIR /usr/src/app

RUN apk add yarn

COPY package.json ./

RUN yarn install

COPY ./ ./

EXPOSE 8001

CMD ["yarn", "start"]
