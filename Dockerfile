# Используем минимальный nginx образ
FROM nginx:stable-alpine

# Копируем свой собственный nginx конфиг (опционально, если нужен)
# COPY nginx.conf /etc/nginx/nginx.conf

# Удаляем дефолтные конфиги сайта
RUN rm -rf /usr/share/nginx/html/*

# Копируем собранный билд (storybook-static или dist)
COPY storybook-static /usr/share/nginx/html

# Открываем порт
EXPOSE 80

# Стартуем nginx в форграунде
CMD ["nginx", "-g", "daemon off;"]