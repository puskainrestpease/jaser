# Jaser

A real-time web messaging application with user authentication, conversations and a React-based client.

## Architecture

| Component | Technology |
| --- | --- |
| Frontend | React, Vite, React Router, Zustand |
| Backend | Node.js, Express |
| Data storage | MongoDB with Mongoose |
| Real-time communication | Socket.IO |
| Authentication | JSON Web Tokens and HTTP cookies |

The Express server exposes authentication, user and message routes under `/api`, and serves the compiled frontend from `frontend/dist`.

## Requirements

- Node.js
- npm
- MongoDB instance

## Configuration

Copy the example configuration to a local `.env` file in the repository root:

```bash
cp .env.example .env
```

Edit the values in `.env` for your environment:

```env
PORT=5000
MONGO_DB_URI=mongodb://127.0.0.1:27017/jaser
JWT_SECRET=replace-with-a-long-random-secret
NODE_ENV=development
```

Do not commit the `.env` file or production credentials.

## Install and build

Install backend dependencies:

```bash
npm install
```

Install frontend dependencies and build the client:

```bash
cd frontend
npm install
npm run build
cd ..
```

Start the backend:

```bash
npm run server
```

The application listens on port `5000` by default.

## Development

Run the frontend development server in a separate terminal:

```bash
cd frontend
npm run dev
```

## Project status

This repository contains the application source. Review the configuration and authentication implementation before exposing an instance to the public internet.
