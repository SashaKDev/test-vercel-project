import express from "express";
import {setupApp} from "../../../src/setup-app";
import {DriverInputDto} from "../../../src/drivers/dto/driver.input-dto";
import {VehicleFeature} from "../../../src/drivers/types/types";
import request from "supertest";


describe('Driver body validation', () => {

    const app = express();
    setupApp(app);

    const correctTestDriverData: DriverInputDto = {
        name: 'Valentin',
        phoneNumber: '123-456-7890',
        email: 'valentin@example.com',
        vehicleMake: 'BMW',
        vehicleModel: 'X5',
        vehicleYear: 2021,
        vehicleLicensePlate: 'ABC-123',
        vehicleDescription: 'Some description',
        vehicleFeatures: [VehicleFeature.ChildSeat],
    };

    beforeAll(async () => {
        await request(app)
            .delete('/testing/all-data')
            .expect(204);
    })

    it('should not create driver when incorrect body passed; POST /drivers', async () => {

        const invalidDataSet1 = await request(app)
            .post('/drivers')
            .send({
                ...correctTestDriverData,
                name: '     ',
                phoneNumber: '    ',
                email: 'invalid email',
                vehicleMake: '',
            })
            .expect(400);

        expect(invalidDataSet1.body.errorMessages).toHaveLength(4);

        const invalidDataSet2 = await request(app)
            .post('/drivers')
            .send({
                ...correctTestDriverData,
                name: '     ',
                vehicleModel: '.',
                email: 'invalid email',
            })
            .expect(400);

        expect(invalidDataSet2.body.errorMessages).toHaveLength(3);

        const invalidDataSet3 = await request(app)
            .post('/drivers')
            .send({
                ...correctTestDriverData,
                name: 5,
            })
            .expect(400);

        expect(invalidDataSet3.body.errorMessages).toHaveLength(1);

        const getList = await request(app)
            .get('/drivers')
            .expect(200);

        expect(getList.body.length).toEqual(0);
    })

})