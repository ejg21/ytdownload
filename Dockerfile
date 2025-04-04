# Use official Node.js image as a base image
FROM node:16

# Install Python 3.10 and other dependencies
RUN apt-get update && apt-get install -y \
    python3.10 \
    python3.10-distutils \
    python3.10-venv \
    python3-pip \
    && apt-get clean

# Set the default Python version to 3.10
RUN update-alternatives --install /usr/bin/python3 python3 /usr/bin/python3.10 1

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Install yt-dlp via pip (python package manager)
RUN pip3 install --no-cache-dir yt-dlp

# Copy the rest of the application files
COPY . .

# Expose the application port (if applicable)
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
