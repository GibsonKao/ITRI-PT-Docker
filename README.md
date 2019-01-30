[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/knowlet/koa-starter.svg?branch=develop)](https://travis-ci.org/knowlet/koa-starter)

# itri-pt

A pentest tools collection with task management.

- Auto-NMAP-Script-Scanning-Tool
- autoExploit
- Gryffin-with-W3AF

※ Remember to init the submodules (Auto-NMAP-Script-Scanning-Tool -> module/nmap/Auto-NMAP-Script-Scanning-Tool, autoExploit -> module/exploit)

## Requirement

- node: 7.6 or higher
- yarn

## Installation

```
yarn
```

## Testing

```sh
yarn test
```

## DB Migration

### Starting a db

You can start a db by using docker

```sh
docker run --name koadb -p 3306:3306 --restart=always -e MYSQL_RANDOM_ROOT_PASSWORD=true -d mariadb:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
docker logs koadb 2>&1 | grep "GENERATED ROOT PASSWORD" | awk '{print $4}'
```

### Create databases

After entering the db password in src/models/config.json and then

```sh
cp src/models/config.sample.json src/models/config.json
cp config.sample.js config.js
node_modules/.bin/sequelize db:create --config src/models/config.json
```

## Start the server

### Development

The devServer mode will create controller when you add routing file in `routes` folder.

```sh
yarn dev
```
or use the pm2 watch mode (but won't create controller automatically).

```sh
yarn dev-pm2
```

### Production

```sh
yarn start
```

and serve `https://localhost:8443/dashboard` in your browser!
