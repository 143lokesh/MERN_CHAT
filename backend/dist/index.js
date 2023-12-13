import express from 'express';
import { config } from 'dotenv';
import { connectToDb } from './db/connection.js';
import morgan from 'morgan';
import router from './routes/routes.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
config();
const app = express();
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(morgan("dev"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use("/api/v1", router);
connectToDb()
    .then(() => {
    app.listen(5000, () => {
        console.log("app is listening");
    });
})
    .catch((err) => {
    console.log(err);
});
//# sourceMappingURL=index.js.map