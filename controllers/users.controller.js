const User = require("../models/Users");

exports.checkToken = (req, res, next) => {
    try {
       
    }
    catch (error) {
        return res.status(400).send(error) 
    }
}

async function generateRandomSixDigits() {
    var min = 100000; // Minimum value (inclusive)
    var max = 999999; // Maximum value (inclusive)
    const number =  Math.floor(Math.random() * (max - min + 1)) + min;

    const exist = await User.findOne({ meterNumber: number });
    if (exist){
        return await generateRandomSixDigits(); 
    } else {
        return number;
    }
  }

exports.registerUser = async (req, res) => {
    try {

        const { fullName, phoneNumber,district,sector,cell,village } = req.body;

        const meterNumber = await generateRandomSixDigits();

        const newUser = new User({ fullName, phoneNumber, meterNumber: meterNumber,district,sector,cell,village });
        await newUser.save();

        return res.status(201).send({message: "Account created successfully!",status: true,meterNumber: meterNumber });

    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}