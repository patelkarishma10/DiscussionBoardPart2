FROM node:10 as base
COPY . .
COPY ./models .
COPY ./routes .
COPY ./validation .
RUN ls
RUN npm install
ENTRYPOINT ["node","server.js"]
