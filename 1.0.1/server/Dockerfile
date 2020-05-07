FROM node:10.13.0-alpine
WORKDIR /app
COPY package* /app
COPY server.js /app
COPY proto app/
RUN npm install
EXPOSE 8080
CMD  ["node", "server.js"]