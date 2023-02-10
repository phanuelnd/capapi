import { should, use, expect, request } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import User from "../src/models/User";
import Viewer from "../src/models/Viewer";

//Assertion style
process.env.NODE_ENV = "test";
should();
use(chaiHttp);
let loginToken;
let userToUpdate={}
after(async () => {
  await User.deleteMany({ email: "random@gmail.com" })
  await Viewer.deleteMany({ email: "random1@gmail.com" });
});







describe("Authentication", async () => {
  describe("Register /api/auth/register", async () => {
    it("Should register new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "tee",
        userType: 'user',
        email: "random@gmail.com",
        password: "phanuel2",
      });
      userToUpdate=res.body._id
    });
  });
  describe("Login /api/auth/login", async () => {
    it("Should login user with correct credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "random@gmail.com",
        password: "phanuel2",
      });
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("token");
      loginToken = res.body.token;
    });
    it("Should return error for invalid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "rand@gmail.com",
        password: "phanuel2",
      });
      expect(res).to.have.status(400);
      const res2 = await request(app).post("/api/auth/login").send({
        email: "random@gmail.com",
        password: "panuel2",
      });
      expect(res).to.have.status(400);
    });
  });
});

describe("Users ", async () => {
  // Get All Posts
  describe("Get /api/users/all", async () => {
    let userId = {};
    it("It should fetch all users", (done) => {
      request(app)
        .get("/api/users/all")
        .end((err, response) => {
          response.should.have.status(200);
          expect(response).to.be.a("object");
          expect(response).to.have.property("body").and.to.be.a("array");
          userId = response.body[0]._id;
          done();
        });
    });
    it("Should fetch one user", (done) => {
      request(app)
        .get("/api/users/" + userId)
        .end((err, response) => {
      
          response.should.have.status(200);
          expect(response).to.be.a("object");
          done();
        });
    });
    it("Should update one user", async (done) => {

     const response = await request(app).put(`/api/users/edit/${userToUpdate}`).send({
      userId:"63e247f34b1df073c10b2be5",
          username: "dash dash",
          email: "random@gmail.com",
          password: "phanuel2",
        });
        // .end((err, response) => {
        console.log(response.body)

          expect(response).to.have.status(200);
          // expect(response.body).to.be.a("object");
          done();
        // });
    });
    // api/users/edit/63e247f34b1df073c10b2be5
  });
});

describe("Blogs ", async () => {
  // Get All Posts
  describe("Get /api/posts/all", () => {
    it("It should fetch all posts", (done) => {
      request(app)
        .get("/api/posts/all")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("Get /api/categories/allsubs", () => {
    it("It should fetch all categories", (done) => {
      request(app)
        .get("/api/categories/allsubs")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  // Test Post
  describe("POST /api/posts", async () => {
    it("It should Post all the tasks", (done) => {
      request(app)
        .post("/api/posts/new")
        .set("Authorization", `Bearer ${loginToken}`)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });  
});



describe("Viewers ", async () => {
  let vId={}
  it("Should post a viewers", async () => {

    const res =  await request(app).post("/api/viewers/register").send({
            name:"phanufghel10 ",
            email:"random1@gmail.com",
            password: "phanuel10"
          });
          vId=res.body._id
          console.log(res.body)
           expect(res).to.have.status(200);   
    
      });


      it("Should login to a viewers", async () => {
        const res = await request(app).post("/api/viewers/login").send({
          email: "random1@gmail.com",
          password: "phanuel10",
        });
        console.log(res.body)
        expect(res).to.have.status(200);
        
          });

     
          it("Should update one user", async (done) => {
            console.log(userToUpdate)
           const response = await request(app).put(`/api/viewers/update/${vId}`).send({
            userId:"63e247f34b1df073c10b2be5",
                name: "phanufghel10",
                email: "random1@gmail.com",
                password: "phanuel2",
              });
              // .end((err, response) => {
              console.log(response.body)
      
                expect(response).to.have.status(200);
                // expect(response.body).to.be.a("object");
                done();
              // });
          });
          it("Should delete user viewer", async () => {
    
            const res= await request(app)
                 .delete("/api/viewers/delete/"+vId)
                
                   console.log(res.body)
                   expect(res).to.have.status(200);
             
             });
});

describe("Contact ", async () => {
  let id={}
  it("Should add new query", async () => {
    const query = {
      name: "Test User",
      email: "test@gmail.com",
      phone: "0789924378",
      message: "This is the message of our contents",
    };
    const res = await request(app)
      .post("/api/contacts/new")
      .send(query);
      id=res.body._id
    expect(res).to.have.status(200);
  });

  it("Should delete query", async () => {
    const query = {
      name: "Test User",
      email: "test@gmail.com",
      phone: "0789924378",
      message: "This is the message of our contents",
    };
  await request(app)
      .delete("/api/contacts/"+id)
      .end((err,res)=>{
        expect(res).to.have.status(200);
      });
  });

  it("Should get all messages", async () => {
const res =  await request(app)
      .get("/api/contacts/allme");

        expect(res).to.have.status(200);   

  });
});



describe("Posts ", async () => {

  let id = {}
  let vId={}
  it("Should add a new blogs", async () => {
    const query = {
      username:"faazo",
      title:"HTML 3 is not Programming",
      desc:"Programming is an art, and Andela trains bests artists for the game.",
      categories:"Education"
    };
    const res = await request(app)
      .post("/api/posts/new")
      .send(query);
      console.log(res)
    expect(res).to.have.status(200);
  });

  it("Should update blog posts ", async (done) => {
    console.log(userToUpdate)
   const response = await request(app).put(`/api/posts/edit/${vId}`).send({
    userId:"63e247f34b1df073c10b2be5",
        name: "phanufghel10",
        email: "random1@gmail.com",
        password: "phanuel2",
      })

      // .end((err, response) => {
      console.log(response.body)

        expect(response).to.have.status(200);
        // expect(response.body).to.be.a("object");
        done();
      // });
  });


  it("Should delete a blog post", async () => {
    const query = {
      username
    };
  await request(app)
      .delete("/api/posts/delete/" + id)
      .send(query)

      id =res.body._id
      username =res.body.username
      console.log(username)
      .end((err,res)=>{
        expect(res).to.have.status(200);
      });
  });


  it("Should get all blogs", async () => {
    const res =  await request(app)
          .get("/api/posts/all");
           expect(res).to.have.status(200);   
    
      });
    });