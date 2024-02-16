const app = require("../app");
const request = require("supertest");
const { sequelize, User} = require("../models");
const { queryInterface } = sequelize;
const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

beforeAll(async () => {
    let data = require('../data/user.json');
    data.map(item => {
        delete item.id
        item.password = hashPassword(item.password)
        item.createdAt = new Date()
        item.updatedAt = new Date()
    })

    await queryInterface.bulkInsert('Users', data, {})
})

describe("/login", () => {
    describe("Success", () => {
        test("Test Success: Should return status 200 and Access Token", async () => {
            let {status, body} = await request(app)
            .post('/login')
            .send({
                email: "john@test.com",
                password: "john123"
            })

            expect(status).toBe(200)
            expect(body).toHaveProperty("access_token", expect.any(String))
        })
    })

    describe("Failed", () => {
        test("Test Failed (Email is Empty): Should return status 400 and Error Message", async () => {
            let {status, body} = await request(app)
            .post('/login')
            .send({
                email: "",
                password: "john123"
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email / Password is required")
        })

        test("Test Failed (Password is Empty): Should return status 400 and Error Message", async () => {
            let {status, body} = await request(app)
            .post('/login')
            .send({
                email: "john@test.com",
                password: ""
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email / Password is required")
        })

        test("Test Failed (Password is Wrong): Should return status 400 and Error Message", async () => {
            let {status, body} = await request(app)
            .post('/login')
            .send({
                email: "john@test.com",
                password: "john12345"
            })

            expect(status).toBe(401)
            expect(body).toHaveProperty("message", "Invalid Email / Password")
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