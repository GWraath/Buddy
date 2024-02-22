FROM node:19-alpine
WORKDIR /app
COPY . .
EXPOSE 8080
RUN npm install
RUN npm install -g nodemon
CMD ["npm", "run", "start-prod"]
