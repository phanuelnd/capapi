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

const listAllUsers = {
    tags: ['Viewer'],
    description: "List of all Users",
    responses: {
        200: {
            description: "Query OK",
            content: {
                "application/json": {
                    schema: {
                        type: "object",
                        example: {
           viewers
                            
                        }
                    }
                }
            }
        }
    }
}

// create a user

const register = {
    tags: ['Viewer'],
    description: "Create a New Client",
    requestBody:{
        content:{
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name:{
                            type:"string",
                            description:"the name of the client",
                            example:"Phazo"
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
                        example: viewers
                    }
                }
            }
        }
    }
}
//login

const Login = {
    tags:['Viewer'],
    description:"Clients Login",
    requestBody:{
        content:{
            "application/json":{
                schema:{
                    type:"object",
                    properties:{
                        email:{
                            type:"string",
                            description:"Your email",
                            example:"rugano@gmail.com"
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
                        viewers
                    }
                }
            }
        }
    }
}


// update profile

const updateUser = {
    tags:['Viewer'],
    description:"Update profile of the client",
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
                        userId:{
                            type:"string",
                            description:"User Id of the client",
                            example:"63d01eef296f28432dedc35f"
                        },
                        email:{
                            type:"string",
                            description:"the email",
                            example:"phanuel@gmail.com"
                        },

                        name:{
                            type:"string",
                            description:"the image of user",
                            example:"Phanuel"
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
    tags:['Viewer'],
    description:"Delete a client",
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
                        viewers,
                    }
                 }
            }
        }
    }
}

//creating a blog post

const sendaMessage = {
    tags: ['Viewer'],
    description: "Send a New message",
    requestBody:{
        content:{
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        name:{
                            type:"string",
                            description:"the Name of the client",
                            example:"Phanuel"
                        },
                        email:{
                            type:"string",
                            description:"the email of the user",
                            example:"phazo@gmail.com"
                        },
                        phone:{
                            type:"string",
                            description:"the Phone number of the client",
                            example:"0788888888"
                        },
                      
                        message: {
                            type:"string",
                            description:"a Message",
                            example:"ese usigaye uba ahehe"
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
                        example: viewers
                    }
                }
            }
        }
    }
}


const clientRouteDoc = {

    "/api/viewers/register":{
        post: register,
    },

    "/api/viewers/login": {
        post:Login
    },

    "/api/viewers/update/{id}":{
        put: updateUser,
        }, 

     "/api/viewers/delete/{id}":{
     delete: deleteUser,
     }, 

    "/api/contacts/sendamessage":{
        post: sendaMessage,
    },

    // "/api/posts/all":{
    //     get: allMessage,
    // },

}

module.exports = clientRouteDoc