FROM node:22-alpine

ENV  MONGO_DB_USERNAME=admin \
     MONGO_DB_PWD=password


RUN mkdir -p /home/app

COPY package.json .
RUN npm install

COPY . .

CMD ["node", "server.js"]