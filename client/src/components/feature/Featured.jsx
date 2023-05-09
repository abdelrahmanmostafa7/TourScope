import "./feature.scss"
import { useNavigate } from 'react-router-dom';


const Featured = () => {
    const navigate = useNavigate()
    const navigateToDestination = (destination) => {
        navigate(`/hotels`, { state: { destination } })
        window.scrollTo(0, 0);;
    }
    return (
        <div className="featured">
            <div className="featuredWrapper">
                <div className="featuredItem" onClick={() => navigateToDestination("Paris")}>
                    <img
                        src="https://images.unsplash.com/photo-1500313830540-7b6650a74fd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBhcmlzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1 name="Paris">Paris</h1>
                    </div>
                </div>
            </div>

            <div className="featuredWrapper">
                <div className="featuredItem" onClick={() => navigateToDestination("Berlin")}>
                    <img
                        src="https://images.unsplash.com/photo-1560969184-10fe8719e047?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YmVybGlufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1 name="Berlin">Berlin</h1>
                    </div>
                </div>
            </div>

            <div className="featuredWrapper">
                <div className="featuredItem" onClick={() => navigateToDestination("Luxor")}>
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

            <div className="featuredWrapper">
                <div className="featuredItem" onClick={() => navigateToDestination("Madrid")}>
                    <img
                        src="https://images.unsplash.com/photo-1578305698944-874fa44d04c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bWFkcmlkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1 name="Madrid">Madrid</h1>
                    </div>
                </div>
            </div>

            <div className="featuredWrapper">
                <div className="featuredItem" onClick={() => navigateToDestination("London")}>
                    <img
                        src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1 name="London">London</h1>
                    </div>
                </div>
            </div>

            <div className="featuredWrapper">
                <div className="featuredItem" onClick={() => navigateToDestination("Milan")}>
                    <img
                        src="https://images.unsplash.com/photo-1516296270211-f3ae5494e65d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1075&q=80"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1 name="Milan">Milan</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured