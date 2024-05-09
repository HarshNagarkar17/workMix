import express from  "express"
import cors from "cors";
import helmet from "helmet";
import router from "./routes/user.routes.js";
import tokenRouter from "./routes/token.routes.js";
import workRouter from "./routes/work.routes.js";

import "./database/db.js";


const app = express();

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use("/api",router);
app.use("/token",tokenRouter)
app.use("/work",workRouter )
export default app;