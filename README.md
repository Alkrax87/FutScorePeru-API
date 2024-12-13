# Proyecto de API: Resultados de Fútbol Peruano

Esta API está diseñada para gestionar y servir información sobre los resultados de fútbol peruano, incluyendo detalles de los partidos y equipos, así como la posibilidad de servir imágenes relacionadas.

## Propósito del proyecto

El objetivo principal de esta API es servir como una herramienta personal para el manejo y consulta de datos de fútbol peruano. Aunque inicialmente es de uso privado, se contempla la posibilidad de hacerla pública en el futuro como un servicio de pago.

## Tecnologías utilizadas

- **Node.js** y **Express**: Para construir la API.
- **MongoDB**: Base de datos para almacenar información sobre los partidos, equipos, y otros detalles.
- **Nodemon**: Para reiniciar el servidor durante el desarrollo.
- **Morgan**: Para registrar solicitudes HTTP.

## Características principales

- **Resultados de partidos**: Consulta de resultados y detalles de los partidos.
- **Gestor de imágenes**: Servir imágenes relacionadas con los equipos y partidos.
- **Conexión a base de datos**: Utiliza MongoDB para almacenar y recuperar información.

## Requisitos del sistema

- Node.js v16 o superior.
- MongoDB v5 o superior.
- Gestor de paquetes npm o yarn.

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

## Uso

- Endpoints disponibles:
  - `GET /api/results`: Obtiene los resultados de los partidos.
  - `GET /api/images/:id`: Obtiene una imagen relacionada con un equipo o partido.

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

## Notas

- Esta API es de uso personal, pero su estructura permite futuras ampliaciones.
- En caso de convertirse en un servicio público, se considerará un modelo de monetización por suscripción o pago por consulta.

---

## Licencia

Este proyecto no está bajo ninguna licencia pública por el momento. Todo su código y contenido está reservado para uso privado.
