# dat5live

dat5live is a prediction-market backend built with Bun, TypeScript, Express, and
MongoDB. It supports user authentication, user balances, market creation,
market browsing, order creation, order books, and market resolution.

## Requirements

- [Bun](https://bun.com/)
- MongoDB database

## Environment variables

Create a `.env` file in the project root:

```env
DB_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
JWT_TOKEN=replace-with-a-long-random-secret
```

- `DB_URI` is the MongoDB connection string.
- `JWT_TOKEN` is used to sign authentication cookies.

Do not commit the real `.env` file or any secret values.

## Installation and running

From the `day5Live` directory:

```bash
bun install
bun run server.ts
```

The server starts at:

```text
http://localhost:3000
```

Authentication uses an HTTP cookie named `token`. Send the cookie returned by
signup or signin with protected requests.

## API endpoints

### Authentication and user endpoints

#### `POST /api/auth/signup`

Creates a user and sets an authentication cookie.

```json
{
  "username": "kanak",
  "password": "password123"
}
```

`username` must contain at least 3 characters and `password` must contain at
least 6 characters.

#### `POST /api/auth/signin`

Signs in an existing user and sets an authentication cookie.

```json
{
  "username": "kanak",
  "password": "password123"
}
```

#### `GET /api/profile`

Returns the profile of the authenticated user.

Authentication: required.

#### `POST /api/onramp`

Adds money to the authenticated user's balance.

Authentication: required.

```json
{
  "amount": 1000
}
```

`amount` must be a positive integer.

#### `GET /api/balance`

Returns the authenticated user's current balance.

Authentication: required.

### Market endpoints

All market endpoints require authentication.

#### `POST /api/market`

Creates a market and its yes/no order books.

```json
{
  "title": "Will it rain tomorrow?",
  "totalIssued": 1000,
  "expiry": "31/12/2026"
}
```

The expiry date uses the `DD/MM/YYYY` format and must be in the future.

#### `GET /api/market`

Returns all markets, newest first.

#### `POST /api/market/createOrder`

Creates or matches an order for a market.

```json
{
  "marketId": "64f000000000000000000000",
  "side": "yes",
  "type": "buy",
  "qty": 10,
  "amount": 5
}
```

For a sell order, use `"type": "sell"`. `side` identifies the yes/no market
side, `qty` is the quantity, and `amount` is the order price.

#### `GET /api/market/orderBook`

Returns the buyers and sellers for an order book.

The current route is registered without URL parameters. The controller expects
`marketId` and `stockSide` as route parameters, so this endpoint currently
requires the route/controller parameter wiring to be aligned before those
values can be supplied through the URL.

### Admin endpoint

#### `POST /api/admin/resolve`

Resolves a market.

Authentication: intended for admin users.

```json
{
  "marketId": "64f000000000000000000000",
  "side": "yes"
}
```

`side` should be `yes` or `no`.

## Project structure

```text
server.ts                 Application entry point
src/app.ts                Express app and route registration
src/routes/               API route definitions
src/controllers/          Request handlers
src/middleware/           Authentication and validation middleware
src/model/                Mongoose models
src/db/                   MongoDB connection
```
