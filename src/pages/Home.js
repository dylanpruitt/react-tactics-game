import { Link } from "react-router-dom";

import './Home.css';

const Home = () => {
    
    return (
        <div>
            <h1>React Tactics</h1>
            <p>This page does exist!</p>
            <Link to="/LevelSelect" className="link"> Level Select </Link>
            <section className="bottom-container">
                <p>by Dylan Pruitt</p>
            </section>
        </div>
    );
}

export default Home;