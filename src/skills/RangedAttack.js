import GameManager from '../GameManager';

const RangedAttack = (() => {
    const RANGE = 3;

    const targetIsValid = (user, target) => {
        if (user === null) throw new Error("user cannot be null");
        if (target === null) throw new Error("target cannot be null");

        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance <= RANGE && GameManager.getActorAt(target.x, target.y) !== null;
    };

    return {
        name: "Attack",
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            let actor = GameManager.getActorAt(target.x, target.y);
            console.log(`${user.getName()} attacks ${actor.getName()}!`);

            let damage = user.getAttack() - actor.getDefense();
            actor.setHP(actor.getHP() - damage);
        },
    };
})();

export default RangedAttack;