FROM node:14.18.1-alpine3.14

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# Installing dependencies
COPY ./src /usr/src
COPY ./src/.env.dist /usr/src/.env
RUN rm -fR /usr/src/node_modules && yarn install

# Building app
RUN export NODE_OPTIONS="--max-old-space-size=8192" && yarn run build
EXPOSE $PORT

CMD [ "npm", "run", "start" ]