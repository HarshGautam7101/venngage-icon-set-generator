# Backend – Icon Generator API

TypeScript **Express** API that validates requests, builds prompts, and calls Replicate's FLUX Schnell model to generate icon URLs.

## Tech stack

- Node.js, Express, TypeScript
- Replicate JavaScript SDK

## Environment

Copy the example file and fill in real values:

```bash
cd backend
cp .env.example .env
```

Key variables:

- `PORT` – port for the API (default `5000`, often set to `5001` in this project).
- `REPLICATE_API_TOKEN` – Replicate API token from your account dashboard.

## Development

Install dependencies and run in watch mode:

```bash
npm install
npm run dev
```

The server logs incoming requests and basic Replicate progress to the console.

## Main endpoints

- `GET /api/icons/health` – basic health check used by the frontend.
- `POST /api/icons/generate` – generates a small set of icons.

Example request body:

```json
{
  "prompt": "toy",
  "styleId": "1",
  "colors": ["#FF6B6B", "#4ECDC4"]
}
```

The controller handles validation, delegates prompt-building to `PromptService`, calls `ReplicateService`, and returns an array of `{ url, index, prompt }` objects.


