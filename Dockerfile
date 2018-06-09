FROM node:alpine

WORKDIR /app

ADD rollup.config.js package.json yarn.lock ./

RUN npm set registry https://npm.jackmac.party && yarn install

ADD . .

RUN npm run build

CMD npm start
