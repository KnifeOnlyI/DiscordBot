FROM node

WORKDIR /usr/src/app

COPY dist ./dist
COPY package.json .

RUN npm install

CMD ["npm", "start"]
