import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion API Tasks",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
  components: {
    schemas: {
      Task: {
        type: "object",
        properties: {
          userId: {
            type: "string",
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          pending: {
            type: "boolean",
          }
        },
      },
    },
  },
  paths: {
    "/tasks/{userId}": {
      get: {
        summary: "Get all tasks by userId",
        description: "Returns all tasks by userId",
        parameters: [
          {
            name: "userId",
            in: "path",
            description: "ID of userId task item",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "A list of tasks",            
          },
          "404": {
            description: "Not Found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/task/{id}": {
      get: {
        summary: "Get task by id",
        description: "Returns a task item by id",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of task item to return",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Task item by id returned successfully",          
          },
          "404": {
            description: "Task item not found",
          },
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/task/": {
      post: {
        summary: "Add new Task",
        description: "Returns a new added Task",
        requestBody: {
          description: "New Task item to be added",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "New Task item returned successfully",          
          },          
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/task-update/{id}": {
      put: {
        summary: "Update task by id",
        description: "Returns a success status",
        requestBody: {
          description: "New Task item updated",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Task",
              },
            },
          },
        },
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of task item to return",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Task updated item status returned successfully",            
          },          
          "500": {
            description: "Internal server error",
          },
        },
      },
    },
    "/task-delete/{id}": {
      delete: {
        summary: "Delete Task by id",
        description: "Returns a deleted status object",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID of task",
            required: true,
            schema: {
              type: "string",
            },
          },
        ],
        responses: {
          "200": {
            description: "Task deleted status returned successfully",           
          },         
          "500": {
            description: "Internal server error",
          },
        },
      },
    }
  },
};

const options: OAS3Options = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
