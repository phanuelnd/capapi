let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");

//Assertion style 

chai.should();
chai.use(chaiHttp);

describe('Blogs API', () =>{
    //test Post
    describe("POST /api/posts", () => {
        it("It should Post all the information of blog", (done) =>{
            chai.request(app)
            .post("/api/posts/")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })


    describe("PUT /api/posts", () => {
        it("It should Update all the data of the blog id", (done) =>{
            chai.request(app)
            .put("/api/posts/id")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })

    describe("PUT /api/posts", () => {
        it("It should Update all the data of the given blog", (done) =>{
            chai.request(app)
            .put("/api/posts/id")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })


    describe("GET /api/posts", () => {
        it("It should Get all the blogs.", (done) =>{
            chai.request(app)
            .get("/api/posts")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })


    describe("DELETE /api/posts", () => {
        it("It should delete the blog post that match provided ID", (done) =>{
            chai.request(app)
            .delete("/api/posts/id")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })

    describe("POST /api/contacts", () => {
        it("It should Send any message.", (done) =>{
            chai.request(app)
            .post("/api/contacts")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })

    describe("GET /api/contacts", () => {
        it("It should Get any message.", (done) =>{
            chai.request(app)
            .get("/api/contacts")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })

    
});
