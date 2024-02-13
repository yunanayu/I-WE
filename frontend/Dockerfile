# Use Node.js 20.10.0 LTS
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
RUN npm run build

# Set environment variable
ENV REACT_APP_API_KEY=AIzaSyAJC_FtqavkZ_z_UpZ0lb-nprbuKBwTsKho \
    REACT_APP_APP_ID=1:26848a1112825:web:a5e61ab9c017d14ba1d028 \
    REACT_APP_VAPID_KEY=BKEpSdvHt2E9enF3Mum9zwUd60yEEK5cZrhKDJOJcrWNqcYLPaqp0_AXFbsU0A78KT8Vh64o6IlWiUAVT4kUVnI \
    REACT_APP_KAKAO_LOGIN_URL=https://i10c108.p.ssafy.io/oauth2/authorization/kakao

# Expose the port the app runs on

# Expose the port the app runs on
EXPOSE 3000

# Define the command to run the application
CMD ["npm", "start"]