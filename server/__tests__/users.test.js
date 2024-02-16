const app = require("../app");
const fs = require('fs');
const request = require("supertest");
const { sequelize, User} = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

let access_token = null
let access_token_false = "aieJWh8&ewbj98HJew_67"

beforeAll(async () => {
    let data = require('../data/user.json');
    data.map(item => {
        delete item.id
        item.password = hashPassword(item.password)
        item.createdAt = new Date()
        item.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Users', data, {})

    let user = await User.findByPk(1)

    access_token = signToken({ id: user.id});
})

describe("GET /users", () => {
    describe("Success", () => {
        test("GET Users Success: Should return status 200 and User Data", async () => {
            let {status, body} = await request(app)
                .get("/users")
                .set("Authorization", `Bearer ${access_token}`)
                
            expect(status).toBe(200)
            expect(body).not.toHaveProperty("password")
            expect(body).toBeInstanceOf(Array)
            expect(body.length).toBeGreaterThan(0)
        })
    })

    describe("Failed", () => {
        test("GET Users Failed (Invalid Token): Should return status 401 and Error Message", async () => {
            let {status, body} = await request(app)
                .get("/users")
                .set("Authorization", `Bearer ${access_token_false}`)
                
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Unauthenticated")
        })

        test("GET Users Failed (Not Login): Should return status 401 and Error Message", async () => {
            let {status, body} = await request(app)
                .get("/users")
                
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Unauthenticated")
        })
    })
})

describe("GET /users/:id", () => {
    describe("Success", () => {
        test("GET Users by Id Success: Should return status 200 and User Data", async () => {
            let id = 1
            let {status, body} = await request(app)
                .get(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token}`)

            expect(status).toBe(200)
            expect(body).toHaveProperty("id", 1)
            expect(body).toHaveProperty("name", "John Doe")
            expect(body).toHaveProperty("email", "john@test.com")
        })
    })

    describe("Failed", () => {
        test("GET Users by Id Failed (Invalid Token): Should return status 401 and Error Message", async () => {
            let id = 1
            let {status, body} = await request(app)
                .get(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token_false}`)
                
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Unauthenticated")
        })

        test("GET Users Failed (Not Login): Should return status 401 and Error Message", async () => {
            let id = 1
            let {status, body} = await request(app)
                .get(`/users/${id}`)
                
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Unauthenticated")
        })

        test("GET Users Failed (Not Found): Should return status 401 and Error Message", async () => {
            let id = 100
            let {status, body} = await request(app)
                .get(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token}`)
                
            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Data Not Found")
        })
    })
})

describe("PUT /users/:id", () => {
    describe("Success", () => {
        test("Update User Success: Should return status 200 and updated data", async () => {
            let id = 1
            let updatedData = {
                name: "King",
                email: "king@test.com"
            }

            let {status, body} = await request(app)
                .put(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token}`)
                .send(updatedData)

            expect(status).toBe(200)
            expect(body).toHaveProperty("message", "Data 1 has been updated")
        })
    })

    describe("Success", () => {
        test("Update User Failed (Name is empty): Should return status 400 and Error Message", async () => {
            let id = 1
            let updatedData = {
                name: " ",
                email: "king@test.com"
            }

            let {status, body} = await request(app)
                .put(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token}`)
                .send(updatedData)

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Name is required")
        })

        test("Update User Failed (Email is empty): Should return status 400 and Error Message", async () => {
            let id = 1
            let updatedData = {
                name: "King",
                email: " "
            }

            let {status, body} = await request(app)
                .put(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token}`)
                .send(updatedData)

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email is required")
        })

        test.only("Update User Failed (Invalid Email Format): Should return status 400 and Error Message", async () => {
            let id = 1
            let updatedData = {
                name: "King",
                email: "King.com"
            }

            let {status, body} = await request(app)
                .put(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token}`)
                .send(updatedData)

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Invalid Email Format")
        })

        test("Update User Failed (Invalid Token): Should return status 401 and Error Message", async () => {
            let id = 1
            let updatedData = {
                name: "King",
                email: "king.@test.com"
            }

            let {status, body} = await request(app)
                .put(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token_false}`)
                .send(updatedData)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Unauthenticated")
        })

        test("Update User Failed (Not Login): Should return status 401 and Error Message", async () => {
            let id = 1
            let updatedData = {
                name: "King",
                email: "king.@test.com"
            }

            let {status, body} = await request(app)
                .put(`/users/${id}`)
                .send(updatedData)

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Unauthenticated")
        })

        test("Update User Failed (Data Not Found): Should return status 401 and Error Message", async () => {
            let id = 100
            let updatedData = {
                name: "King",
                email: "king.@test.com"
            }

            let {status, body} = await request(app)
                .put(`/users/${id}`)
                .send(updatedData)

            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Data Not Found")
        })
    })
})

describe("PATCH /users/:id/img", () => {
    describe("Success", () => {
        test("Patch Image Success: Should return status 200 and Success Message", async () =>{
            let id = 1
            let image_sample = fs.readFileSync('./uploads/Fern.jpeg')
            let {status, body} = await request(app)
                .patch(`/users/${id}/img`)
                .set("Authorization", `Bearer ${access_token}`)
                .attach('image', image_sample, {filename: 'Fern.jpeg'})
                
                console.log(body);
                expect(status).toBe(200)
                expect(body).toHaveProperty("message", `Image User ${id} has been updated`)
        })
    })

    describe("Failed", () => {
        test("Patch Image Failed (Invalid Token): Should return status 200 and Success Message", async () =>{
            let id = 1
            let image_sample = fs.readFileSync('./uploads/Fern.jpeg')
            let {status, body} = await request(app)
                .patch(`/users/${id}/img`)
                .set("Authorization", `Bearer ${access_token_false}`)
                .attach('image', image_sample, {filename: 'Fern.jpeg'})
                
                console.log(body);
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", `Unauthenticated`)
        })

        test("Patch Image Failed (Not Login): Should return status 200 and Success Message", async () =>{
            let id = 1
            let image_sample = fs.readFileSync('./uploads/Fern.jpeg')
            let {status, body} = await request(app)
                .patch(`/users/${id}/img`)
                .attach('image', image_sample, {filename: 'Fern.jpeg'})
                
                console.log(body);
                expect(status).toBe(401)
                expect(body).toHaveProperty("message", `Unauthenticated`)
        })
    })
})



afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        cascade: true,
        restartIdentity: true
    })
})