FROM node:20-alpine

WORKDIR /app

# Copy dependencies
COPY package*.json ./

RUN npm install

# Copy source and build React app
COPY . .

RUN npm run build

# Serve build files with nginx
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
