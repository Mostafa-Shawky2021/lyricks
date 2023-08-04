FROM node:18-alpine as builder

WORKDIR /app

COPY *.json .

RUN npm install -p 

COPY . . 

RUN npm run build 

FROM httpd  

COPY --from=builder /app/dist /usr/local/apache2/htdocs/

