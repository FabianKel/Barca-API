FROM node:21.6.2

WORKDIR /app

COPY package.json ./

RUN npm isntall

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]