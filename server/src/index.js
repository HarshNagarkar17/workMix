import express from  "express"
import cors from "cors";
import helmet from "helmet";
import router from "./routes/user.routes.js";

import "./database/db.js";


const app = express();

app.use(cors({origin:[process.env.CLIENT_URL]}));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api",router);

export default app;