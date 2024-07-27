# aolda-auth-middleware

## Description

Keycloak auth middleware for Aolda cloud

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
$ pnpm run start
```

## API

### /auth/userinfo
request
```json
need access token with Authorization header
```
response
```json
{
  "sub": "",
  "email_verified": true,
  "name": "Seongyeon Cho",
  "groups": [ "" ],
  "preferred_username": "yeonnnnjs",
  "given_name": "Seongyeon",
  "family_name": "Cho",
  "email": "sungyeon52@gmail.com"
}
```

### /auth/token
request
```json
{
  "code": "",
  "clientId": "",
  "redirectUri": ""
}
```
response
```json
{
  "access_token": "",
  "expires_in": 300,
  "refresh_expires_in": 1800,
  "refresh_token": "",
  "token_type": "",
  "id_token": "",
  "not-before-policy": 0,
  "session_state": "",
  "scope": ""
}

```