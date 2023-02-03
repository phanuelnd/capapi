import { should, use, request } from "chai";
import chaiHttp from "chai-http";
import app from "../src/index";

//Assertion style

should();
use(chaiHttp);

describe("Blogs API", () => {
  //test Post
  describe("POST /api/posts", () => {
    it("It should Post all the tasks", (done) => {
      request(app)
        .get("/api/posts/")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("PUT /api/posts", () => {
    it("It should Update all the data", (done) => {
      request(app)
        .put("/api/posts/id")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });

  describe("PUT /api/posts", () => {
    it("It should Update all the data", (done) => {
      request(app)
        .put("/api/posts/id")
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });
  });
});
