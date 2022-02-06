FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Build app
COPY . .
RUN npm run build

CMD npm start
