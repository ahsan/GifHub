FROM node:10-alpine
MAINTAINER Abdullah Ahsan <ahsan.abdulah@gmail.com>

RUN mkdir -p /opt/exchange/
COPY . /opt/exchange/
WORKDIR /opt/exchange/

RUN npm install
RUN npm install -g pm2

EXPOSE 3000

CMD ["pm2", "start", "./index.js", "--no-daemon"]