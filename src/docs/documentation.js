import indexVariable from "../index";

import userRouteDoc from "../routes/user.Doc";
import blogsRouteDoc from "../routes/blogs.Doc";
import clientRouteDoc from "../routes/client.Doc";

const swaggerdocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Documentation",
    version: "0.0.1",
    description: "This is documentation opf my APIs",
  },

  components: {
    securitySchemes: {
      token: {
        type: "apiKey",
        scheme: "bearer",
        bearerFormat: "JWT",
        name: "token",
        in: "header",
      },
    },
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local dev",
    },
  ],

  tags: [
    {
      name: "User",
      description: "Users routes",
    },
    // {
    //   name: "Post",
    //   description: "blogs routes",
    // },
    // {
    //   name: "Client",
    //   description: "Client routes",
    // },
  ],

  paths: {
    ...userRouteDoc,
    ...blogsRouteDoc,
    ...clientRouteDoc,
  },
};

export default swaggerdocumentation;
