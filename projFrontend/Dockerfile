FROM node:18-alpine
WORKDIR /react-docker/
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . ./
CMD ["npm", "run", "dev", "--", "--host"]
