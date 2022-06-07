# tracker_generic_api

API used as reference in an service platform of vehicles tracking. </br>
<sub><sub>
API: _express.js + mongodb_ </br>
AUTH: _jwt + bcrypt_
</sub></sub>

## Features

- Auth
- Login/Register routes
- Access by roles
  - admin
    - Users: Request, Update, Delete
    - Devices: Create, Request, Update, Delete
    - Vehicles: Create, Request, Update, Delete
  - user
    - Vehicles: Create, Request, Update, Delete
  - device:
    - Devices: Update.

## How to use

```console
$ git clone https://github.com/mustaffxx/tracker_generic_api
$ cd tracker_generic_api
$ cp .env.example .env
$ npm install
$ npm run dev
```
