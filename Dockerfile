FROM node:9.11.1

# Create app directory
WORKDIR /usr/src/app


# Environment
ENV PASC_ELASTICSEARCH_URL="http://cdc-es:9200"
ENV PASC_DEBUG_MODE="false"

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
#COPY package-lock.json .
# Copy npm-shrinkwrap.json as well, which ensures dependencies are locked.
COPY npm-shrinkwrap.json .

# NodeJS Install
RUN npm cache clear --force
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8088
CMD [ "npm", "run", "startdev" ]
