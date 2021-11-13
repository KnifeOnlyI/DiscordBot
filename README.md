# Discord bot

## Required ENV variables

- DISCORD_TOKEN

## NPM commands

### Development

Install development and production packages

```bash
npm install
```

Start a development server with compilation watcher

```bash
npm run start:dev
```

### Production

Install only development packages

```bash
npm install --omit=dev
```

Build the application

```bash
npm run build
```

Start application

```bash
npm start
```

## Docker commands (production)

Start application

```bash
docker-compose up -d
```

Stop application

```bash
docker-compose down
```

Build/Rebuild application

```bash
docker-compose build
```
