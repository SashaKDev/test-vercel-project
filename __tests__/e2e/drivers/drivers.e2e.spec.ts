import express from "express";
import {setupApp} from "../../../src/setup-app";
import {DriverInputDto} from "../../../src/drivers/dto/driver.input-dto";
import request from "supertest";

describe ('Driver API', () => {
    const app = express();
    setupApp(app);

    const testDriverData: DriverInputDto = {
        name: "Valentin",
        phoneNumber: "123-456-7890",
        email: "valentin@example.com",
        vehicleMake: "BMW",
        vehicleModel: "X5",
        vehicleYear: 2021,
        vehicleLicensePlate: "ABC-123",
        vehicleDescription: null,
        vehicleFeatures: []
    };

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204);
    });

    it('should create driver; POST /drivers', async () => {
        const newDriver: DriverInputDto = {
            ...testDriverData
        }
        await request(app)
            .post('/drivers')
            .send(newDriver)
            .expect(201);
    });

    it('should return drivers list; GET /drivers', async () => {
        await request(app)
            .post('/drivers')
            .send({ ...testDriverData, name: 'Another Driver' })
            .expect(201);

        await request(app)
            .post('/drivers')
            .send({ ...testDriverData, name: 'Another Driver2' })
            .expect(201);

        const driversListResponse = await request(app)
            .get('/drivers')
            .expect(200);

        expect(driversListResponse.body).toBeInstanceOf(Array);
        expect(driversListResponse.body.length === 2);
    })

    it('should return driver by id; GET /drivers/:id', async () => {
        const createResponse = await request(app)
            .post('/drivers')
            .send({ ...testDriverData, name: 'Another Driver' })
            .expect(201);

        const getResponse = await request(app)
            .get(`/drivers/${createResponse.body.id}`)
            .expect(200);

        expect(getResponse.body.id).toEqual(createResponse.body.id);
        expect(getResponse.body).toEqual(getResponse.body);
    })

})