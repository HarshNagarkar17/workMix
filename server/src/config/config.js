import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const config = {
    JWT:{
        SECRET:process.env.SECRET
    },
    EMAIL:{
        EMAIL_ID:process.env.EMAIL_ID,
        EMAIL_PASSWORD:process.env.EMAIL_PASSWORD
    },
    MONGO:process.env.MONGO_URI,
    PORT:process.env.PORT
}

export default config;