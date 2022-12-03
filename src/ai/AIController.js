import GameManager from "../GameManager";
import AttackNearest from "./strategy/AttackNearest";

const AIController = (faction) => {
    if (faction === undefined) throw new Error("invalid faction");
    const aiFaction = faction;
    const strategy = AttackNearest;

    const getFactionActors = () => {
        return GameManager.retrieveAllActors().filter(a => a.getFaction() === aiFaction);
    }

    return {
        getFactionActors: getFactionActors,
        act: () => {
            let factionActors = getFactionActors();
            for (let i = 0; i < factionActors.length; i++) {
                console.log(`Controlling ${factionActors[i].getName()}...`);
                strategy.use(factionActors[i]);
            }
        },
    };
};

export default AIController;