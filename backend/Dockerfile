FROM node:20-bullseye
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ENV PORT=5050 NODE_ENV=production SKIP_DB=true ALLOW_START_WITHOUT_DB=true
EXPOSE 5050
CMD ["node","server.js"]


