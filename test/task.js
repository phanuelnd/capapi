let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../index");

//Assertion style 

chai.should();
chai.use(chaiHttp);

describe('Blogs API', () =>{
    //test Post
    describe("POST /api/posts", () => {
        it("It should Post all the tasks", (done) =>{
            chai.request(app)
            .get("/api/posts/")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })


    describe("PUT /api/posts", () => {
        it("It should Update all the data", (done) =>{
            chai.request(app)
            .put("/api/posts/id")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })

    describe("PUT /api/posts", () => {
        it("It should Update all the data", (done) =>{
            chai.request(app)
            .put("/api/posts/id")
            .end((err, response) => {
                response.should.have.status(200);
                done();
            })
        })
    })

    
});
