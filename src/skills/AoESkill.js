import GameManager from '../GameManager';

const AoESkill = (skillName) => {
    const name = skillName;
    const range = 2;

    const targetIsValid = (user, target) => {
        let distance = Math.sqrt(Math.pow(user.x - target.x, 2) + Math.pow(user.y - target.y, 2));
        return distance <= range;
    }

    return {
        targetIsValid: (user, target) => {
            let distance = Math.sqrt(Math.pow(user.x - target.x, 2) + Math.pow(user.y - target.y, 2));
            return distance <= range;
        },
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            const ATTACK_RANGE = 2;
            let actors = GameManager.retrieveActors((a) => true);

            actors.forEach((actor) => {
                let dist = Math.sqrt(Math.pow(target.x - actor.x, 2) + Math.pow(target.y - actor.y, 2));
                if (dist <= ATTACK_RANGE) {
                    console.log(`${actor.name} was tagged!`);
                }
            })
        },
    };
}

export default AoESkill;