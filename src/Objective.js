import Faction from './actors/Faction';
import GameManager from './GameManager';

const NoPlayersRemain = () => {
    return GameManager.retrieveActors((a) => a.getFaction() === Faction.PLAYER).length === 0;
}

const NoEnemiesRemain = (() => {
    let name = "Annihilation";
    let description = "Kill all enemies";

    return {
        getName: () => name,
        getDescription: () => description,
        complete: () => {
            return GameManager.retrieveActors((a) => a.getFaction() === Faction.ENEMY).length === 0;
        },
        fail: NoPlayersRemain,
        getProgressMessage: () => {
            const numEnemies = GameManager.retrieveActors((a) => a.getFaction() === Faction.ENEMY).length;
            return `${numEnemies} enemies remain`;
        },
        update: () => {}
    }
})();

const KillTarget = (target) => {
    let name = "Kill Target";
    let description = `Kill ${target.getName()}`;

    return {
        getName: () => name,
        getDescription: () => description,
        complete: () => target.getHP() <= 0,
        fail: NoPlayersRemain,
        getProgressMessage: () => {
            return `${target.getName()} has ${target.getHP()}/${target.getMaxHP()} HP`;
        },
        update: () => {}
    }
};

const KillTargetTimed = (target, turns) => {
    let name = "Kill Target (Timed)";
    let description = `Kill ${target.getName()} in ${turns} turns.`;
    let turnCount = turns;

    return {
        getName: () => name,
        getDescription: () => description,
        complete: () => target.getHP() <= 0,
        fail: () => turnCount < 0,
        getProgressMessage: () => {
            return `${target.getName()} has ${target.getHP()}/${target.getMaxHP()} HP - ${turnCount} turns left`;
        },
        update: () => turnCount--
    }
};

let Objective = { NoEnemiesRemain, KillTarget, KillTargetTimed };

export default Objective;