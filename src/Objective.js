import Faction from './actors/Faction';
import GameManager from './GameManager';

const NoPlayersRemain = () => {
    return GameManager.retrieveActors((a) => a.getFaction() === Faction.PLAYER).length === 0;
}

const NoEnemiesRemain = () => {
    let name = "Annihilation";
    let description = "No enemies remain."

    return {
        getName: () => name,
        getDescription: () => description,
        complete: () => {
            return GameManager.retrieveActors((a) => a.getFaction() === Faction.ENEMY).length === 0;
        },
        fail: NoPlayersRemain,
    }
}