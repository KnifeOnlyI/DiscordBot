FROM node:16.13.0-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY ./src ./src
COPY ./config ./config
COPY ./tsconfig.json ./tsconfig.json
COPY ./resources ./resources
RUN npm run build

CMD ["npm", "start"]
