const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async() => {

    try {
        //mongodb+srv://lgutierrez:Fa2FK4RywW2zXJL4@cluster0.p0j3c.mongodb.net/hospital?authSource=admin&replicaSet=atlas-3k5onw-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
        await mongoose.connect(process.env.DB_CONX, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('DB Online');

    } catch (error) {
        console.log(error);

        throw new Error('Error a la hora de iniciar BD');
    }

}

module.exports = {
    dbConnection
}