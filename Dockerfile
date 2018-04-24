# using node image.
FROM node:8.10.0

# create app directory.
RUN mkdir -p /app

# set /app directory as default working directory
WORKDIR /app

# only copying the package and yarn file
ADD package.json yarn.lock /app/


# copy all file from current dir to /app
COPY .  /app/

# expose port
EXPOSE 4040

# start server
CMD ["yarn", "start"]