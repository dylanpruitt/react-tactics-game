import Log from "../Log";
import uuid from 'react-uuid';

const LogDisplay = () => {
    let messages = Log.getMessages().map((msg) => {
        return (<section key={uuid()}>
            <p>{`${msg}`}</p>
        </section>);
    });
    return (
        <div>
            <h1>Log</h1>
            {messages}
        </div>
    );
};

export default LogDisplay;