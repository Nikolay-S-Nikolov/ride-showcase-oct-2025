import mongoose from 'mongoose';

const DB_URL = process.env.DB_URL;

async function initDatabase() {
    try {
        const DB_URL = process.env.DB_URL; //TODO check string in the .env file
        await mongoose.connect(DB_URL);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.log('Error conecting to MongoDB', error);
        console.log(error.message)
    };
}

export default initDatabase;
