import { should, use, expect, request } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";
import User from "../src/models/User";

//Assertion style
process.env.NODE_ENV = "test";
should();
use(chaiHttp);
let loginToken;

after(async () => {
  User.deleteMany({ email: "random@gmail.com" });
});

describe("Authentication", async () => {
  describe("Register /api/auth/register", async () => {
    it("Should register new user", async () => {
      const res = await request(app).post("/api/auth/login").send({
        email: "random@gmail.com",
        password: "phanuel2",
      });
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
  // describe("PUT /api/posts", () => {
  //   it("It should Update all the data", (done) => {
  //     request(app)
  //       .put("/api/posts/id")
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         done();
  //       });
  //   });
  // });
  // describe("PUT /api/posts", () => {
  //   it("It should Update all the data", (done) => {
  //     request(app)
  //       .put("/api/posts/id")
  //       .end((err, response) => {
  //         response.should.have.status(200);
  //         done();
  //       });
  //   });
  // });
});

describe("Contact ", async () => {
  it("Should add new query", async () => {
    const query = {
      name: "Test User",
      phone: "0789924378",
      email: "test@gmail.com",
      message: "This is the message of our contents",
    };
    const res = await request(app)
      .post("/api/auth/login")
      .set("Authorization", `Bearer ${loginToken}`)
      .send(query);
    expect(res).to.have.status(200);
  });
});
// describe("Comment ", async () => {
//   // Get All Posts
//   describe("Get /api/comment/all", () => {
//     it("It should fetch all comments", (done) => {
//       request(app)
//         .get("/api/comment")
//         .end((err, response) => {
//           response.should.have.status(200);
//           done();
//         });
//     });
//   });
// });
