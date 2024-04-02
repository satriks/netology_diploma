# Страница развернутого проекта

Перейти на [Страницу](http://89.111.172.179:8000/)

## Развертывание сервера

### 1. Подготовка

#### Обновить сервер

    sudo apt update
    sudo apt upgrade

#### Обновить node.js

    sudo apt install npm
    sudo npm install -g n
    sudo n latest

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

#### Войти в netology_diploma/frontend/

    npm install
    npm install typescript

#### Настроить .env

    Добавить хост в .env

#### Создать билд

    npm run build

Зайти в netology_diploma/frontend/dist/

#### Перенести index в шаблоны backend/server/backend_api/templates/

    mv index.html ~/netology_diploma/backend/server/backend_api/templates/

#### Перенести содержимое папки assets в backend/server/static/

    mv assets/* ~/netology_diploma/backend/server/static/

### Бэкенд

Перейти в папку /netology_diploma/backend/

#### Создать виртуальное окружение

    python3 -m venv venv

#### Активировать виртуально окружение

    source venv/bin/activate

#### Установить зависимости

    pip install -r requirements.txt

Перейти в папку /netology_diploma/backend/server/

#### Настроить .env (Используя .env-example)

Используя .env-example внести данные БД и хоста. Сохранить как .env

#### Сделать миграции

    python manage.py makemigrations
    python manage.py migrate

#### Создать супер пользователя

    python manage.py createsuperuser

#### Запустить

    python manage.py runserver 0.0.0.0:8000
