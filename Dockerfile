# Use official Node.js image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and pnpm-lock.yaml files
COPY package.json pnpm-lock.yaml ./

# Install pnpm and project dependencies
RUN npm install -g pnpm && pnpm install

# Copy the rest of the project files
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Run the application
CMD ["pnpm", "run", "dev"]
