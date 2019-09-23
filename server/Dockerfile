FROM node:12.10.0-alpine

# Create a work directory
RUN mkdir /server
WORKDIR /server

COPY /src /server/src
COPY /prisma /server/prisma
COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

RUN npm install --silent

EXPOSE 4000