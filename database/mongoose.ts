import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    };
}

let cache = global.mongooseCache;

if (!cache) {
    cache = global.mongooseCache = {
        conn: null,
        promise: null,
    };
}

export const connectToDatabase = async () => {
    if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined in the .env file');
    }

    if (cache.conn) {
        return cache.conn;
    }

    if (!cache.promise) {
        cache.promise = mongoose.connect(MONGO_URI, {
            bufferCommands: false,
        });
    }

    try {
        cache.conn = await cache.promise;
    } catch (error) {
        cache.promise = null;
        throw error;
    }

    console.log(`Connected to MongoDB in ${process.env.NODE_ENV} mode`);
    return cache.conn;
};
