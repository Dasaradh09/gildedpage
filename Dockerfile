# Use official Node.js LTS image
FROM node:18.20.2-slim

# Set working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Start the app
CMD ["node", "app.js"]