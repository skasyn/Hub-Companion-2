# Server initialization

## Options
### Change access port
- In docker-compose.yml
```
ports:
  - 'your-ip-address:port'
```

## How to install

### Prerequisites
- Docker
- MongoDB
- Prisma :
```
npm install -g prisma
```
- Dev dependencies
```
npm install
```

### Docker container
```
docker-compose up -d
```

### Generate prisma
```
prisma deploy
```