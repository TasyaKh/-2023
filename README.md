# Яндекс метрика и топвизор 2023

## Технологии

![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

бэкенд - **nest.js**, документация https://nestjs.com

фронтенд - **vue.js** (3-я версия), документация https://vuejs.org

# Настройка проекта
1. скачать nodejs https://nodejs.org/en
> зайти в cmd и проверить что установлен, написать в терминале

![image](https://github.com/TasyaKh/Praktika-2023/assets/91024491/5719cccb-1df9-4d66-a0a8-cfb403ef6ba8)

2. Скачать vs code https://code.visualstudio.com
3. Открыть  vs code и нажать клонировать репозиторий, ввести эту https://github.com/TasyaKh/Praktika-2023.git ссылку во всплывающее окно, сохраните в любую папку этот проект

![image](https://github.com/TasyaKh/Praktika-2023/assets/91024491/4ce63485-cd98-415a-a561-06d414d8f8a5)

4. Перейти на свою ветку разработки (там должна гореть ваша ветка во вкладке Source Control)

![image](https://github.com/TasyaKh/Praktika-2023/assets/91024491/3f8e8ff5-6419-4ae4-8af2-a9782c74bbe0)

5. Итак, вы в своем пустом проекте, что дальше? Вам надо сохранить последние изменения с main ветки в свою

![замержить свою ветку с мейном](https://github.com/TasyaKh/Praktika-2023/assets/91024491/a3d36e99-9f92-44a6-9293-d3eb108f0d5b)


6. Слева наверху есть вкладка Terminal > new Terminal, в терминале ввести команду 

```
cd .\client\
```
далее (нужно скачать нужные нам библиотеки) 

```
npm i
```

# Запуск проекта

## Клиент
в папке client 6-го шага настройки написать (вы должны быть в папке client проекта)

```
npm run dev
```
результат, по ссылке в терминале сможете посмотреть наш сайт

![image](https://github.com/TasyaKh/Praktika-2023/assets/91024491/dee34e17-123e-45f5-a673-c420351549d8)

## Сервер
во 2-м терминале перейти в папку

```
cd .\server\
```
написать в терминале

```
npm i -g @nestjs/cli
```

```
npm i
```

запустить сервер 

```
npm run start:dev
```

> на сервере обязательно должен быть config.ts след. вида

```
export const TOPVISOR_API_URL = {
  baseUrl: {url топвизора},
  userID: {id юзера в топвизоре},
  authToken: { авторизационый токен}
};


export const YANDEX_API_URL = {
  baseUrl: {url яндекса},
  oAuthToken: { авторизационый токен}
};

```

## БД

1. скачать pgAdmin 4, создать бд, далее зайти в
```
cd .\server\
```
2. создать или обновить файл .env, который имеет след. вид.
```
DB_NAME={имя бд}
DB_USER={пользователь}
DB_PASSWORD={пароль}
DB_HOST=localhost
DB_PORT=5432
```
3. далее, запустить сервер и написать в браузере, например, след путь
```
GET http://localhost:3000/api/general/update-db
```
это необходимо, чтобы обновить бд, стянуть проекты и данные для дашбордов для старта

**Заметка:**
> для взаимодейтсвия с бд на серверной части используется typeorm https://typeorm.io
> сущности в бд сохраняются через миграции, сами сущности омечены как ```entity.ts```, про миграции читать на сайте nest js

в бд могут быть некоторые недочеты или использоваться лишние поля, требуется доработать

![Downloads pgerd](https://github.com/TasyaKh/Praktika-2023/assets/91024491/e8884d24-5b5c-4a85-83b2-efdf28282e6d)

# Справка
может вы заметили, что некоторые файлы подсвечиваются красным, путь не найден, нужно скачать расширение в vs code во вкладке extensions "TypeScript Vue Plugin"

Советую пошариться в плагинах и настроить по себя, плагины у меня:

1. vscode-icons
2. IntelliSense for CSS class

# Документация

api сервера задокументированы в swagger, зайти http://localhost:3000/documentation на запущенном сервере


