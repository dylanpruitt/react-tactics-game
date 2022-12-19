import GameManager from "../GameManager";
import Archer from "../actors/Archer";
import Brute from "../actors/Brute";
import Faction from "../actors/Faction";

import NoEnemiesRemain from "../Objective";

const DemoOne = () => {
    GameManager.addActor(Archer(5,5));
    GameManager.addActor(Brute(6,5));

    let actor = Brute(5,8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true); 
        GameManager.addActor(actor);
    actor     = Brute(6,8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true); 
        GameManager.addActor(actor);
    actor     = Archer(7,8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true); 
        GameManager.addActor(actor);

    GameManager.addObjective(NoEnemiesRemain);
}

export { DemoOne };