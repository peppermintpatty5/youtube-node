FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build app
COPY . .
RUN npm run build

CMD [ "node", "dist/bin/www.js" ]
