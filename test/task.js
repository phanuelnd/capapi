import { should, use, expect, request } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

//Assertion style

should();
use(chaiHttp);
let loginToken;

describe("Authentication", async () => {
  describe("Register /api/auth/register", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "random@gmail.com",
      password: "phanuel2",
    });
    loginToken = res.body.token;
  });
  describe("Login /api/auth/login", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "random@gmail.com",
      password: "phanuel2",
    });
    loginToken = res.body.token;
  });
});

describe("Blogs API", async () => {
  // Get All Posts
  describe("Get /api/posts/a;;", () => {
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
