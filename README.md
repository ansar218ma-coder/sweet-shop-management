# Sweet Haven — MERN Sweet Shop Management System

Two separate React/Vite frontends (customer and admin) share one Express API and MongoDB database.

## Requirements
- Node.js 18+ and npm
- MongoDB locally or a MongoDB Atlas connection string

## Setup
1. Start MongoDB or create a MongoDB Atlas database.
2. In `backend/`, copy `.env.example` to `.env` and set `MONGODB_URI`, a long random `JWT_SECRET`, and a strong admin password.
3. Install dependencies in each app:
   - `cd backend && npm install`
   - `cd admin && npm install`
   - `cd customer && npm install`
4. From `backend/`, run `npm run seed:admin` to create the initial admin account and insert sample products.
5. Open three terminals and run `npm run dev` inside `backend/`, `admin/`, and `customer/`.
6. Open customer website at http://localhost:5173 and admin website at http://localhost:5174. API health check: http://localhost:5000/api/health.

## Admin login
The seed account uses `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `backend/.env`. The default values in `.env.example` are examples only; replace them before seeding. Never use an example password in a public deployment.

## Environment variables (`backend/.env`)
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/sweet_shop
JWT_SECRET=replace_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
ADMIN_URL=http://localhost:5174
ADMIN_NAME=Shop Administrator
ADMIN_EMAIL=admin@sweetshop.local
ADMIN_PASSWORD=ChangeThisPassword123!
```

Optional: set `VITE_API_URL=http://localhost:5000/api` in either frontend's `.env` if the API uses a different URL.

## Main API routes
- `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`
- `GET /api/products`, `GET /api/products/:id`
- Admin product mutations: `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- `POST /api/orders`, `GET /api/orders/my-orders`, `GET /api/orders/:id`
- Admin: `GET /api/admin/dashboard`, `GET /api/admin/orders`, `PATCH /api/admin/orders/:id/status`, `GET /api/admin/customers`, `GET /api/admin/reports/sales`
- `POST /api/contact`

## Security notes
- Public registration always creates a customer; it ignores any requested role.
- Admin routes require a valid JWT and the admin role. Seed the first admin with the script.
- Passwords are hashed with bcrypt. Order prices are loaded from MongoDB, and stock is checked and decremented within a transaction. Use a MongoDB replica set (Atlas supports this) for transactions; a standalone local MongoDB may need replica-set configuration for checkout transactions.
- Configure production CORS origins and HTTPS before deployment. Product image URLs are supported; file upload hosting is not configured in this starter. Online payments are not integrated; checkout uses Cash on Delivery.

## Tests / verification
After starting the API, check `/api/health`. Use Postman to test registration/login, product listing, admin-only routes, checkout, and status updates. Test both websites at desktop and mobile widths. This archive is a source project starter; install dependencies and run the checks in your environment.
