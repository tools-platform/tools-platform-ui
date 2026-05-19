FROM node:22-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM caddy:2.10-alpine AS runner
COPY --from=build /app/dist /srv
EXPOSE 80
