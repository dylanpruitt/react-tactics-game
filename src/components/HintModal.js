import React, { useState } from 'react';
import './HintModal.css';

const HintModal = (props) => {
    let [open, setOpen] = useState(true);

    const close = () => {
        setOpen(!open);
        props.setHint(null);
    }
    return (open && <section id="ModalContent">
        <div id="TitleContainer">
            <h1 id="ModalTitle">{props.title}</h1>
            <button id="XClose" onClick={close}>X</button>
        </div>
        {props.description}
        <button id="centerButton" onClick={close}>Close</button>
    </section>
    );
}

export default HintModal;