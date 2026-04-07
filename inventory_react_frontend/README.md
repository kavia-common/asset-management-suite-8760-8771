# Inventory React Frontend

Modern React frontend for the Asset / Inventory Management System.

## Local development

### Prerequisites

- Backend API running (default: `http://localhost:3001`)
- DB container running (MongoDB) and backend configured to connect to it

### Environment variables

Create a `.env` file in this folder (Create React App format):

- `REACT_APP_API_BASE_URL=http://localhost:3001`

This controls where the frontend sends API requests.

### Run

```bash
npm install
npm start
```

App will be available at:

- `http://localhost:3000`

## End-to-end (frontend ↔ backend)

1. Start DB container (MongoDB) and ensure backend has:
   - `MONGODB_URL`
   - `MONGODB_DB`

2. Start backend with CORS enabled for the frontend:
   - `ALLOWED_ORIGINS=http://localhost:3000`

3. Start this frontend with:
   - `REACT_APP_API_BASE_URL=http://localhost:3001`

## Notes

- The frontend stores the JWT token in localStorage and sends it as `Authorization: Bearer <token>`.
- If backend CORS is misconfigured you may see browser CORS errors; ensure `ALLOWED_ORIGINS` is explicitly set (not `*`).
