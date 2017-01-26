FROM node:6.9.2-slim

RUN mkdir -p /src/app && cd /src/app
WORKDIR /src/app
COPY . /src/app
RUN npm install --production

WORKDIR /src/app
COPY . /src/app

RUN npm run build

ENV PORT=9300
EXPOSE 9300
CMD ["npm", "run", "start"]
