FROM node:12 as builder

ENV NODE_ENV build

WORKDIR /app
COPY ./package.json ./
COPY ./.json ./
RUN npm install
COPY . .
RUN npm run build

# ---

FROM node:12-alpine

WORKDIR /app
COPY --from=builder /app ./
CMD ["npm", "run", "start:prod"]
