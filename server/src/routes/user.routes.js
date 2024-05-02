import {Router} from "express";
import { getUser, login, register } from "../controllers/auth.controller.js";
import { verifyUser } from "../middlewares/auth.js";
import multer from "multer"
const router = Router();

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./src/uploads/profile-images')
    },
    filename:function(req,file,cb){
        cb(null,req.user._id + "-"+file.originalname)
    }
})

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true);
//     } else {
//         cb(new Error('Only image files are allowed!'), false);
//     }
// }
const upload = multer({storage});

router.post("/register",upload.single("profileImage"),register)

router.post("/login",login);

router.post("/getUser",verifyUser,getUser);
export default router;