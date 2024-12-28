# Step 1: Set the base image to Node.js
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy the package.json and install dependencies
COPY package*.json ./
RUN npm install --force

# Step 4: Copy the rest of your project files
COPY . .

# Step 5: Build the Next.js app
RUN npm run build

# Step 6: Expose the port that Next.js will run on
EXPOSE 3000

# Step 7: Start the app
CMD ["npm", "start"]
