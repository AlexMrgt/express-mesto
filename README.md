
# Проект "Mesto.Russia".
## Описание

Это `backend` проекта "Mesto.Russia".

[Перейти на сайт проекта.](http://mesto.practikum.nomoredomains.club/)

## Функционал
### Роуты для регистрации/авторизации

+ `POST` /signup - принимает email и пароль для регистрации нового пользователя
+ `POST` /signin - принимает email и пароль для авторизации пользователя 

### Роуты для пользователей (нужна авторизация)
+ `GET` /users - возвращает всех пользователей в формате JSON:
  ```
  {
   {
      "name": "",
      "about": "",
      "avatar": "",
      "_id": "",
      "email": "",
      "__v": 
    }
    ...
  }
  ```
+ `GET` /users/me - возвращает данные пользователя в формате JSON: 
  ```
  {
    "name": "",
    "about": "",
    "avatar": "",
    "_id": "",
    "email": "",
    "__v": 
  }

+ `PATCH` /users/me - изменяет имя/описание и возвращает пользователя в формате JSON
+ `PATCH` /users/me/avatar - изменяе аватар и возвращает пользователя в формате JSON
+ `GET` /users/:userId - возвращает пользователя с соответствующим ID в формате JSON


### Роуты для кароточек (нужна авторизация)

+ `GET` /cards - возвращает карточки в формате JSON: 
```j
 {
        "likes": [
            {
               user_info
            },
           ...
        ],
        "_id": "",
        "name": "",
        "link": "",
        "owner": {
            "name": "",
            "about": "",
            "avatar": "",
            "_id": "",
            "email": ",
            "__v":
        },
        "createdAt": "2021-04-25T08:56:26.404Z",
        "__v":
    },
    ...
```

+ `POST` /cards - создает новую карточку и возвращает ее в формате JSON
+ `DELETE` /cards/:cardId - удаляет карточку по соответствующему ID, если она принадлежит пользователю
+ `PUT` /cards/:cardId/likes - добавляет в массив лайков лайк карточке от соответствующего пользователя
+ `DELETE` /cards/:cardId/likes' - удаляет лайк из массива лайков карточки от соответствующего пользователя

## Технологии

+ Expressjs
+ nodemon
+ MongoDB
+ mongoose
+ dotenv
+ cors
+ celebrate
+ bcryptjs
+ winston
+ express-winston
+ jsonwebtoken
+ validator
+ eslint
