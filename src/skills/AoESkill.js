import GameManager from '../GameManager';
import SkillType from './SkillType';

const AoESkill = (() => {
    const AP_COST = 2;
    const range = 2;

    const targetIsValid = (user, target) => {
        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance <= range && user.getAP() >= AP_COST;
    }

    return {
        name: "AoE",
        type: SkillType.ATTACK,
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            user.setAP(user.getAP() - AP_COST);

            const ATTACK_RANGE = 2;
            let actors = GameManager.retrieveActors((a) => true);

            actors.forEach((actor) => {
                let dist = Math.sqrt(Math.pow(target.x - actor.getX(), 2) + Math.pow(target.y - actor.getY(), 2));
                if (dist <= ATTACK_RANGE) {
                    console.log(`${actor.getName()} was tagged!`);
                }
            })
        },
        getAPCost: () => AP_COST,
    };
})();

export default AoESkill;