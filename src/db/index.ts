import mongoose, { Connection } from "mongoose";

class mongo {
    constructor() {}

    async connect(): Promise<Connection> {
        const uri = process.env.MONGO_URL || "";
        try {
            console.log("Connected to MongoDB");
            const options = {}; // Add any required options
            await mongoose.connect(uri, options);
            return mongoose.connection;
        } catch (error) {
            console.log(error);
            throw error; // Optional: Rethrow the error for the caller to handle
        }
    }
}

export default mongo;