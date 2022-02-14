# Pokemon Hexagonal Architecture

This project applies the hexagonal architecture, and the consumption between micro services, for the administration of Pokemons, battles and breeding services.

## Endpoints

1. Documentation with swagger

```
/docs
```

## Events

1. Events with RabbitMQ structure

```

```

## Environment

```
MONGODB_URI=url mongodb
PORT=port api
API_URI=url api
JWT_SECRET=Secret password for encode and decode jwt
API_KEY=api key backend

#OPTIONS RABBITMQ
BROKER_HOST= host rabbit
CREATE_QUEUE_RABBIT= Boolean crate queue
BROKER_EXCHANGE=exchange name
BROKER_QUEUE=queue name
BROKER_TYPE_EXCHANGE=type of exchange
BROKER_BINDING_KEY=binding key
```

## Execution

1. Without Docker

```
npm run dev
```

2. With Docker

```
docker-compose up
```

## Tests

1. Unit test

```
npm run test
```

2. Coverage test

```
npm run test:coverage
```
