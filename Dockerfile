FROM node:boron

# Set up environment
RUN npm i -g yarn
RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# Clone Project
COPY ./ ./

# Compile Application
RUN yarn install
RUN yarn build

EXPOSE 8080
CMD yarn start
