[![CircleCI](https://dl.circleci.com/status-badge/img/gh/Azowyl/coveralls-go/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/gh/Azowyl/coveralls-go/tree/main) [![Coverage Status](https://coveralls.io/repos/github/Azowyl/coveralls-go/badge.svg?branch=main&kill_cache=1)](https://coveralls.io/github/Azowyl/coveralls-go?branch=main)

## Coveralls go

Simple node integration for coveralls, currently it only supports jest and circleci

## Setup

```bash
npm install coveralls-go
```

or

```bash
yarn add coveralls-go
```

You need to add `REPO_TOKEN` environment variable. You can obtain your repo token from [coveralls](https://coveralls.io/)

## Example usage

### Jest

```bash
jest --ci --runInBand --coverage && coveralls-go
```
