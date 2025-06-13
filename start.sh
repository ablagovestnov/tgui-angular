#!/bin/sh

# Имя сети
NETWORK_NAME=zoo
# Остановка Docker Compose
docker-compose down

# Проверка существования сети
if ! docker network ls | grep -q "$NETWORK_NAME"; then
  echo "Создание сети $NETWORK_NAME..."
  docker network create "$NETWORK_NAME"
else
  echo "Сеть $NETWORK_NAME уже существует."
fi

# Запуск Docker Compose
docker-compose up --build -d
