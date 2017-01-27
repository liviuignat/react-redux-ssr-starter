## NodeJS - ReactJS, Redux, SSR, Flux, Jest, hot-reloading enabled project

[![Build Status](https://travis-ci.org/liviuignat/react-redux-ssr-starter.svg?branch=master)](https://travis-ci.org/liviuignat/react-redux-ssr-starter)

#### Install Commands

After running visit http://localhost:9300

```sh
# Install
yarn install flow-bin -g
yarn install

# Run in prod
yarn build        # run webpack build
yarn start        # start NodeJS server

# Run in dev
yarn build       # IMPORTANT! run webpack build before starting dev server
# run and watch dev which will
#  - start the app in 'development' mode
#  - hot reload server and client
#  - watch and run eslint and flow
yarn dev
yarn test         # run and watch tests
yarn test-once    # run tests once
flow              # check with flow for errors
```

#### Docker Commands
Adter docker run visit http://localhost:9300

```sh
docker build -t er-prism .
docker run -d -p 9300:9300 --name er-prism \
  -e SERVICE_NAME='er-prism' \
  -e SERVICE_TAGS='er-prism' \
  -e NODE_ENV='production' \
  -e PORT=9300 \
  -e NODE_PATH='./src' \
  er-prism
```
