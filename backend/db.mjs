/**
 * Database layer with in-memory fallback.
 * When MongoDB is available, uses Mongoose. Otherwise, runs purely in-memory.
 * This ensures the app works in Postman without any DB setup.
 */
import { config } from "dotenv";
config();

let mongoConnected = false;
let mongoose = null;

// In-memory stores (always available as fallback)
const inMemoryStore = {
    components: [],
    builds: [],
    sessions: {}
};

/**
 * Attempt to connect to MongoDB. If it fails, silently fall back to in-memory.
 */
export async function connectDB() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.log("[WARNING] No MONGODB_URI set – running with in-memory storage");
        return false;
    }

    try {
        mongoose = (await import("mongoose")).default;
        await mongoose.connect(uri);
        mongoConnected = true;
        console.log("[OK] Connected to MongoDB");
        return true;
    } catch (err) {
        console.log("[WARNING] MongoDB connection failed – falling back to in-memory storage");
        console.log(`   Reason: ${err.message}`);
        return false;
    }
}

export function isMongoConnected() {
    return mongoConnected;
}

export function getStore() {
    return inMemoryStore;
}

export { mongoose };
