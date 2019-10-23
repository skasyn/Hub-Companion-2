FROM node:12.10.0-alpine

# Create a work directory
RUN mkdir /server
WORKDIR /server

#COPY /src /server/src
#COPY /prisma /server/prisma
#COPY ["package.json", "tsconfig.json", ".env", "./"]

RUN npm install --silent

CMD ["npm", "start"]

EXPOSE 4000