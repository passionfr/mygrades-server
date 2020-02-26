# base image
# FROM node:11.15.0 as builder

# # set working directory
# RUN  mkdir /usr/local/app
# WORKDIR /usr/local/app

# # This is only for the build and not needed if running locally
# COPY ./package-lock.json /usr/local/app/package-lock.json
# COPY ./package.json /usr/local/app/package.json
# RUN npm ci 
# # Because: https://stackoverflow.com/questions/37715224/copy-multiple-directories-with-one-command
# COPY ./src/ ./src/

# RUN npm run build



##################
### production ###
##################

FROM nginx:stable

WORKDIR /etc/nginx

# Clean nginx folders from all default files.
RUN rm -r ./*
RUN rm -r /usr/share/nginx/html/*

# Copy new config
COPY ./src/nginx/ ./

# Copy new files
COPY ./src/api/ /usr/share/nginx/html/api/v1/
# COPY --from=builder /usr/local/app/dist /usr/share/nginx/html