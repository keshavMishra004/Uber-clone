const userModel = require("../models/user.model");
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization.split(" ")[1];

    if(!token){
        return res.status(401).json({ message: "Unauthorized"})
    }

    const isBlacklisted = await userModel.findOne({ token : token});

    if (isBlacklisted){
        return res.status(401).json({message: "Unauthorized"})
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized"})
    }
}

// const userModel = require("../models/user.model");
// const bycrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

// module.exports.authUser = async (req, res, next) => {
//     let token = null;

//     if (req.cookies && req.cookies.token) {
//         token = req.cookies.token;
//     } else if (
//         req.headers.authorization &&
//         req.headers.authorization.startsWith("Bearer ")
//     ) {
//         token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     const isBlacklisted = await userModel.findOne({ token: token });

//     if (isBlacklisted) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await userModel.findById(decoded._id);

//         req.user = user;

//         return next();
//     } catch (err) {
//         return res.status(401).json({ message: "Unauthorized" });
//     }
// }