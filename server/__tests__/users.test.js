const app = require("../app");
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
        test.only("GET Users by Id Failed (Invalid Token): Should return status 401 and Error Message", async () => {
            let id = 1
            let {status, body} = await request(app)
                .get(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token_false}`)
                
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Unauthenticated")
        })

        test.only("GET Users Failed (Not Login): Should return status 401 and Error Message", async () => {
            let id = 1
            let {status, body} = await request(app)
                .get(`/users/${id}`)
                
            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Unauthenticated")
        })

        test.only("GET Users Failed (Not Found): Should return status 401 and Error Message", async () => {
            let id = 100
            let {status, body} = await request(app)
                .get(`/users/${id}`)
                .set("Authorization", `Bearer ${access_token}`)
                
            expect(status).toBe(404)
            expect(body).toHaveProperty("message", "Data Not Found")
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