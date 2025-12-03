# Icon Generator – Fullstack App

Fullstack icon set generator built with **React + TypeScript** on the frontend and **Node.js/Express + TypeScript** on the backend.  
The frontend talks only to the backend; the backend calls Replicate's **FLUX Schnell** model to generate icons.

## Project structure

- `backend/` – Express API that validates requests, builds prompts and calls Replicate.
- `frontend/` – React UI for entering prompts, picking styles/colors and downloading icons.

## Prerequisites

- Node.js 18+ (recommended)
- A Replicate account and **API token**

## Quick start

1. **Clone and install dependencies**

```bash
cd icon-generator-fullstack

cd backend
npm install

cd ../frontend
npm install
```

2. **Configure environment variables**

Backend:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and set:

- `REPLICATE_API_TOKEN` – your Replicate API token
- `PORT` (optional, default `5000` – this project commonly uses `5001`)

Frontend:

```bash
cd ../frontend
cp .env.example .env
```

Edit `.env` and set:

- `REACT_APP_API_URL` – usually `http://localhost:5001/api`

3. **Run the backend**

```bash
cd backend
npm run dev
```

4. **Run the frontend**

In a separate terminal:

```bash
cd frontend
npm start
```

The React app will open in the browser and talk to the running backend.

## Scripts (summary)

- Backend: `npm run dev` – start API with nodemon.
- Frontend: `npm start` – start React dev server.


