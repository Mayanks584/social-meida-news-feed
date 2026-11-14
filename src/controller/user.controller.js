import { ApiError } from "../utils/apierror.js";
import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/asynchandler.js";



import {User} from "../model/user.model.js"


const registeruser = asynchandler(async (req,res)=> {

    /*
    step 1

    fornt se uska data lena hoaga ya postman se uske liye destructing ka use karege
    */

    if (!req.body) {
        throw new ApiError(400, "Request body is missing. Ensure you are sending JSON data.");
    }

    const { username, email, password, name, fullname } = req.body;
    const finalName = name || fullname;

    /*

    step 2

    checking ki user ne kuch choda to nahi inmese kyuki ye important hai

    */
    
    if (
        [username, email, finalName, password].some((field) => !field || field?.trim() === "")
    ) {
        throw new ApiError(400, "all fields are required");
    }


    // step 3 checking if user is already is there in database or not

    const existuser = await User.findOne(
        {
            $or: [{username}, {email}]
        }
    );
    
    if (existuser) {
        throw new ApiError(409, "user already existed");
    }

    const createuser = await User.create({
        username,
        email,
        password,
        name: finalName,
    });

    const userfind = await User.findById(createuser._id).select("-password -refreshToken");

    if (!userfind) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(200).json(
        new apiresponse(
            200,userfind,"user is sucessfully register"
        )
    )    



})

export{
    registeruser
}


/*


use this to make acress and refresh token 

node -e "const crypto = require('crypto'); console.log('ACCESS_TOKEN_SECRET=' + crypto.randomBytes(64).toString('hex')); console.log('REFRESH_TOKEN_SECRET=' + crypto.randomBytes(64).toString('hex'));"

*/