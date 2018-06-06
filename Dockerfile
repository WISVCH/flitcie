FROM node:8 AS builder

WORKDIR /usr/app

RUN chown -R node:node .
USER node
COPY package.json package-lock.json ./
RUN npm install
COPY src/ src/
COPY index.html index.css gulpfile.js manifest.json ./
RUN npm run build

FROM wisvch/nginx
USER root
COPY --from=builder /usr/app/dist/. /srv/www/
COPY nginx_server.conf /etc/nginx/conf.d/default.conf
