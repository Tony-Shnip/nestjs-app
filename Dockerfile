FROM node:14.18.2

WORKDIR /es-app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["/bin/sh", "start.sh"]