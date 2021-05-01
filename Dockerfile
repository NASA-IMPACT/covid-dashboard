FROM node:12

COPY . .
RUN yarn install

CMD yarn serve