## JSON-server

> 참고: https://poiemaweb.com/js-rest-api

- 시작

```bash
$ npm start # port 5000
```

- todos 가져오기

```bash
$ curl -X GET http://localhost:5000/todos
[
  {
    "id": 1,
    "content": "HTML",
    "completed": false
  },
  {
    "id": 2,
    "content": "CSS",
    "completed": true
  },
  {
    "id": 3,
    "content": "Javascript",
    "completed": false
  }
]
```
