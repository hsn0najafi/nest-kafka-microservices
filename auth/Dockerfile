FROM node:latest AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --quiet
COPY ./ ./
RUN npm run build

FROM node:lts-alpine AS final
WORKDIR /app
COPY package*.json ./
RUN npm ci --quiet --omit=dev
COPY --from=builder /app/dist ./dist
COPY .env ./
CMD ["npm", "run", "start:prod"]
