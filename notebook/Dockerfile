# get environment
FROM node:17-alpine3.14

# create app directory
WORKDIR /usr/src/app

# install dependencies
# a wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# start installing dependencies
RUN npm install

# COPY source code
COPY . .

# expose the port to the container
EXPOSE 3000

# launch the server
CMD ["npm", "run", "dev"]
