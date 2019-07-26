FROM node:10 as base
COPY . .
RUN ls
RUN npm install
ENTRYPOINT ["node","server.js"]
