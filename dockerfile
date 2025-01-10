# Use Node.js 22.x as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files to the working directory
COPY . .

# Deploy the slash commands to the Discord's API (optional step depending on your setup)
CMD ["npm", "run", "deploy"]

# Start the bot
CMD ["npm", "start"]
