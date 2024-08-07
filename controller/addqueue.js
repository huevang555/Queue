const { QueryTypes } = require('sequelize');
const { sequelize, booking, historybooking } = require('../config/db');

exports.addqueue = async (req, res) => {
    const { customername, phonenumber, sdate, edate, status } = req.body;

    try {
        // Step 1: Check if the phonenumber exists in the booking table
        const existingBooking = await booking.findOne({
            where: { phonenumber: phonenumber }
        });

        // Step 2: If it exists, check the status
        if (existingBooking && existingBooking.status === 'active') {
            return res.status(400).send("Phone number already has an active booking");
        }

        // Step 3: Insert data into the booking table if the status is not 'active'
        const newBooking = await booking.create({
            customername,
            phonenumber,
            sdate,
            edate,
            status,
            queuenumber: existingBooking ? existingBooking.queuenumber + 1 : 1 // Increment queue number if exists
        });

        // Step 4: Insert data into the historybooking table
        await historybooking.create({
            customername,
            phonenumber,
            date: new Date() // Current date for history booking entry
        });

        return res.status(201).send("Booking added successfully");

    } catch (error) {
        console.error('Error in addqueue:', error);
        return res.status(500).send("Server error");
    }
};
