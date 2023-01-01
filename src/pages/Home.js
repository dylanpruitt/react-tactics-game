import { Link } from "react-router-dom";

import './Home.css';

const Home = () => {

    return (
        <div>
            <h1>React Tactics</h1>
            <p>Tactics game created for web browsers.</p>
            <Link to="/LevelSelect" className="link">
                <button>
                    Level Select
                </button>
            </Link>
            <section className="bottom-container">
                <p>by Dylan Pruitt</p>
                <a href="https://github.com/dylanpruitt/react-tactics-game" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/dylan-pruitt-595304228/" target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                </a>
            </section>
        </div>
    );
}

export default Home;