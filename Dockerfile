FROM node:16.13.2-alpine3.15

WORKDIR /app

ADD . .

RUN npm i

CMD npm run start