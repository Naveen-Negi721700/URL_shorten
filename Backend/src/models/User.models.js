import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
const userSchems = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,


    },
    password: {
        type: String,
        required: [true, "password is required"],
    },

    refreshToken: {
        type: String,

    }

}, { timestamps: true })


userSchems.pre('save', async function () {
    if (!this.isModified('password')) return;                           //it is a middleware function that will run before saving the user to the database. It checks if the password field has been modified. If it hasn't, the function returns early and does not hash the password again. This is important because we only want to hash the password when it is first created or when it is changed, not every time the user document is saved.
    this.password = await bcrypt.hash(this.password, 10);
});
userSchems.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

userSchems.method.getAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        },

    )
}


userSchems.method.getRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    }
)
}
export const User = mongoose.model("User", userSchems)