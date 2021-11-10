FROM node:16.13.0-alpine

WORKDIR /usr/src/app

COPY dist ./dist
COPY package.json .

RUN npm install

CMD ["npm", "start"]
