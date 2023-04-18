# Use a node.js base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the code to the container
COPY . .

# Install dependencies
RUN npm install

# Start the application
CMD ["node", "app.js"]
