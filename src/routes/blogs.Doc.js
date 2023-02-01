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

  const message = [
    {
                       
         "_id": "63d01d08296f28432dedc353",
         "name": "Fazo",
         "email": "fazo@gmail.com",
        "phone": "7878787878",
        "message": "I wanna give you a job",

        "createdAt": "2023-01-24T18:01:44.670+00:00",
       "updatedAt": "2023-01-24T18:01:44.670+00:00",
       "__v":0
    }
]

const viewers = [
    
        {
            "_id": "63d2e7023c71a4e752ea154a",
            "name": "Phanuizo",
            "email": "phazoo10@gmail.com",
            "password": "$2b$10$09sfuWu7GV4Prq/VEWMLteIaZKOsOPPk75d0tm9ZGtVzj8lr1esU.",
            "createdAt": "2023-01-26T20:48:02.010Z",
            "updatedAt": "2023-01-26T20:48:02.010Z",
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

  const allMessage = {
    tags:['Blogs'],
    description:"List of all messages",
    responses:{
        200:{
            description:"Query OK",
            content:{
                 "application/json":{
                    type:'object',
                    example:{
                        status:"Done",
                        message
                    }
                 }
            }
        }
    }
}

const allViewers = {
    tags:['Blogs'],
    description:"List of all Client users",
    responses:{
        200:{
            description:"Query OK",
            content:{
                 "application/json":{
                    type:'object',
                    example:{
                        status:"Done",
                        viewers
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

    "/api/posts/new":{   //creeartes a new blog
        post: newBlog,
       },

       "/api/posts/edit/{id}":{ //update a blog 
        put: editBlog,
    },

      "/api/posts/all":{
        get: listAllBlogs,//list all the blogs
        },

        "/api/contacts/all":{   //get all the message
            get: allMessage,
           },


           "/api/users/viewers":{   //creeartes a new blog
            get: allViewers,
           },
           
 
    //    "/api/posts/all/{id}":{
    //       get: getSingleBlog,//get single blog by Id 
    //   },

    //   "/api/posts?user=Kababa": //get single blog by Author
    //   {
    //     get: getSingleBlog,
    //   },

     
      "/api/posts/delete/{id}":{ //delete a blog 
          delete: deleteBlog,
      },



  }
  module.exports  = blogsRouteDoc;