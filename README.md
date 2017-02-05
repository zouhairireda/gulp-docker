# gulp-docker : Dockerizing Gulp application

##Creating Dockerfile
Create Dockerfile file : touch Dockerfile  
Use official node image from Docker Hub  
Copy package.json inside the image (COPY package.json /usr/src/app) and install app dependencies using the npm binary (npm install)  
Copy source inside the image (COPY . /usr/src/app) and then expose used port  
Finally, run the npm start command (CMD ["npm", "start"])  
Don't forget to add gulp as a general dependency : npm i -g gulp

##Creating .dockerignore
touch .dockerignore  
Add node_modules to this file

##Building image
docker build -t <your username>/gulpjs-app .

##Run the image
docker run -p 3000:3000 -d <your username>/gulpjs-app

##Get container ID
docker ps

##Print app output
docker logs <container id>

##Inside container
If you need to go inside the container you can use the exec command:  
docker exec -it <container id> /bin/bash
