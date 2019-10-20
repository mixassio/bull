FROM node:latest
COPY . /home/app
WORKDIR /home/app
RUN yarn install --frozen-lockfile
CMD ["yarn", "start"]
