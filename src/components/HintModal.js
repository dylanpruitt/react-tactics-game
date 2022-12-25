import React, { useState } from 'react';
import './HintModal.css';

const HintModal = (props) => {
    let [open, setOpen] = useState(true);
    return (open && <section id="ModalContent">
        <div id="TitleContainer">
            <h1 id="ModalTitle">{props.title}</h1>
            <button id="XClose" onClick={() => setOpen(!open)}>X</button>
        </div>
        {props.description}
        <button id="centerButton" onClick={() => setOpen(!open)}>Close</button>
    </section>
    );
}

export default HintModal;