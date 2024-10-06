# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 3000

# Install Prisma and run migrations
RUN npx prisma migrate dev --name "init"
RUN npx prisma generate

# Start the application
CMD ["npm", "run", "dev"]
