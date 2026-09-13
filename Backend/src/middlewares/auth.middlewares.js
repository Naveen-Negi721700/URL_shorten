import { ApiError } from "../utils/apiError.js";
import { User } from "../models/User.models.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";


export const verifyJwt=asyncHandler(async(req, res, next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if(!token)
        {
            throw new ApiError(401, "unauthorized request")
        }

        const decodedToekn=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        const user=await User.findById(decodedToekn?._id).select("-password -refreshToken")

       if(!user)
        {
            throw new ApiError(401, "Invalid accessToken")
        }

        req.user=user;
        next()

        
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token")
    }
})
