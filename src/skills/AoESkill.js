import GameManager from '../GameManager';

const AoESkill = (() => {
    const range = 2;

    const targetIsValid = (user, target) => {
        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance <= range;
    }

    return {
        name: "AoE",
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            const ATTACK_RANGE = 2;
            let actors = GameManager.retrieveActors((a) => true);

            actors.forEach((actor) => {
                let dist = Math.sqrt(Math.pow(target.x - actor.getX(), 2) + Math.pow(target.y - actor.getY(), 2));
                if (dist <= ATTACK_RANGE) {
                    console.log(`${actor.getName()} was tagged!`);
                }
            })
        },
    };
})();

export default AoESkill;