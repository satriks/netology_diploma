# Страница развернутого проекта

Перейти на [Страницу](http://79.174.94.202:8000/)

## Развертывание сервера

### 1. Подготовка

#### Обновить сервер

    sudo apt update
    sudo apt upgrade

#### Подготовить систему

    sudo apt install postgresql python3-venv python3-pip npm vite

#### Проверить postgresql

    sudo systemctl status postgresql

#### Настройка БД

    sudo su postgres
    psql
    CREATE USER <user> WITH SUPERUSER;
    ALTER USER <user> WITH PASSWORD '<pass>';
    CREATE DATABASE <user>;
    \q
    psql
    CREATE DATABASE <name database>;

#### Загрузить репозиторий

    git clone <http>

### 2. Подготовка клиента

#### Войти в frontend

    npm install

#### Настроить .env

    Добавить хост в .env

#### Создать билд

    npm run build

#### Перенести index в шаблоны backend/server/backend_api/templates/

    mv index.html ~/netology_diploma/backend/server/backend_api/templates/

#### Перенести содержимое папки assets в backend/server/static/

    mv assets/_ ~/netology_diploma/backend/server/static/

### Бэкенд

#### Создать виртуальное окружение

    python3 -m venv venv

#### Активировать виртуально окружение

    source venv/bin/activate

#### Установить зависимости

    pip install -r requarments.txt

#### Настроить .env (Используя .env-example)

    в папке server :

        nano .env-example

    внести изменения

        ctrl + o - сохранить как .env
        ctrl + x

#### Создать супер пользователя

    python manage.py createsuperuser

#### Запустить

    runserver 0.0.0.0:8000
