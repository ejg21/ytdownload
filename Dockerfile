# Use official Node.js image as a base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Install yt-dlp via pip (python package manager)
RUN apt-get update && apt-get install -y python3-pip
RUN pip3 install yt-dlp

# Copy the rest of the application files
COPY . .

# Expose the application port (if applicable)
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
