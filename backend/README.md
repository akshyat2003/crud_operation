# Backend API

Express and MongoDB API for managing users.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to your local MongoDB or MongoDB Atlas connection string.
3. Install dependencies and start the API:

```sh
npm install
npm run dev
```

The API runs on `http://localhost:5000` by default.

## Endpoints

- `GET /api/health` - Check API status
- `GET /api/users` - List users
- `GET /api/users/:id` - Get one user
- `POST /api/users` - Create a user with `{ "name": "Ada Lovelace", "email": "ada@example.com" }`
- `PUT /api/users/:id` - Update a user's name or email
- `DELETE /api/users/:id` - Delete a user
