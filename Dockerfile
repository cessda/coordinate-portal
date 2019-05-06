FROM node:10

# Create app directory
WORKDIR /usr/src/app


# Environment
ENV PASC_ELASTICSEARCH_URL="http://cdc-es:9200"
ENV PASC_DEBUG_MODE="false"

# Install app dependencies
RUN apt-get -qq update && apt-get install -qq autoconf automake libtool libpng-dev nasm
COPY package*.json ./
# Copy npm-shrinkwrap.json as well, which ensures dependencies are locked.
#COPY npm-shrinkwrap.json .

# NodeJS Install
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8088
CMD [ "npm", "run", "startdev" ]
