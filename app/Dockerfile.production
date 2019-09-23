FROM node:12.10.0-alpine

# Create a work directory
RUN mkdir /app
WORKDIR /app

COPY /src /app/src
COPY /public /app/public
COPY ["package.json", "package-lock.json", "./"]

RUN npm install --silent

EXPOSE 3000