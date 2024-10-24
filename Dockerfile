# Stage-1 & specify a name 'builder'
FROM  node:latest AS builder

# Create a directory  and go to the directory 
WORKDIR /app

# Copy the package.json file to my current directory to install the necessary dependence  
COPY package.json .
COPY package-lock.json .

# Install the dependence
RUN npm install

# RUN npm i -g serve
# Copy other files to my current directory
COPY . .

#
# Open the port to react
EXPOSE 3000

# Run nginx in the foreground
# CMD ["nginx", "-g", "daemon off;"]
# CMD [ "serve", "-s", "dist" ]

CMD ["npm", "run","dev"]
