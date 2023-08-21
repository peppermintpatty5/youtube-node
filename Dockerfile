FROM node:lts-alpine AS build
WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:lts-alpine AS final
WORKDIR /usr/src/app

COPY . .
COPY --from=build /usr/src/app/dist ./dist
RUN npm install --omit=dev

EXPOSE 3000
CMD [ "node", "dist/bin/www" ]
