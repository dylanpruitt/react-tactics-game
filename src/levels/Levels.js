import GameManager from "../GameManager";
import Archer from "../actors/Archer";
import Brute from "../actors/Brute";
import Cleric from "../actors/Cleric";
import Commander from "../actors/Commander";
import Horseman from "../actors/Horseman";
import Mortar from "../actors/Mortar";
import Faction from "../actors/Faction";

import Objective from "../Objective";

const DemoOne = (() => {
    return {
        getName: () => "Demo One",
        setup: () => {
            GameManager.addActor(Archer(5, 5));
            GameManager.addActor(Brute(6, 5));

            let actor = Brute(5, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Brute(6, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Archer(7, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);

            GameManager.addObjective(Objective.NoEnemiesRemain);
        }
    }
})();

const DemoTwo = (() => {
    return {
        getName: () => "Demo Two",
        setup: () => {
            GameManager.addActor(Brute(5, 4));
            GameManager.addActor(Cleric(6, 4));
            GameManager.addActor(Brute(6, 5));

            let actor = Brute(5, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Brute(6, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Archer(7, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);

            GameManager.addObjective(Objective.NoEnemiesRemain);
        }
    }
})();

const CommanderDemo = (() => {
    return {
        getName: () => "Commander",
        setup: () => {
            GameManager.addActor(Brute(5, 4));
            GameManager.addActor(Cleric(6, 4));
            GameManager.addActor(Brute(6, 5));

            let actor = Brute(5, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Brute(6, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Commander(7, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);

            GameManager.addObjective(Objective.NoEnemiesRemain);
        }
    }
})();

const KillTargetDemo = (() => {
    return {
        getName: () => "Hitman",
        setup: () => {
            GameManager.addActor(Brute(5, 4));
            let test = Commander(6, 4);
            GameManager.addActor(test);
            GameManager.addActor(Brute(6, 5));

            let actor = Brute(5, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Brute(6, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Commander(7, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);

            GameManager.addObjective(Objective.NoEnemiesRemain);
            GameManager.addObjective(Objective.KillTargetTimed(test, 5));
        }
    }
})();

const DefeatInDetail = (() => {
    return {
        getName: () => "Defeat In Detail",
        setup: () => {
            GameManager.addActor(Archer(3, 2));
            GameManager.addActor(Archer(9, 2));
            GameManager.addActor(Mortar(10, 2));
            GameManager.addActor(Archer(11, 2));
            GameManager.addActor(Archer(1, 3));
            GameManager.addActor(Mortar(2, 3));
            GameManager.addActor(Brute(3, 3));
            GameManager.addActor(Mortar(4, 3));
            GameManager.addActor(Brute(8, 3));
            GameManager.addActor(Brute(9, 3));
            GameManager.addActor(Brute(10, 3));
            GameManager.addActor(Brute(11, 3));
            GameManager.addActor(Brute(12, 3));

            let actor = Horseman(7, 7); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Horseman(8, 7); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Horseman(9, 7); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Brute(2, 7); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Brute(3, 7); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Archer(2, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            actor = Mortar(3, 8); actor.setFaction(Faction.PLAYER); actor.setPlayerControlled(true);
            GameManager.addActor(actor);
            GameManager.addObjective(Objective.NoEnemiesRemain);
        }
    }
})();


const Levels = [DemoOne, DemoTwo, CommanderDemo, KillTargetDemo, DefeatInDetail];
export default Levels;