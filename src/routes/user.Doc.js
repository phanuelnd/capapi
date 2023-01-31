const user = [
    {
     "_id": "63d1501020fc45383479edb0",
      "username": "kaka",
      "email": "phazo@gmail.com",
      "password": "$2a$10$4o2aE.McmyzbxuK3nDP03eCY7mtw1HBktTINt4YnzvIegO.9Mww2S",
      "profilePic": "0780922562",
      "createdAt": "2023-01-25T15:51:44.106Z",
      "updatedAt": "2023-01-25T15:51:44.106Z",
      "__v": 0,
     
    }
]
const listAllUsers = {
    tags: ['User'],
    description: "List of all Users",
    responses: {
        200: {
            description: "Query OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
           user
                            
                        }
                    }
                }
            }
        }
    }
}

// create a user

const createUser = {
    tags: ['User'],
    description: "Create a New user",
    requestBody:{
        content:{
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        username:{
                            type:"string",
                            description:"the username of the user",
                            example:"kaka"
                        },
                        email:{
                            type:"string",
                            description:"the email of the user",
                            example:"phazo@gmail.com"
                        },
                        password:{
                            type:"string",
                            description:"the password",
                            example:"123456"
                        },
                      
                        profilePic: {
                            type:"string",
                            description:"profile pic url of the user",
                            example:"desktop"
                        },
                    
                     
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Query OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user
                    }
                }
            }
        }
    }
}
//login

const Login = {
    tags:['User'],
    description:"User Login",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        username:{
                            type:"string",
                            description:"Your email",
                            example:"rugano"
                        },
                        password:{
                            type:"string",
                            description:"your password",
                            example:"123456"
                        },
                    }
                }
            }
        }
    },
    responses:{
        201:{
            description:"OK",
            content:{
                "application/json":{
                    type:"object",
                    example:{
                        status:"success",
                        user
                    }
                }
            }
        }
    }
}


// update profile

const updateUser = {
    tags:['User'],
    description:"Update profile of the user",
    security: [
        {
          token: [],
        },
      ],
      parameters:[
        {
            name:"id",
            in:"path",
            description:"id of user",
            type:"string",
            example:"63caaf3527b29e1d399896da"
        }
    ],
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        username:{
                            type:"string",
                            description:"the username of the user",
                            example:"phanuel23"
                        },
                        email:{
                            type:"string",
                            description:"the email",
                            example:"phanuel@gmail.com"
                        },

                        profilePic:{
                            type:"string",
                            description:"the image of user",
                            example:"desktop/phazo.jpeg"
                        },

                        password:{
                            type:"string",
                            description:"the password of the user",
                            example:"123456"
                        },
                    }
                }
            }
        }
    },
    responses:{
        201:{
            description:"OK",
            content:{
                "application/json":{
                    type:"object",
                    example:{
                        status:"success",
                        data:[]
                    }
                }
            }
        }
    }
}
//delete a user

const deleteUser = {
    tags:['User'],
    description:"Delete a user",
      security: [
          {
            token: [],
          },
        ],
    parameters:[
        {
            name:"id",
            in:"path",
            description:"user id",
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
                        user,
                    }
                 }
            }
        }
    }
}

//creating a blog post

const createBlog = {
    tags: ['User'],
    description: "Create a New blog",
    requestBody:{
        content:{
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        username:{
                            type:"string",
                            description:"the username of the user",
                            example:"kaka"
                        },
                        email:{
                            type:"string",
                            description:"the email of the user",
                            example:"phazo@gmail.com"
                        },
                        password:{
                            type:"string",
                            description:"the password",
                            example:"123456"
                        },
                      
                        profilePic: {
                            type:"string",
                            description:"profile pic url",
                            example:"desktop"
                        },
                    
                     
                    }
                }
            }
        }
    },
    responses: {
        200: {
            description: "Query OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: user
                    }
                }
            }
        }
    }
}
const userRouteDoc = {

    "/api/auth/register":{
        post: createUser,
    },
    
    "/api/auth/login":{
        post: Login,
    },

  

    "/api/users/edit/{id}": {
        put:updateUser
    },

    "/api/users/all":{
        get: listAllUsers,
    },

     "/api/users/delete/{id}":{
     delete: deleteUser,
     }, 

}
module.exports  = userRouteDoc;