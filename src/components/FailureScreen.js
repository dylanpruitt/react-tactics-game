import GameManager from "../GameManager";
import { Link } from "react-router-dom";
import uuid from 'react-uuid';

const FailureScreen = () => {
    const detailMessage = GameManager.getObjectives().filter((obj) => obj.fail()).map((obj) =>
        <p key={uuid()}>{`${obj.getName()} - ${obj.getDescription()} (${obj.getProgressMessage()}).`}</p>
    );

    return (<div>
        <h1 style={{backgroundColor:"red"}}>Level Failed!</h1>
        <p>Objectives failed:</p>
        {detailMessage}
        <Link to="/LevelSelect"> <button >Back to levels</button> </Link>
    </div>);
};

export default FailureScreen;