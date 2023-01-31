const blog = [
  
    { "_id": "63d01b7e296f28432dedc345",
    "title": "Google",
    "desc": "Macintosh is better and Windows is best and google is beast",
    "username": "Kaguru",
    "categories": [
        "Technology"
    ],
    "comment": [],
    "createdAt": "2023-01-24T17:55:10.717Z",
    "updatedAt": "2023-01-24T17:55:10.717Z",
    "__v": 0
    }
  ]
  const listAllBlogs = {
      tags:['Blogs'],
      description:"List of all the Blogs",
      responses:{
          200:{
              description:"Query OK",
              content:{
                   "application/json":{
                      type:'object',
                      example:{
                          status:"Done",
                          blog
                      }
                   }
              }
          }
      }
  }
  // post  nwew blog
  const newBlog = {
      tags:['Blogs'],
      description:"Create a new blog",
      requestBody:{
          content:{
              "multipart/form-data":{
                  schema:{
                      type:"object",
                      properties:{

                          username:{
                              type:"string",
                          },
                          title:{
                              type:"string",
                              description:"title of the blog"
                          },
                          desc:{
                              type:"string",
                              description: "content of the blogs"
                          },
                          categories:{
                            type:"string",
                            description: "Category of the blogs"
                        },
                      }
                  }
              }
          }
      },
      responses:{
          200:{
              description:"Query OK",
              content:{
                  "application/json":{
                      type:"object",
                      example:{
                          status:"success",
                          blog,
                      }
                  }
              }
          }
      }
  }

  // get single blog
  const getSingleBlog = {
      tags:['Blogs'],
      description:"Get blog by id",
      parameters:[
          {
              name:"id",
              in:"path",
              description:"blog id",
              type:"string",
              example:"63d01b7e296f28432dedc345"
          }
      ],
      responses:{
          200:{
              description:"Query OK",
              content:{
                   "application/json":{
                      type:'object',
                      example:{
                          status:"success",
                          blog,
                      }
                   }
              }
          }
      }
  }
  // update blog
  const editBlog = {
      tags:['Blogs'],
      description:"update a blog",
      security: [
          {
            token: [],
          },
        ],
      parameters:[
          {
              name:"id",
              in:"path",
              description:"blog id",
              type:"string"
          }
      ],
      requestBody:{
          content:{
              "multipart/form-data":{
                  schema:{
                      type:"object",

                      properties:{
                        
                        username:{
                              type:"file",
                              description:"blog picture"
                          },
                          title:{
                              type:"string",
                          },
                         
                          desc:{
                              type:"string",
                          },

                          categories:{
                            type:"array",
                        },
                         
                      }
                  }
              }
          }
      },
      responses:{
          200:{
              description:"Query OK",
              content:{
                  "application/json":{
                      type:"object",
                      example:{
                          status:"Done",
                          blog,
                      }
                  }
              }
          }
      }
  }// delete a blog
  const deleteBlog = {
      tags:['Blogs'],
      description:"Delete a blog",
        security: [
            {
              token: [],
            },
          ],
      parameters:[
          {
              name:"id",
              in:"path",
              description:"blog id",
              type:"string"
          }
      ],
      responses:{
          200:{
              description:"Query OK",
              content:{
                   "application/json":{
                      type:'object',
                      example:{
                          status:"Done",
                          blog,
                      }
                   }
              }
          }
      }
  }
  const blogsRouteDoc = {

      "/api/posts":{
        get: listAllBlogs,
    },
 
   

      "/api/posts/{id}":{
          get: getSingleBlog,
      },

      "/api/posts?user=Kababa":
      {
        get: getSingleBlog,
    },

    "/api/posts":
    {
      get: listAllBlogs,
  },
  "/api/posts":{
    post: newBlog,
},
      "/api/posts/{id}":{
          delete: deleteBlog,
      },

  }
  module.exports  = blogsRouteDoc;