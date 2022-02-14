FROM node:16.5.0-slim
ENV TZ=America/Santiago

# home directory
WORKDIR /home/app

# node packages
COPY package*.json ./
RUN npm install 

# copy app
COPY . .

RUN npm run build

EXPOSE 3000

# start
CMD ["npm", "start"]
