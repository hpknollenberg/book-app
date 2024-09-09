
const Tabs = ({activeTab}) => {
    
    return (
        <div style={{backgroundColor: "grey"}}>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "search" ? "active" : "")}`} aria-current="page" href="/" style={{color: `${(activeTab === "search") ? "black" : "white"}`}}>Search</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${(activeTab === "bookshelf" ? "active" : "")}`} href="/bookshelf" style={{color: `${(activeTab === "bookshelf") ? "black" : "white"}` }}>Bookshelf</a>
                </li>
                
            </ul>
        </div>
    )
}

export default Tabs