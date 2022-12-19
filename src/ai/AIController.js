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
                if (factionActors[i].getHP() > 0) {
                    console.log(`Controlling ${factionActors[i].getName()}...`);
                    strategy.use(factionActors[i]);
                } else {
                    console.log(`${factionActors[i].getName()} is dead.`);
                }
            }
        },
    };
};

export default AIController;