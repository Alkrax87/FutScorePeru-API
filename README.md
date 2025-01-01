# Proyecto de API: Resultados de Fútbol Peruano

Esta API está diseñada para gestionar y servir información sobre los resultados de fútbol peruano, incluyendo detalles de los partidos y equipos, así como la posibilidad de servir imágenes relacionadas.

## Propósito del proyecto

El objetivo principal de esta API es servir como una herramienta personal para el manejo y consulta de datos de fútbol peruano. Aunque inicialmente es de uso privado, se contempla la posibilidad de hacerla pública en el futuro como un servicio de pago.

## Tecnologías utilizadas

- **Node.js** y **Express**: Para construir la API.
- **Nodemon**: Para reiniciar el servidor durante el desarrollo.
- **Morgan**: Para registrar solicitudes HTTP.
- **MongoDB**: Base de datos para almacenar información sobre los partidos, equipos, resultados y otros detalles.
- **Mongoose**: Para modelar los datos de MongoDB en JS e interactuar con la base de datos.
- **Multer**: Para gestionar imagenes en la API.

## Características principales

- **Resultados de partidos**: Consulta de resultados y detalles de los partidos.
- **Gestor de imágenes**: Servir imágenes relacionadas con los equipos y partidos.
- **Conexión a base de datos**: Utiliza MongoDB para almacenar y recuperar información.

## Requisitos del sistema

- Node.js v16 o superior.
- MongoDB v5 o superior.
- Gestor de paquetes npm.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/usuario/API-ScorePe.git
   cd API-ScorePe
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno:
   - Crea un archivo `.env` en la raíz del proyecto con los siguientes campos:
     ```env
     PORT=3000
     MONGO_URI=mongodb://localhost:27017/nombre_de_tu_bd
     ```

4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```
## Variables de entorno

Establecer un archivo de variables de entorno `.env` con los soguientes parámetros.

- **MONGO_USER**: Usuario de mongoDB que se relaciona con la base de datos.
- **MONGO_PASSWORD**: Contraseña del usuario de mongoDB.
- **MONGO_SERVER**: Dirección IP del servidor de mongoDB.
- **MONGO_PORT**: Puerto del servidor mongoDB.
- **MONGO_DATABASE**: Nombre de la base de datos.
- **PORT**: Puerto donde se ejecuta el servidor Express.

## Uso

- Endpoints disponibles:
  - `GET /api/teams`: Obtiene información de los equipos..
  - `GET /api/lastgames`: Obtiene la información de los ultimos partidos.
  - `GET /api/performance`: Obtiene las estadísticas de los equipos.
  - `GET /api/results`: Obtiene los resultados de los partidos.
  - `GET /api/stadium`: Obtiene información de los estadios.
  - `GET /api/managers`: Obtiene información de los tecnicos.

## Estructura del proyecto

```
project/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── utils/
│   ├── app.js
│   └── server.js
├── public/
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Licencia

Este proyecto no está bajo ninguna licencia pública por el momento. Todo su código y contenido está reservado para uso privado.
