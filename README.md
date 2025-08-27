# Transaction Tracker - Backend

A lightweight backend for the Transaction Tracker app, built with Express, Upstash for rate limiting, and NeonDB for a serverless PostgreSQL database. Handles transaction data and user-related API requests.

## ✨ Features

- 🖥️ **Express** - Fast and minimal Node.js server
- 🛑 **Upstash** - Redis-based rate limiting for API requests
- 🗄️ **NeonDB** - Serverless PostgreSQL database for transaction storage
- 💸 **Transaction Endpoints** - CRUD operations for expenses and income

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- NeonDB account ([neon.tech](https://neon.tech)) for PostgreSQL
- Upstash account ([upstash.com](https://upstash.com)) for Redis

### Installation

1. Clone or download this repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file (see `.env.example`)
   - Add NeonDB connection string, Upstash Redis URL, and Clerk secret key

4. Run database migrations (if applicable):

   ```bash
   npm run migrate
   ```

5. Start the server:

   ```bash
   npm start
   ```

## 📁 Project Structure

```
├── src/
│   ├─ routes/      # API routes (e.g., transactions, users)
│   ├── middleware/  # Rate limiting and auth middleware
│   ├── db/          # Database connection and queries
│   └── index.ts     # Server entry point
├── .env.example     # Example environment variables
└── package.json     # Dependencies and scripts
```

## 🛠 Available Scripts

- `npm start` - Start the Express server
- `npm run dev` - Start with hot reload (using nodemon)
- `npm run migrate` - Run database migrations

## 📦 Customization

- **Database**: Modify `src/db` for custom queries or schema
- **Rate Limiting**: Adjust Upstash config in `src/middleware/rateLimit.ts`
- **API Routes**: Add or modify endpoints in `src/routes`

## 🚀 Deployment

Deploy to platforms like Vercel, Render, or AWS:

```bash
npm run build
```

Ensure environment variables are set in the hosting platform.

## 📄 License

MIT License
