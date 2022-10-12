FROM node:16-alpine

WORKDIR /usr/src/app

RUN apk update && apk add bash && apk add --no-cache tzdata

COPY package*.json ./

RUN yarn install

COPY . /usr/src/app

CMD yarn start