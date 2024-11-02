FROM node:18

WORKDIR /app


COPY package*.json ./


RUN yarn install

COPY . .

COPY ./dist ./dist

CMD [ "yarn" ,"start:prod"]