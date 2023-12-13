import { connect, disconnect } from 'mongoose';
async function connectToDb() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("db is connected ");
    }
    catch (err) {
        console.log(err);
        throw new Error("cannot connect to mongodb");
    }
}
async function disconnectDB() {
    try {
        await disconnect();
    }
    catch (err) {
        console.log(err);
    }
}
export { connectToDb, disconnectDB };
//# sourceMappingURL=connection.js.map