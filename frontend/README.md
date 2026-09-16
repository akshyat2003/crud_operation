# User Directory Frontend

React and Vite frontend for the MongoDB user CRUD API in `../backend`.

## Run locally

Start the backend first so the frontend can load users:

```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run dev
```

Open a second terminal for the frontend:

```powershell
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, usually `http://localhost:5173`.

The frontend uses `http://localhost:5000/api` by default. To use another API URL, create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

## Features

The interface has four views:

- **All users**: list every user and refresh the list.
- **Add user**: create a user with a name and email.
- **Update**: select and edit an existing user.
- **Delete**: select and permanently remove an existing user.

## Checks

```powershell
npm run lint
npm run build
```

The backend must have a valid MongoDB connection in `backend/.env` before CRUD operations can work. See the backend README for the API endpoint details.
