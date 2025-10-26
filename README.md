# E-commerce Product Management Dashboard (MERN) - Enhanced

This project is a MERN (MongoDB, Express, React, Node) Admin Dashboard with:
- Full CRUD for products
- Admin authentication (JWT)
- Tailwind (via CDN) UI
- Production-ready: server serves client build
- Ready for deployment (Render + Vercel or single Render deployment)

## How to run locally (beginner-friendly)

1. Download and extract the ZIP.
2. Create a MongoDB Atlas cluster and get the connection string.
3. In `server/` copy `.env.example` to `.env` and set:
   ```
   MONGO_URI=your_connection_string
   PORT=5000
   ADMIN_USER=admin
   ADMIN_PASS=admin123
   JWT_SECRET=change_this_secret
   NODE_ENV=development
   ```

4. Install & run backend:
   ```
   cd server
   npm install
   npm run dev
   ```

5. Install & run frontend:
   ```
   cd client
   npm install
   npm start
   ```

6. Visit `http://localhost:3000`. Login at `/login` (default admin/admin123).

## Production / Single Render deployment (recommended)

To deploy both frontend and backend together on Render:

1. Push the repository to GitHub.
2. On Render, create a **Web Service** from the repo.
3. Set the **Root Directory** to `/` (the project root).
4. Build Command:
   ```
   cd server && npm install && cd ../client && npm install && npm run build
   ```
5. Start Command:
   ```
   cd server && npm install && NODE_ENV=production node index.js
   ```
6. Environment variables on Render:
   - `MONGO_URI`
   - `ADMIN_USER`
   - `ADMIN_PASS`
   - `JWT_SECRET`
   - `PORT` (Render will set a port automatically; your app uses process.env.PORT)

Render will run the build and serve the client from the server.

## Notes
- For quick UI improvements, Tailwind is loaded via CDN in `client/public/index.html`.
- The protected routes (create/update/delete) require a valid JWT from `/api/auth/login`.
- This is an educational/demo project. For real production use, secure your JWT secret and admin credentials properly.
