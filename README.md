# Hub-Companion-2
The new Hub Companion, still track what you need to validate Hub's unit, but in a cooler way

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