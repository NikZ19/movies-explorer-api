## Бекенд для дипломного проекта Explorer Movies.

### Языки и инструменты:
Node.js, Express, MongoDB  

### Описание 
Бекенд предоставляет следующий функционал и роуты:
* Создание в БД нового пользователя при регистрации (POST /signup)
* Авторизация пользователя и добавление cookie (POST /signin)
* Удаление cookie (POST /signout)
* Получение из БД информации о пользователе (GET /users/me)
* Обновление в БД информации о пользователе (PATCH /users/me)
* Сохранение фильма в БД (POST /movies)
* Удаление фильма из БД (DELETE /movies/:movieId) 
* Получение из БД всех сохранённых фильмов (GET /movies)

### Ссылки
[`Фронтенд`](https://github.com/NikZ19/movies-explorer-frontend) 
