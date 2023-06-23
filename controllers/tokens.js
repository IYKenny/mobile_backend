const PurchasedTokens = require("../models/PurchasedTokens");
const User = require("../models/Users");

const getDays = (amount) => {
    return parseInt(amount) / 100;
}

async function generateRandomUnique8Digits() {
    var min = 10000000; // Minimum value (inclusive)
    var max = 99999999; // Maximum value (inclusive)
    const number =  Math.floor(Math.random() * (max - min + 1)) + min;

    const exist = await PurchasedTokens.findOne({ token: number });
    if (exist){
        return await generateRandomUnique8Digits(); 
    } else {
        return number;
    }
  }

exports.getAllTokensByMeter = async(req, res) =>{
    try {

        const { meterNumber } = req.params;

        const exist = await User.findOne({ meterNumber: meterNumber });
        if (!exist){
            return res.status(400).send({message: "Meter number doesn't exists", field: 'meterNumber',status: "failed"})
        }

        const tokens = await PurchasedTokens.find({meterNumber: meterNumber}).sort({ createdAt: -1 });
        return res.send(tokens);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

exports.getTokenInfo = async(req, res) =>{
    try {

        const { token, meterNumber } = req.params;
        
        const exist = await User.findOne({ meterNumber: meterNumber });
        if (!exist){
            return res.status(400).send({message: "Meter number doesn't exists", field: 'meterNumber',status: "failed"})
        }

        const tokens =  await PurchasedTokens.findOneAndUpdate({token: token,meterNumber: meterNumber },{tokenStatus: "USED"})
        
        return res.send(tokens);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

exports.buyToken = async (req, res) => {
console.log("status",req.body)
    
    try {

        const { amount, meterNumber } = req.body;

        const exist = await User.findOne({ meterNumber: meterNumber });
        if (!exist){
            return res.status(400).send({message: "Meter number doesn't exists", field: 'meterNumber',status: "failed"})
        }

        const total = await getTotalAmountByMeterNumber(meterNumber);

        if (( total +  parseInt(amount))> 182500) {
            return res.status(400).send({message: "More than 5 years token is not allowed, you are about to exceed 5 years lighting time", field: 'meterNumber',status: "failed"}) 
        }

        const token = await generateRandomUnique8Digits();
        const newToken = new PurchasedTokens({
            token: token,
            tokenStatus: 'NEW',
            tokenValueDays: getDays(amount),
            amount: amount,
            meterNumber: meterNumber,
        })

        await newToken.save();
        return res.status(200).send({token: token,info: newToken,message: amount +" RWF for ("+getDays(amount)+" days) " + " token has been bought successfully!",status: "success"});
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error);
    }
}

async function getTotalAmountByMeterNumber(meterNumber) {
  try {
      const tokens = await PurchasedTokens.find({
          meterNumber: meterNumber,
          tokenStatus: { $ne: 'EXPIRED' }, // Exclude tokens with tokenStatus 'EXPIRED'
      });

    let totalAmount = 0;
    tokens.forEach(token => {
      totalAmount += token.amount;
    });

    return totalAmount;
  } catch (error) {
    console.error('Error retrieving tokens:', error);
    throw error;
  }
}