# Copyright CESSDA ERIC 2017-2019
#
# Licensed under the Apache License, Version 2.0 (the "License"); you may not
# use this file except in compliance with the License.
# You may obtain a copy of the License at
# http://www.apache.org/licenses/LICENSE-2.0

# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
RUN apt-get -qq update && apt-get -qq upgrade && apt-get install -qq autoconf automake libtool libpng-dev nasm
COPY package*.json ./

# NodeJS Install
RUN npm ci

# Bundle app source and build webpack
COPY . .
RUN npm run build

# Configure application startup
USER cessda:cessda
EXPOSE 8088
CMD [ "npm", "run", "startprod" ]
