import Status from "./Status";

const Warcry = () => {
    let status = Status();
    status.setName("Warcry");
    status.setDescription(`Adds a 50% attack bonus for ${status.getTurnCount()} turns.`)
    status.setAttackModifier(1.5);
    return status;
};

export default Warcry;