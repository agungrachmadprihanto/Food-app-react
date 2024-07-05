# Step 1: Build the React application
FROM node:20-alpine as build
WORKDIR /var/lib/jenkins/workspace/food-app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /var/lib/jenkins/workspace/food-app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
