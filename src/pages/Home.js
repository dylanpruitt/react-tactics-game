import { Link } from "react-router-dom";

import './Home.css';
import HintModal from "../components/HintModal";

const Home = () => {
    let test = (
        <article>
            <h2>Strategy</h2>
            <p>Attack units from all sides!</p>
        </article>
    );
    return (
        <div>
            <h1>React Tactics</h1>
            <p>This page does exist!</p>
            <Link to="/LevelSelect" className="link"> Level Select </Link>
            <section className="bottom-container">
                <p>by Dylan Pruitt</p>
            </section>
            <HintModal title="Test" description={test}></HintModal>
        </div>
    );
}

export default Home;