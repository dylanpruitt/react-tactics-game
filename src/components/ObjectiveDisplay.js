import GameManager from "../GameManager";
import uuid from 'react-uuid';

const ObjectiveDisplay = () => {
    let objectives = GameManager.getObjectives().map((objective) => {
        const message = (<section key={uuid()}>
            <p>{`${objective.getName()} - ${objective.getDescription()} (${objective.getProgressMessage()}).`}</p>
        </section>);

        if (objective.complete()) {
            return <del key={uuid()}>{message}</del>;
        } else {
            return message;
        }

    });
    return (
        <div id="objective-display">
            <h1>Objectives</h1>
            {objectives}
        </div>
    );
};

export default ObjectiveDisplay;