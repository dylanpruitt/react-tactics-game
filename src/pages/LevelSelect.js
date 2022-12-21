import { Link } from "react-router-dom";
import uuid from 'react-uuid';

import GameManager from '../GameManager';
import Levels from '../levels/Levels';
import './LevelSelect.css';

const LevelSelect = (props) => {
    console.log(Levels);
    const levels = Levels.map((level) => {
        return <Link to="/Game" onClick={() => GameManager.setupLevel(level)} key={uuid()} >
            <button>
                {level.getName()}
            </button>
        </Link>
    });

    return (
        <div>
            <h1>Level Select</h1>
            <div className="grid-container">
                {levels}
            </div>

            <Link to="/">
                <button >Home screen</button>
            </Link>
        </div>
    );
};

export default LevelSelect;