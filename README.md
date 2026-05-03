# tools-platform-ui

Clean React frontend for Tools Platforms, a SEO-first website of practical online tools.

## Stack

- React
- TypeScript
- Vite
- ESLint
- Plain CSS

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Local Development

```bash
npm install
npm run dev
```

Default local URL:

```txt
http://localhost:5173
```

## Environment

The frontend consumes the API Gateway through `VITE_API_BASE_URL`.

```bash
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

If `VITE_API_BASE_URL` is not set, development defaults to `http://localhost:4000/api/v1` and production defaults to `/api/v1`. For a separated production backend, point it to the public gateway base URL, keeping the `/api/v1` prefix.
