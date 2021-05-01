FROM node:12

RUN yarn install
COPY . .

CMD yarn serve