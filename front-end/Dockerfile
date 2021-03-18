# Variable PORT
ARG PORT=3000
# traemos la imagen de node 12 con kernel de alpine
FROM node:12-alpine
# Label
LABEL autor="Santiago Jacobus"
# cremos el directorio de la app
WORKDIR /usr/src/app
# copiamos el archivo a nuestra carpeta 
COPY package*.json ./
# instalamos las dependencias
RUN npm install
# copiamos todo al directorio de trabajo
COPY . .
# exponemos el puerto
EXPOSE ${PORT}
# corremos el comando para nuestra app
CMD [ "node", "index.js" ]