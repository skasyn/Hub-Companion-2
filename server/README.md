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

### Deploy prisma
Change the domain in `prisma/prisma.yml` from `prisma:4466` to `localhost:4466`
```
prisma deploy
```
Change the domain in `prisma/prisma.yml` from `localhost:4466` to `prisma:4466`

### Generate prisma
```
prisma generate
npx nexus-prisma-generate --client ./src/generated/prisma-client --output ./src/generated/nexus-prisma
```

### Environment variables
In `.env`
```
OFFICELINK=OfficeRedirectLink
URLAUTO=EpitechAutoLogin
AZURESECRET=AzureSecretCode
JWT_SECRET=YourJWTSecretKey
JWT_ISSUER=dashboard-app-dev
JWT_AUDIENCE=dashboard-app-user
```

### Docker container
```
docker-compose up --build
```
