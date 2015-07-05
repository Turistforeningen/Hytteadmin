# Hytteadmin

Publication tool for cabins on [UT.no](http://ut.no) and [Nasjonal
Turbase](http://www.nasjonalturbase.no).

## Requirements

* [Docker](https://github.com/docker/docker/releases) >= `v1.7`
* [Docker Compose](https://github.com/docker/compose/releases) >= `v1.2`

## API

| Method | Path                | Description           |
|--------|---------------------|-----------------------|
| GET    | `/api/v1/cabin`     | List cabins           |
| POST   | `/api/v1/cabin`     | Create new cabin      |
| GET    | `/api/v1/cabin/:id` | Get existing cabin    |
| POST   | `/api/v1/cabin/:id` | Update existing cabin |
| POST   | `/api/v1/photo`     | Create new photo      |
| GET    | `/api/v1/photo/:id` | Get existing photo    |
| POST   | `/api/v1/photo/:id` | Update existing photo |

## Development

### Environment (`.env`)

```
NTB_API_ENV=dev
NTB_API_KEY=<your api key here>
```

### Test

```
$ docker-compose run --rm backend npm test
$ docker-compose run --rm backend npm run watch
```

### Start

```
$ docker-compose up
```

## [MIT License](https://github.com/Turistforeningen/Hytteadmin/blob/master/LICENSE)
