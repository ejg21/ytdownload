# Use official Node.js image as a base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Install Python 3.10 and yt-dlp dependencies
RUN apt-get update && apt-get install -y \
    software-properties-common \
    && add-apt-repository ppa:deadsnakes/ppa \
    && apt-get update && apt-get install -y \
    python3.10 \
    python3.10-distutils \
    python3.10-venv \
    python3-pip \
    && apt-get clean

# Install yt-dlp via pip
RUN pip3 install yt-dlp

# Copy the rest of the application files
COPY . .

# Expose the application port (if applicable)
EXPOSE 3000

# Run the application
CMD ["node", "server.js"]
