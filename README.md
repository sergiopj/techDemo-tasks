
# API REST task-app 

API REST desarrollada en Node.js y TypeScript para la gestión de tareas de usuarios
## Levantar la Aplicación:

Requisitos previos OBLIGATORIOS si se quiere levantar la app en un contenedor docker:

* Tener instalado docker-compose y docker.
* Añadir un fichero .env de la raíz con los siguientes valores:

```console
/* DATABASE */
DIALECT=sqlite
STORAGE=./src/database/database.sqlite
```

Se puede levantar la aplicacion en un contenedor docker, para ello simplemente en la raiz del proyecto, ejecutar el comando:

```console
docker-compose up --build
```
_Nota: Si se quiere acceder al sistema de archivos del contenedor para verificar por ejemplo los logs o la creación de la db, se ha de ejecutar el siguiente comando:_

```console
docker exec -it docker_image_name /bin/bash
```

## Endpoints

La API REST cuenta con los siguientes endpoints:

* GET /tasks/:userId Obtiene todas las tareas de un usuario que esten pendientes

* GET /task/:id: Obtiene una tarea en particular, por el parámetro id.

* POST /task: Añade una nueva tarea.   

* PUT /task-update/:id: Actualiza una tarea existente, por el parámetro id.

* DELETE /task-delete/:id: Elimina una tarea existente, por el parámetro id.

* SWAGGER_DOCS /api-docs para poder probar los endpoints

## Test unitarios

Como lanzarlos de forma general:

```console
npm test
```

