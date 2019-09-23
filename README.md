# Hub-Companion-2
The new Hub Companion, still track what you need to validate Hub's unit, but in a cooler way

## Startup

To launch the application, use the following command :

```
dc -f production.yml -f docker-compose.yml -f server/docker-compose.yml up
```

To stop it, use the following command :

```
dc -f production.yml -f docker-compose.yml -f server/docker-compose.yml down
```