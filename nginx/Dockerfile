FROM nginx:1.11

RUN sed -i 's/sendfile        on/sendfile       off/g' etc/nginx/nginx.conf

COPY . /usr/share/nginx/public
COPY default.conf /etc/nginx/conf.d/default.conf
COPY default.client /etc/nginx/conf.d/default.client
COPY mime.types /etc/nginx/mime.types

EXPOSE 8080
