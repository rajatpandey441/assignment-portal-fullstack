FROM node:17-alpine3.15

#COPY [host machine] [contaioner] => first path is relative to the DockerFile, second is relative to the container

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build