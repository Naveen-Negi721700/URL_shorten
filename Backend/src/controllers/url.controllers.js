import { ApiError } from "../utils/apiError.js";
import { apiResponce } from "../utils/apiResponce.js"
import { asyncHandler } from "../utils/asyncHandler.js";
import { Url } from "../models/url.models.js";
import { nanoid, } from "nanoid";
import { User } from "../models/User.models.js";
import jwt from "jsonwebtoken";
import QRCode from "qrcode";

const getAccessAndRefreshToken = async (userId) => {

    try {
        const user =await User.findById(userId);


        const accessToken = user.generateAccessToken();


        const refreshToken =user.generateRefreshToken();


        user.refreshToken =refreshToken;


        await user.save({
            validateBeforeSave: false
        });


        return {
            accessToken,
            refreshToken
        };


    } catch (error) {

        throw new ApiError(
            500,
            "Something went wrong"
        );
    }

};
const generateNewShortenUrl = asyncHandler(async (req, res) => {
    const { originalUrl } = req.body;
    // console.log("user url is ", originalUrl);

    if (!originalUrl?.trim()) {
        throw new ApiError(400, "url are required")
    }

    const shortenUrl = nanoid(8);



    const db = await Url.create({
        originalUrl,
        shortenUrl,
        owner: req.user._id,
    })

    const shortUrl = `${req.protocol}://${req.get("host")}/${shortenUrl}`
    console.log(shortUrl);
    const qrCode = await QRCode.toDataURL(shortUrl);


    return res.status(200).json(
        new apiResponce(201,
            {
                originalUrl,
                shortUrl,
                qrCode,
            }, "shortenUrl and QR code created successfully and added to database ")
    )


});

const connectShorterurlWithOriginalurl = asyncHandler(async (req, res) => {

    const { shortenUrl } = req.params;
    console.log(shortenUrl)

    if (!shortenUrl?.trim()) {
        throw new ApiError(400, "Short URL is missing");
    }

    const entry = await Url.findOneAndUpdate(
        {
            shortenUrl
        },
        {
            $push: {
                visitedHistory: {
                    timesStamp: Date.now(),
                },
            },
        }
    );
    // console.log(entry);


    if (!entry) {
        throw new ApiError(404, "Short URL not found");
    }
    // console.log(entry.originalUrl)
    return res.redirect(entry.originalUrl);
});

const handleGetAnalysiser = asyncHandler(async (req, res) => {
    const { shorterurl } = req.params;
    console.log(shorterurl);

    if (!shorterurl?.trim()) {
        throw new ApiError(400, "Short URL is missing");
    }

    const result = await Url.findOne({ shortenUrl: shorterurl })

    if (!result) {
        throw new ApiError(400, "short url not found");
    }
    const count = result.visitedHistory.length;
    // console.log("from console ", count);


    return res.status(200).json(new apiResponce(200, count, "the totol nu,ber of click on url "))

})


const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // console.log("req.body", req.body);

    if ([username, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    }
    )
    if (existingUser) {
        throw new ApiError(409, "User with username or email already exist");
    }

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    return res.status(201).json(
        new apiResponce(201, createdUser, "User register successfully")
    )
})

const loginUser = asyncHandler(async (req, res) => {

    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
        throw new ApiError(
            400,
            "Username/email and password are required"
        );
    }

    const user = await User.findOne({
        $or: [
            { username: usernameOrEmail },
            { email: usernameOrEmail }
        ]
    });

    if (!user) {
        throw new ApiError(400, "User does not exist");
    }

    const ispasswordValid = await user.comparePassword(password);

    if (!ispasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } =
        await getAccessAndRefreshToken(user._id);

    const loggedInUser = await User
        .findById(user._id)
        .select("-password -refreshToken");

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    };

// const options = {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     path: "/"
// };  
  return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponce(
                200,
                loggedInUser,
                "User logged in Successfully"
            )
        );
});

const logOutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        }
    );


    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: "/"
    };

// const options = {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     path: "/"
// };
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new apiResponce(
                200,
                {},
                "User logout successfully"
            )
        );

});

const refreshaccessToken = asyncHandler(
    async (req, res) => {

        console.log("Refresh token route called");


        const incomingRefreshToken =req.cookies?.refreshToken ||req.body?.refreshToken;


        console.log("Refresh token received:",incomingRefreshToken? "YES": "NO");


        if (!incomingRefreshToken) {

            throw new ApiError(
                401,
                "Unauthorized request"
            );
        }


        try {

            const decodedToken =jwt.verify(
                    incomingRefreshToken,
                    process.env.REFRESH_TOKEN_SECRET
                );


            const user =await User.findById(
                    decodedToken?._id
                );


            if (!user) {

                throw new ApiError(
                    401,
                    "Invalid refresh token"
                );
            }


            if (incomingRefreshToken !==user.refreshToken) {

                throw new ApiError(
                    401,
                    "Refresh token is expired or used"
                );
            }


            const {accessToken,refreshToken: newRefreshToken} =
                await getAccessAndRefreshToken(
                    user._id
                );


            const options = {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                path: "/"
            };

//             const options = {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     path: "/"
// };


            return res
                .status(200)

                .cookie(
                    "accessToken",
                    accessToken,
                    options
                )

                .cookie(
                    "refreshToken",
                    newRefreshToken,
                    options
                )

                .json(
                    new apiResponce(
                        200,
                        {},
                        "Access token refreshed successfully"
                    )
                );


        } catch (error) {

            throw new ApiError(
                401,
                error?.message ||
                "Invalid refresh token"
            );

        }

    }
);

const getUserUrls = asyncHandler(async (req, res) => {

    const urls = await Url.find({
        owner: req.user._id
    });

    return res.status(200).json(
        new apiResponce(
            200,
            urls,
            "User URLs fetched successfully"
        )
    );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(new apiResponce(200, req.user, "current user fetch successfully"))
})


const githubLogin = asyncHandler(async (req, res) => {
    const { githubId, email, name, image } = req.body;
    console.log("githubLogin route called");
    // console.log("GitHub data:", req.body);

    if (!githubId || !email) {
        throw new ApiError(400, "GitHub ID and email are required");
    }

    let user = await User.findOne({ githubId });

    if (!user) {
        user = await User.findOne({ email });
    }

    if (!user) {

        user = await User.create({
            username: name || email.split("@")[0],
            email,
            githubId,
            avatar: image
        });

    } else {

        // Existing account found by email
        // Connect this account with GitHub
        if (!user.githubId) {
            user.githubId = githubId;
        }

        if (!user.avatar && image) {
            user.avatar = image;
        }

        await user.save();
    }

    const { accessToken, refreshToken } =
        await getAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    const options = {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/"
};

// const options = {
//     httpOnly: true,
//     secure: false,
//     sameSite: "lax",
//     path: "/"
// };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new apiResponce(
                200,
                loggedInUser,
                "GitHub login successful"
            )
        );
});

export { generateNewShortenUrl, connectShorterurlWithOriginalurl, handleGetAnalysiser, registerUser, loginUser, logOutUser, refreshaccessToken, getUserUrls, getCurrentUser, githubLogin }



