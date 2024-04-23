import express from  "express"
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// app.use(cors({origin:[process.env.CLIENT_URL]}));
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", (req,res) => {
    res.send("/ page");
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
})