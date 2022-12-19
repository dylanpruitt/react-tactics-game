import GameManager from '../GameManager';
import SkillType from './SkillType';
import Log from '../Log';

const AoESkill = (() => {
    const AP_COST = 2;
    const range = 4;

    const targetIsValid = (user, target) => {
        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance <= range && user.getAP() >= AP_COST;
    }

    return {
        name: "Volley",
        type: SkillType.ATTACK,
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;
            const ATTACK_RANGE = 2;

            user.setAP(user.getAP() - AP_COST);

            let actors = GameManager.retrieveActors((a) => true);

            Log.log(`${user.getName()} launches a volley!`);

            actors.forEach((actor) => {
                let dist = Math.sqrt(Math.pow(target.x - actor.getX(), 2) + Math.pow(target.y - actor.getY(), 2));
                if (dist <= ATTACK_RANGE) {
                    actor.setHP(actor.getHP() - user.getAttack());
                    Log.log(`${actor.getName()} took ${user.getAttack()} damage!`);

                    let targetAttack = actor.getSkillType(SkillType.ATTACK);

                    if (targetAttack !== null && targetAttack.targetIsValid(actor, { x: user.getX(), y: user.getY() })) {
                        user.setHP(user.getHP() - actor.getDefense());
                        if (actor.getDefense() > 0) Log.log(`${user.getName()} took ${actor.getDefense()} damage!`);
                    }
                }
            })
        },
        getAPCost: () => AP_COST,
    };
})();

export default AoESkill;