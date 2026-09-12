FROM node:24-alpine

COPY . /app
WORKDIR /app

RUN npm ci --omit=dev
RUN npm run build

CMD ["npm", "run", "start"]