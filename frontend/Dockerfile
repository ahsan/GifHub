# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node:10-alpine as build-stage
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build

# Stage 1, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.15
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY ./nginx.conf.tmpl /etc/nginx/conf.d/default.conf.tmpl
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# CMD /bin/sh -c "envsubst < /etc/nginx/conf.d/default.conf.tmpl > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;' || cat /etc/nginx/conf.d/default.conf"
CMD /bin/sh -c 'sed -i -e "s/REACT_APP_API_URL/$REACT_APP_API_URL/g" /etc/nginx/conf.d/default.conf && nginx -g "daemon off;" || cat /etc/nginx/conf.d/default.conf'