FROM node:12.10.0-slim

WORKDIR /app

#Commented for development purposes (hot reload)
#COPY /src /app/src
#COPY /public /app/public
#COPY ["package.json", ".env", "./"]

RUN npm install

CMD ["npm", "start"]

EXPOSE 3000