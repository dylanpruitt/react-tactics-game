import ActorType from "../actors/ActorType";
import GameManager from "../GameManager";
import AttackNearest from "./strategy/AttackNearest";
import HealNearest from "./strategy/HealNearest";

const AIController = (faction) => {
    if (faction === undefined) throw new Error("invalid faction");
    const aiFaction = faction;
    let tactics = null;

    const getFactionActors = () => {
        return GameManager.retrieveAllActors().filter(a => a.getFaction() === aiFaction);
    }

    const assignTactics = () => {
        const actors = getFactionActors();
        tactics = actors.map((a) => {
            let type = a.getType();
            let strategy = null;

            if (type === ActorType.HEALER) {
                console.log(`Assigning ${a.getName()} to strategy 'Heal Nearest'.`);
                strategy = HealNearest;
            } else {
                console.log(`Assigning ${a.getName()} to strategy 'Attack Nearest'.`);
                strategy = AttackNearest;
            }

            return { actor: a, strategy: strategy };
        });
    }

    return {
        getFactionActors: getFactionActors,
        act: () => {
            if (tactics === null) assignTactics();

            for (let i = 0; i < tactics.length; i++) {
                let actor = tactics[i].actor;
                if (actor.getHP() > 0) {
                    console.log(`Controlling ${actor.getName()}...`);
                    tactics[i].strategy.use(actor);
                } else {
                    console.log(`${actor.getName()} is dead.`);
                }
            }
        },
        reset: () => tactics = null
    };
};

export default AIController;