import "./feature.scss"
import { useNavigate } from 'react-router-dom';


const Featured = () => {
    const navigate = useNavigate()
    const viewParis = () => {
        navigate(`/hotels`, { state: { destination: "paris" } })
        window.location.reload();
    }
    const viewBerlin = () => {
        navigate(`/hotels`, { state: { destination: "Berlin" } })
        window.location.reload();
    }
    const viewLuxor = () => {
        navigate(`/hotels`, { state: { destination: "luxor" } })
        window.location.reload();
    }
    return (
        <div className="featured">
            <div className="featuredItem" onClick={() => viewParis()}>
                <img
                    src="https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1 name="Paris">Paris</h1>
                </div>
            </div>

            <div className="featuredItem" onClick={() => viewBerlin()}>
                <img
                    src="https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVybGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1 name="Berlin">Berlin</h1>
                </div>
            </div>

            <div className="featuredItem" onClick={() => viewLuxor()}>
                <img
                    src="https://images.unsplash.com/photo-1629468855534-450d7c4c5f72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDl8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1 name="Luxor">Luxor</h1>
                </div>
            </div>
        </div>
    )
}

export default Featured