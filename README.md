
## Installation

```bash
$ npm install
$ npm run migration:run
```

## Setting up

```bash
$ setup a postgre sql database
$ setup db connection on src/config/database.ts
```

## Generating token

```bash
$ create a user manually on users table
$ username and password is not encrypted and is decoded literally as is for testing purposes
$ endpoint to generate JWT is POST - http://localhost:3000/v1/auth with  payload of 
{
    "username": "your-username",
    "password": "your-password"
}
```

## Sample Create Bot Endpoint

```bash
$ Create new bot
POST - http://localhost:3000/v1/bots/
Request Payload
{
    "name": "Bot number 1",
    "purpose": "for testing only"
}
Response Payload
{
    "user_id": 1,
    "avatar": "https://avatars.dicebear.com/api/bottts/ab734d62-e250-41dc-89b5-777f66b2ef41.svg",
    "name": "Bot qqqqq",
    "purpose": "For testing omly",
    "id": 11
}
```

## Things we can do to improve the current API

```bash
$ Hash Password
$ Create a Gateway Pattern/Or directly install https://avatars.dicebear.com/ for more flexible integrations
$ Create a Transformer/Serializers on Response to remove some weight on the controller
$ Write Tests
```
