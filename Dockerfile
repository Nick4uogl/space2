FROM node:18.16.1-buster-slim AS builder

RUN mkdir /frontend
WORKDIR /frontend

ADD . /frontend
COPY package*.json /frontend/
# Install dependencies
RUN npm install

EXPOSE 3000

# FROM nginx:1.25.1-alpine
# COPY nginx.conf /etc/nginx/conf.d/default.conf
# COPY --from=builder /frontend/dist /usr/share/nginx/html
# RUN touch /var/run/nginx.pid
# RUN chown -R nginx:nginx /var/run/nginx.pid /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx/conf.d
# USER nginx
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]