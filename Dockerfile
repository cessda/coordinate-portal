FROM node:9.11.1

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .

# Copy npm-shrinkwrap.json as well, which ensures dependencies are locked.
COPY npm-shrinkwrap.json .

# NodeJS Install
RUN npm cache verify
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8088
CMD [ "npm", "run", "startdev" ]
