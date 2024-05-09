import path,{dirname} from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getTemplateProfilePicture = async () => {
    const imgSrc = path.join(__dirname, "../uploads/profile-images/", "template.jpg");
    const imageData = await fs.readFileSync(imgSrc, { encoding: "base64" });
    const img = `data:image/jpeg;base64,${imageData}`;
    
    return img;
}

export const getUserProfilePicture = async (user) => {
    const imgSrc = path.join(__dirname, "../uploads/profile-images/", user.profileImage);
    const imageData = await fs.readFileSync(imgSrc, { encoding: "base64" });
    const img = `data:image/jpeg;base64,${imageData}`;

    return img;
}