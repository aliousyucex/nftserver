FROM node:16.13.2-alpine3.15

WORKDIR /user/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]