import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

// we use JWT to know save cookies to setup process auth 
export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated!"))

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403, "Token is not valid!"))
        req.userId = payload.id;
        next()
    });

};

export const verifyUser = (req, res, next) => {
    
    const user_id = req.params.id || req.body._id
    console.log(user_id)
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated!"))

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {

        if (err) return next(createError(403, "Token is not valid!"))
       
        if (payload.id != req.params.id) {
            return next(createError(401, "You are not authenticated!"));
        }
        next()
    });

};


export const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated! not token"));

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403, "Token is not valid!"))

        if (payload.role !== "supersivor" && payload.role !== "moderator") {
            return next(createError(401, "You are not authenticated!"));
        }

        if (payload.hotel !== req.params.hotel_id ) {
            res.status(200).send("You are not authenticated for this hotel")
        } 
        next()
    });
}

export const verifyrole = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
        if (err) return next(createError(403, "Token is not valid!"))
       
        if (payload.role !== "supervisor" && payload.role !== "moderator") {
            res.status(200).send("redirect to Main")
        } else {
            res.status(200).send("redirect to Dashboard")
        }
        next()

    });
}


