FROM node:24-alpine AS build

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build


FROM node:24-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

COPY --from=build /app/dist ./dist

RUN npm ci --omit=dev

USER node

CMD ["npm","run","start"]