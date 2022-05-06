# get environment
FROM node:17-alpine3.14 as build

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

# start building
RUN npm run build:process

# production environment
FROM nginx

# copy build folder to nginx
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# expose to production
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
