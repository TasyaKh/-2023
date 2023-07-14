# Яндекс метрика и топвизор 2023

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
запустить сервер 

```
npm run start:dev
```

# Справка
может вы заметили, что некоторые файлы подсвечиваются красным, путь не найден, нужно скачать расширение в vs code во вкладке extensions "TypeScript Vue Plugin"

Советую пошариться в плагинах и настроить по себя, плагины у меня:

1. vscode-icons
2. IntelliSense for CSS class

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

