# 1. Этап: Сборка Storybook
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем только продакшн-зависимости
RUN npm install --frozen-lockfile

# Копируем остальной код проекта
COPY . .

# Собираем Storybook
RUN npm run build-storybook

# 2. Этап: Минимальный образ Nginx для отдачи статики
FROM nginx:stable-alpine

# Очищаем стандартный html
RUN rm -rf /usr/share/nginx/html/*

# Копируем собранный билд из первого этапа
COPY --from=builder /app/storybook-static /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Запускаем nginx в фоне
CMD ["nginx", "-g", "daemon off;"]
