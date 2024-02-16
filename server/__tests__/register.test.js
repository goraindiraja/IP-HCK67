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

describe("/register", () => {
    describe("Success", () => {
        test("Test Success: Should return statu 200 and User Object", async () => {
            let {status, body} = await request(app)
            .post('/register')
            .send({
                name: "Tono",
                email: "tono@test.com",
                password: "tono123"
            })

            expect(status).toBe(200)
            expect(body).toHaveProperty("id", expect.any(Number))
            expect(body).not.toHaveProperty("password")
        })
    })

    describe("Failed", () => {
        test("Test Failed (Name is Empty): Should return statu 400 and Error Message", async () => {
            let {status, body} = await request(app)
            .post('/register')
            .send({
                name: "",
                email: "tono@test.com",
                password: "tono123"
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Name is required")
        })

        test("Test Failed (Email is Empty): Should return statu 400 and Error Message", async () => {
            let {status, body} = await request(app)
            .post('/register')
            .send({
                name: "Tono",
                email: "",
                password: "tono123"
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Email is required")
        })

        test("Test Failed (Password is Empty): Should return statu 400 and Error Message", async () => {
            let {status, body} = await request(app)
            .post('/register')
            .send({
                name: "Tono",
                email: "tono@test.com",
                password: ""
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message", "Password is required")
        })

        test.only("Test Failed (Email is already registered): Should return statu 400 and Error Message", async () => {
            let {status, body} = await request(app)
            .post('/register')
            .send({
                name: "John",
                email: "john@test.com",
                password: "john123"
            })

            expect(status).toBe(400)
            expect(body).toHaveProperty("message","Email has already been registered")
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


