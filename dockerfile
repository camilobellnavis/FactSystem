# Etapa 1: Construcción de la aplicación
FROM node:16-alpine AS build

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

COPY . .

# Construir la aplicación
RUN npm run build --prod

# Etapa 2: Servir la aplicación con Nginx
FROM nginx:1.17.1-alpine

# Copiar los archivos construidos al servidor Nginx
COPY --from=build /app/dist/fact-system /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]