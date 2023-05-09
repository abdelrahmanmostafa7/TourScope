import "./navbar.scss"
import { Link } from "react-router-dom";
import logo from "../../image/logo.png"
import user from "../../image/user.png"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import favouriteList from "../../image/favouriteList.png"
import signOut from "../../image/signOut.png"
import reservation from "../../image/reservation.png"
import manageAccount from "../../image/manageAccount.png"
import newRequest from "../../utils/newRequest.js"

function Navbar() {
    const [open, setOpen] = useState(false)
    const [openDate, setOpenDate] = useState(false)
    const [destination, setDestination] = useState("")
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: "selection",
        },
    ]);
    const [openOptions, setOpenOptions] = useState(false)
    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    })


    const navigate = useNavigate()
    const homeBtn = () => {
        navigate("/") 

    }
    const contactBtn = () => {
        navigate("/contact")
    }
    const logInBtn = () => {
        navigate("/logInOut")
    }
    const signUp = () => {
        const signup = true
        navigate("/logInOut" , {state: signup})
    }

    const hotelPage = () => {
        navigate("/hotels", { state: { destination, date, options } })
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"))
    const handleSignout = async () => {
        try {
            await newRequest.post("/auth/signout")
            localStorage.setItem("currentUser", null)
            navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="navbar">
            <div className="navContainer">

                <Link to='/'>
                    <img src={logo} className="logo" alt="" />
                </Link>

                <div className="Items">
                    <h3 className="menuItem" onClick={homeBtn}>Home</h3>
                    <h3 className="menuItem " onClick={hotelPage}>Hotels</h3>
                    <h3 className="menuItem " onClick={contactBtn}>Contact</h3>
                </div>
                {!currentUser && <div className="navItem">
                    <button className="navButton" onClick={logInBtn}>Log in</button>
                    <button className="navButton" onClick={signUp}>Sign up</button>
                </div>}

                {currentUser &&
                    (
                        <div className="user" onClick={() => setOpen(!open)}>

                        <img src={user} alt="" className="profileImg" />
                            <span className="userName">{currentUser?.first_name}</span>

                            {open && <div className="options">
                                <Link to='/personalDetails'>
                                    <div className="option2">
                                        <img src={manageAccount} alt="" className="icon2" />
                                        <span>Manage account</span>
                                    </div>
                                </Link>
                                <hr />
                                <Link to='/reservations'>
                                    <div className="option2">
                                        <img src={reservation} alt="" className="icon2" />
                                        <span>My Reservations</span>
                                    </div>
                                </Link>
                                <hr />
                                <Link to='/favoriteList'>
                                    <div className="option2">
                                        <img src={favouriteList} alt="" className="icon2" />
                                        <span>Favorite list</span>
                                    </div>
                                </Link>
                                <hr />
                                <Link to='/'>
                                    <div className="option2" onClick={handleSignout}>
                                        <img src={signOut} alt="" className="icon2" />
                                        <span>Sign out</span>
                                    </div>
                                </Link>
                            </div>}
                        </div>
                    )}

            </div>
        </div>
    )
}

export default Navbar