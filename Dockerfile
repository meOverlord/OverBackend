FROM node:12 as builder

ENV NODE_ENV build

WORKDIR /app
COPY ./package.json ./
COPY ./.env ./
RUN npm install
COPY . .
RUN npm run build

# ---

FROM node:12-alpine

WORKDIR /app
COPY --from=builder /app ./
ENV PORT 8080
CMD ["npm", "run", "start:prod"]
