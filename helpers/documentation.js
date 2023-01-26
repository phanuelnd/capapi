const indexVariable = require("../index")
const userRouteDoc = require("../routes/user.Doc");
const blogsRouteDoc = require('../routes/blogs.Doc');
const swaggerdocumentation =
{
openapi: "3.0.0",

info:{
title: "Documentation",
version: "0.0.1",
description: "This is documentation opf my APIs",
},

components: {
    securitySchemes: {
      token: {
        type: 'apiKey',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name:"token",
        in:"header"
      },
    },
},

servers: [
{
url: "http://localhost:5000",
description:"Local dev",
},
],

tags:[{
    name: "User",
    description: "Users routes",
},
{
    name: "Blogs",
    description: "Blogs routes",
},
],

paths:
{
    ...userRouteDoc,
    ...blogsRouteDoc,
},
};

module.exports = swaggerdocumentation