    import "./footer.scss"
    import logo from "../../image/logo.png"


    const Footer = () => {
    return (
        <div className="footer">
            <div className="row">
                <div className="fList">
                    <img src={logo} className="logo" alt="" />            
                    <p>Choose Your Room in Your Room,
                        <br />  A website that books hotels and has VR options allows users <br /> to search and book hotels online while providing them with <br /> a virtual reality experience  of the hotel rooms and facilities.</p>
                </div>
                <ul className="fList">
                    <li className="fListItem">Countries</li>
                    <li className="fListItem">Regions</li>
                    <li className="fListItem">Cities</li>
                    <li className="fListItem">Districts</li>
                    <li className="fListItem">Airports</li>
                    <li className="fListItem">Hotels</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Homes </li>
                    <li className="fListItem">Apartments </li>
                    <li className="fListItem">Resorts </li>
                    <li className="fListItem">Villas</li>
                    <li className="fListItem">Hostels</li>
                    <li className="fListItem">Guest houses</li>
                </ul>
                <ul className="fList">
                    <li className="fListItem">Unique places to stay </li>
                    <li className="fListItem">Reviews</li>
                    <li className="fListItem">Unpacked: Travel articles </li>
                    <li className="fListItem">Travel communities </li>
                    <li className="fListItem">Seasonal and holiday deals </li>
                </ul>
                
            </div>
            <hr className="hr" />
            <div className="fText">Copyright © 2023 TourScope.</div>
        </div>
    )
    }

    export default Footer