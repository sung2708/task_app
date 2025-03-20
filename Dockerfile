FROM node:20

WORKDIR /app

COPY package*.json yarn.lock ./

RUN corepack enable && yarn set version stable

RUN yarn install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["yarn","start"]
