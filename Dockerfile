# Define la imagen base
FROM node:14.21.2

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
COPY tsconfig*.json ./
COPY src ./src

# Instala las dependencias
RUN npm install

# Compila TypeScript
RUN npm run build

# Expone el puerto 3000
EXPOSE 3000

# Inicia la aplicación
CMD ["npm", "start"]
