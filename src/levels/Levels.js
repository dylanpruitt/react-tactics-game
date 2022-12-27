import GameManager from "../GameManager";
import Archer from "../actors/Archer";
import Brute from "../actors/Brute";
import Cleric from "../actors/Cleric";
import Commander from "../actors/Commander";
import Horseman from "../actors/Horseman";
import Mortar from "../actors/Mortar";

import Objective from "../Objective";

const DemoOne = (() => {
    return {
        getName: () => "Demo One",
        setup: () => {
            GameManager.addActor(Archer(5, 5));
            GameManager.addActor(Brute(6, 5));

            GameManager.addPlayerActor(Brute(5, 8));
            GameManager.addPlayerActor(Brute(6, 8));
            GameManager.addPlayerActor(Archer(7, 8));

            GameManager.addObjective(Objective.NoEnemiesRemain);

            const description = (
                <p>Welcome to the game!</p>
            );
            let hint = {
                title: "Demo One",
                description: description,
            };

            GameManager.setHint(hint);
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

            GameManager.addPlayerActor(Brute(5, 8));
            GameManager.addPlayerActor(Brute(6, 8));
            GameManager.addPlayerActor(Archer(7, 8));

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

            GameManager.addPlayerActor(Brute(5, 8));
            GameManager.addPlayerActor(Commander(6, 8));
            GameManager.addPlayerActor(Brute(7, 8));

            GameManager.addObjective(Objective.NoEnemiesRemain);
        }
    }
})();

const KillTargetDemo = (() => {
    return {
        getName: () => "Hitman",
        setup: () => {
            GameManager.addActor(Brute(5, 4));

            let commander = Commander(6, 4);
            GameManager.addActor(commander);
            GameManager.addActor(Brute(6, 5));

            GameManager.addPlayerActor(Brute(5, 8));
            GameManager.addPlayerActor(Commander(6, 8));
            GameManager.addPlayerActor(Brute(7, 8));

            GameManager.addObjective(Objective.NoEnemiesRemain);
            GameManager.addObjective(Objective.KillTargetTimed(commander, 5));
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

            GameManager.addPlayerActor(Horseman(7, 7));
            GameManager.addPlayerActor(Horseman(8, 7));
            GameManager.addPlayerActor(Horseman(9, 7));
            GameManager.addPlayerActor(Brute(2, 7));
            GameManager.addPlayerActor(Brute(3, 7));
            GameManager.addPlayerActor(Archer(2, 8));
            GameManager.addPlayerActor(Mortar(3, 8));
            
            GameManager.addObjective(Objective.NoEnemiesRemain);
        }
    }
})();

const MeleeOnly = (() => {
    return {
        getName: () => "Melee Only",
        setup: () => {
            GameManager.addActor(Mortar(3, 2));
            GameManager.addActor(Archer(8, 2));
            GameManager.addActor(Archer(9, 3));
            GameManager.addActor(Archer(4, 4));
            GameManager.addActor(Archer(13, 4));
            GameManager.addActor(Archer(1, 6));
            GameManager.addActor(Archer(11, 6));

            GameManager.addPlayerActor(Brute(3, 9));
            GameManager.addPlayerActor(Brute(5, 10));
            GameManager.addPlayerActor(Brute(6, 10));
            GameManager.addPlayerActor(Brute(7, 10));
            GameManager.addPlayerActor(Brute(8, 10));
            GameManager.addPlayerActor(Horseman(1, 11));
            GameManager.addPlayerActor(Horseman(2, 11));
            GameManager.addPlayerActor(Commander(7, 11));
            GameManager.addPlayerActor(Horseman(9, 12));
            GameManager.addPlayerActor(Horseman(10, 12));

            GameManager.addObjective(Objective.NoEnemiesRemain);

            const description = (
                <article>
                    <p>You find enemy ranged units nearby.</p>
                    <p>For this level, you've only got melee units.</p>
                </article>
            );
            let hint = {
                title: "Melee Only",
                description: description,
            };

            GameManager.setHint(hint);
        }
    }
})();


const Levels = [DemoOne, DemoTwo, CommanderDemo, KillTargetDemo, DefeatInDetail, MeleeOnly];
export default Levels;