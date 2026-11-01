# API REST – Sistema de Gestión de Perfumería

## 1. Descripción del proyecto

Este proyecto consiste en el desarrollo de una API REST para administrar la información de una perfumería. Su finalidad es permitir el registro, consulta, actualización y eliminación de datos relacionados con los productos, categorías, marcas, clientes y pedidos.

La API fue desarrollada utilizando Node.js y Express, conectada a una base de datos MySQL alojada en Clever Cloud. Además, fue publicada en Render para permitir su acceso desde Internet.

## 2. Tecnologías utilizadas

- **Node.js:** entorno de ejecución de JavaScript.
- **Express:** framework para desarrollar la API REST.
- **MySQL:** sistema de gestión de bases de datos.
- **mysql2:** paquete para establecer la conexión entre Node.js y MySQL.
- **Clever Cloud:** alojamiento de la base de datos en la nube.
- **Render:** plataforma utilizada para publicar la API.
- **Git y GitHub:** herramientas para el control de versiones y almacenamiento del código.
- **Postman:** herramienta utilizada para probar las solicitudes de la API.

## 3. Base de datos

La base de datos se encuentra alojada en Clever Cloud y utiliza MySQL.

Nombre de la base de datos:

`bsfe2kx9i4uyvf30y0zk`

La base de datos contiene seis tablas principales:

| Tabla | Descripción |
|---|---|
| categorias | Almacena las categorías de los perfumes. |
| marcas | Contiene las marcas de los productos. |
| productos | Guarda la información de los perfumes. |
| clientes | Almacena los datos de los clientes. |
| pedidos | Registra los pedidos realizados. |
| detalle_pedido | Contiene los productos asociados a cada pedido. |

Las tablas están relacionadas mediante claves primarias y foráneas para mantener la integridad de la información.

## 4. Funcionalidades de la API

La API implementa operaciones CRUD para administrar los seis módulos.

CRUD significa:

- **Create:** crear nuevos registros.
- **Read:** consultar registros.
- **Update:** actualizar información.
- **Delete:** eliminar registros.

Los módulos implementados son:

1. Gestión de categorías.
2. Gestión de marcas.
3. Gestión de productos.
4. Gestión de clientes.
5. Gestión de pedidos.
6. Gestión de detalles de pedidos.

Las operaciones permiten trabajar con la información de la base de datos mediante solicitudes HTTP y respuestas en formato JSON.

## 5. Endpoints de la API

La API tiene las siguientes rutas principales:

**URL base:**

`https://perfumeria-api-keiner.onrender.com`

| Módulo | Endpoint |
|---|---|
| Categorías | `/api/categorias` |
| Marcas | `/api/marcas` |
| Productos | `/api/productos` |
| Clientes | `/api/clientes` |
| Pedidos | `/api/pedidos` |
| Detalle de pedidos | `/api/detalle-pedido` |

### Métodos HTTP utilizados

| Método | Función |
|---|---|
| GET | Consultar información. |
| POST | Crear registros. |
| PUT | Actualizar registros. |
| DELETE | Eliminar registros. |

Para consultar un registro individual se utiliza su identificador, según las rutas definidas en cada módulo.

## 6. Instalación del proyecto

Para ejecutar el proyecto localmente se necesita tener instalado Node.js y Git.

### Paso 1. Clonar el repositorio

```bash
git clone https://github.com/KD-07P/-perfumeria-api.git
```

### Paso 2. Entrar a la carpeta

```bash
cd -perfumeria-api
```

### Paso 3. Instalar las dependencias

```bash
npm install
```

### Paso 4. Configurar las variables de entorno

Crear un archivo llamado `.env` en la carpeta principal del proyecto.

Agregar las siguientes variables:

```env
DB_HOST=tu_host_mysql
DB_PORT=3306
DB_USER=tu_usuario
DB_PASSWORD=tu_contrasena
DB_NAME=tu_base_de_datos
```

Los valores deben corresponder a los datos de conexión de Clever Cloud.

**Importante:** no se deben publicar las contraseñas ni subir el archivo `.env` a GitHub.

### Paso 5. Ejecutar el proyecto

Para iniciar el servidor:

```bash
npm start
```

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

## 7. Conexión con MySQL

La conexión entre Node.js y MySQL se realiza mediante el paquete `mysql2/promise`.

El archivo encargado de configurar la conexión es:

`config/db.js`

La configuración utiliza variables de entorno para proteger los datos de acceso a la base de datos.

## 8. Publicación en Render

La API se encuentra desplegada en Render.

**URL pública:**

https://perfumeria-api-keiner.onrender.com

El repositorio utilizado para realizar el despliegue es:

https://github.com/KD-07P/-perfumeria-api

La rama utilizada es `main`.

Render permite ejecutar la aplicación en Internet y conectarse a la base de datos alojada en Clever Cloud.

## 9. Comprobación del funcionamiento

Se realizaron pruebas para comprobar que la API responde correctamente y que existe conexión con la base de datos.

### Endpoint principal

```http
GET /
```

Respuesta:

```json
{
  "mensaje": "API de Perfumeria funcionando correctamente"
}
```

### Comprobación de conexión con MySQL

```http
GET /api/estado
```

Respuesta obtenida:

```json
{
  "mensaje": "Conexion con MySQL exitosa",
  "base_datos": "bsfe2kx9i4uyvf30y0zk"
}
```

También se comprobaron los endpoints de los seis módulos para verificar su funcionamiento.

## 10. Manejo de errores

La API contempla respuestas de error cuando se presentan problemas durante las solicitudes o las operaciones con la base de datos.

Entre los códigos HTTP que se utilizan habitualmente en una API REST están:

- `200`: solicitud procesada correctamente.
- `201`: registro creado.
- `400`: solicitud con datos incorrectos.
- `404`: recurso no encontrado.
- `500`: error interno del servidor.

## 11. Seguridad y configuración

Para proteger la conexión con la base de datos:

- Se utilizan variables de entorno.
- El archivo `.env` está excluido del repositorio mediante `.gitignore`.
- Las credenciales se configuran directamente en Render.
- No se deben compartir públicamente los datos de acceso a MySQL.

## 12. Conclusión

Con el desarrollo de esta fase se logró construir y publicar una API REST para la gestión de una perfumería. Se implementaron los módulos de categorías, marcas, productos, clientes, pedidos y detalle de pedidos, con operaciones CRUD conectadas a una base de datos MySQL.

También se logró publicar el proyecto en Render y comprobar la conexión con Clever Cloud, permitiendo que la API esté disponible mediante una dirección pública.

## 13. Información del proyecto

**Proyecto:** Sistema de Gestión de Perfumería.

**Estudiante:** Keiner de la Rosa.

**Programa:** Ingeniería de Sistemas.

**Institución:** Corporación Universitaria Latinoamericana (CUL).

**Año:** 2026.
