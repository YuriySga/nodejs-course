# Artillery test

Тесты хранятся в корне репозитория:
report-Express2.json
report-Fastify2.json


Common data:
 "scenariosCreated": 800,
  "scenariosCompleted": 800,
  "requestsCompleted": 4000,
  "duration": 40,
  "arrivalRate": 20,
    "codes": {
      "200": 3200,
      "201": 800
    },


| 55555   |  latency    |   rps          |scenarioDuration |
| :---:   |  :---:      |    :---:       | :---:           |
| Fastify |    min: 2   | count: 4000    | min: 745.1      |
|         | max: 4503   |  mean: 93      | max: 6245       |
| Express |    min: 2   | count: 4000    | min: 1396.5      |
|         | max: 3635   |  mean: 87.83   | max: 7110.1       |

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
