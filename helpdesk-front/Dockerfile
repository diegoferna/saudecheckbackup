FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm install --production

RUN npm install -g ts-node

COPY . .

RUN npm install --only=production && npm cache clean --force && npm install -g typescript

RUN npm install

RUN npm run build

RUN npm install -g serve

RUN npx tsc

EXPOSE 3334

CMD ["serve", "-s", "build"]



