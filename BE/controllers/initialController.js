"use strict";
const axios = require('axios');
const Models = require('../models');
const { Op } = require("sequelize");

const storeVehicles = async () => {
    try {

    let response = await axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json')
    
        const cars = response.data.Results;
        console.log(cars)

        for(let car of cars) {
        

        const formatCars ={
            id: car.MakeId,
            make: car.MakeName,
            VTN: car.VehicleTypeName
        
        };

        let [newCar, created ] = await Models.Vehicles.findOrCreate({
            where: {id: car.MakeId},
            defaults: formatCars

        })
       
        }
    } catch (err) {
        console.log(err.message)
    }

}




module.exports = {
    storeVehicles
}