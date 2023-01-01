import { Link } from "react-router-dom";

const VictoryScreen = () => {
    return (<div>
        <h1 style={{ backgroundColor: "green" }}>Level Complete!</h1>
        <p>All objectives met.</p>
        <Link to="/LevelSelect"> <button >Back to levels</button> </Link>
    </div>);
};

export default VictoryScreen;