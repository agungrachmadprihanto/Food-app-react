# Step 1: Build the React application
FROM node:20-alpine as build
WORKDIR /var/lib/jenkins/workspace/Food-App-Project
COPY package.json package-lock.json ./
COPY . .
RUN npm run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
