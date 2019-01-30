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
- docker

## Installation Guide

### Install Node.js & Yarn
```sh
apt update 
apt dist-upgrade -y
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash
nvm install 8 --lts
```

IMPORTANT: After Installed NVM, it need to restart terminall
And change Directory in ITRI-PT-Develop
```sh
npm i -g yarn
node -v
apt install libzmq3-dev
yarn
yarn run dev
```

#### Testing yarn

```sh
yarn test
```

### Install Docker

#### Add Docker PGP Key
```sh
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -
```

#### Configure Docker apt repository
```sh
echo 'deb https://download.docker.com/linux/debian stretch stable' > /etc/apt/sources.list.d/docker.list
```

#### Update
```sh
apt-get update
```

#### Install

##### As we want a clean installation, what we do is verify that there are no obseleta versions and we give it
```sh
apt-get remove docker docker-engine docker.io
```
##### and install

```sh
apt-get install docker-ce
```

#### Verify if it was installed correctly & Watch the version
```sh
docker run hello-world
docker version
```

#### Start Docker || start Docker automatically upon reboot
```sh
systemctl start docker
||
systemctl enable docker
```

## DB Migration

### Starting a db

You can start a db by using docker

```sh
docker run --name koadb -p 3306:3306 --restart=always -e MYSQL_RANDOM_ROOT_PASSWORD=true -d mariadb:latest --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```
and Get DB Password
```sh
docker logs koadb 2>&1 | grep "GENERATED ROOT PASSWORD" | awk '{print $4}'
```
like this: eud7eezarubohquei7Faephohhohngei

### Create databases

Copy Sample config json & js files
```sh
cp src/models/config.sample.json src/models/config.json
cp config.sample.js config.js
```

Entering the db password in src/models/config.json
```sh
vim ./src/models/config.json
```

Paste password in "password":"" like this
```sh
"password":"eud7eezarubohquei7Faephohhohngei"
```

After that 
```sh
npm install --save sequelize-cli
node_modules/.bin/sequelize db:create --config src/models/config.json
```

### Create NMAP & Gryffin-W3AF docker

```sh
docker build module/nmap -t auto-nmap
docker build module/w3af -t gryffin-w3af
```
If we upgraded any modules, we need to re-build docker image

## Start the server

### Login Information
UserName: root
Password: toor

### Start Docker
```sh
systemctl start docker
docker run --name auto-nmap -d auto-nmap:latest
docker run --name gryffin-w3af -d gryffin-w3af:latest
```

### Start Metasploit Framework RPC
```sh
syntax: msfrpcd -S -U <UserName> -p <Port> -P <Password>
# <UserName>, <Password> and <Port> record in config.ini
# path: itri-pt-develop/modules/exploit/config.ini

msfrpcd -S -U msf -p 55552 -P abc
```

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
