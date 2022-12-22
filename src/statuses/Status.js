const Status = () => {
    let turnCount = 2;

    let attackModifier = 1.0;
    let defenseModifier = 1.0;

    let name = "Status";
    let description = "status affecting an actor";

    return {
        getName: () => name,
        setName: (nname) => name = nname,
        getDescription: () => description,
        setDescription: (desc) => description = desc,
        getAttackModifier: () => attackModifier,
        setAttackModifier: (mod) => attackModifier = mod,
        getDefenseModifier: () => defenseModifier,
        setDefenseModifier: (mod) => defenseModifier = mod,
        getTurnCount: () => turnCount,
        update: (actor) => {
            turnCount--;
        }
    }
};

export default Status;