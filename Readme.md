# [apollo-graphql-compose-mongoose boilerplate](https://github.com/abdghani/apollo-graphql-compose-mongoose)

[![](https://img.shields.io/badge/author-@abdullah-blue.svg)](https://github.com/abdghani)
[![GitHub license](https://img.shields.io/github/license/abdghani/apollo-graphql-compose-mongoose)](https://github.com/abdghani/apollo-graphql-compose-mongoose/blob/master/LICENSE)

## Salient Features
- Apollo graphql express server
- graphql-compose-mongoose
- JWT authenticaion
- Subscription

## Demo
Goto [graphql explorer](https://studio.apollographql.com/sandbox/explorer) and use [this link](https://apollo-gql-compose-mongoose.herokuapp.com/graphql)

### Redis

_Mac (using [homebrew](http://brew.sh/)):_

```bash
brew install redis
```

_Linux:_

```bash
sudo apt-get install redis-server
```

### COPY .env.example to .env

```bash
cp .env.example .env
```

**Note:** I highly recommend installing [nodemon](https://github.com/remy/nodemon).

nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
nodemon does not require any additional changes to your code or method of development. nodemon is a replacement wrapper for `node`, to use `nodemon` replace the word `node` on the command line when executing your script.
`yarn global add nodemon`.

### API Start

```bash
yarn start
yarn start:local # with nodemon
```

### Docker compose

```bash
docker-compose up -d --build
docker-compose -f docker-compose.dev.yml up --build # with nodemon
```

### ESlint Start

```bash
yarn lint
yarn lint:write # with prefix --fix
```

### API Structure

```bash
├─ src
│  ├─ graphql
│  │  ├─ index.js
│  │  ├─ schema.js
│  │  └─ types.js
│  ├─ middleware
│  │  ├─ authentication.js
│  │  ├─ authMiddleware.js
│  │  └─  index.js
│  ├─ module
│  │  ├─ user
│  │  │  ├─ service
│  │  │  │  ├─ index.js
│  │  │  │  └─ userService.js
│  │  │  ├─ index.js
│  │  │  ├─ resolvers.js
│  │  │  ├─ types.js
│  │  │  └─ user.js
│  │  └─ index.js
│  ├─ service
│  │  ├─ logger.js
│  ├─ validator
│  │  ├─ index.js
│  │  └─ userValidator.js
│  ├─ index.js
│  ├─ mongoose.js
│  └─ redis.js
├─ .dockerignore
├─ .env.example
├─ .eslintignore
├─ .eslint
├─ .gitignore
├─ Dockerfile
├─ Dockerfile.dev
├─ LICENSE
├─ README.md
├─ docker-compose.dev.yml
├─ docker-compose.yml
└─ package.json
```

## License

This project is an open-source with an [MIT License](https://github.com/abdghani/apollo-graphql-compose-mongoose/blob/master/LICENSE)
