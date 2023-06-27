import express from "express";
import { signup, signin, signout, socialtoken, cheack_user, send_forget_passowrd_otp, confirm_otp } from "../controllers/auth.controller.js"
import passport from "passport";
import { verifyrole } from "../middleware/jwt.js";
const router = express.Router();
// user normal signin / signup
router.get("/role", verifyrole)
router.post("/signup", signup)
router.post("/signin", signin)
router.post("/signout", signout)

// user google signin / signup
router.get("/signin/failed", (req, res) => {
    res.status(401).json({ message: "Login failed" });

});

router.get("/google", passport.authenticate("google"));
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/api/auth/signin/failed"
})
    , socialtoken

);
router.get("/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook"
    , {
        failureRedirect: "/api/auth/signin/failed"

    }, socialtoken)

);

router.post('/forgetpassword', send_forget_passowrd_otp)
router.post('/resetpassword', confirm_otp)
router.post('/currentuser', cheack_user)





// user facebook signin / signup

export default router;