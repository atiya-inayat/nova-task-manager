// this is db connection file , it will contain code for connecting app with db through mongoose , reuse existing connection and avoid multiple connection


// 1. import mongoose 
// 2. read MONGO_URI
// check if mongo-uri exist - if connection exist , return it - else create connection and cache it 
// 3. create cached object
// 4. create connectDB() function 
// 5. export it 

import mongoose from "mongoose";
const MONGO_URI = process.env.MONGODB_URI!;

if (!MONGO_URI) {
    throw new Error("Please define mongo_url in environment variable ")
}

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = {conn: null, promise: null}
}

export async function connectDB() {
    if (cached.conn) {
                console.log("db connected");

        return cached.conn
    }

    if (!cached.promise) {
        const options = {
            bufferCommands: false,
            maxPoolSize: 10
        }

        cached.promise = mongoose
            .connect(MONGO_URI, options)
            .then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise
        console.log("db connected");
        
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn
}
