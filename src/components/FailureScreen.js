import GameManager from "../GameManager";
import uuid from 'react-uuid';

const FailureScreen = () => {
    const detailMessage = GameManager.getObjectives().filter((obj) => obj.fail()).map((obj) =>
        <p key={uuid()}>{`${obj.getName()} - ${obj.getDescription()} (${obj.getProgressMessage()}).`}</p>
    );

    return (<div style={{backgroundColor:"red"}}>
        <h1>Level Failed!</h1>
        <p>Objectives failed:</p>
        {detailMessage}
    </div>);
};

export default FailureScreen;