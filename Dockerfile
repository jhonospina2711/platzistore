FROM node:22-alpine as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY . /app/

RUN npm run build --prod

#Segunda Etapa

FROM nginx:1.27.4-alpine-slim

COPY --from=build-step /app/dist/store /usr/share/nginx/html

