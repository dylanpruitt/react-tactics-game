import GameManager from "../GameManager";

const Move = (() => {
    const targetIsValid = (user, target) => {
        let distance = Math.sqrt(Math.pow(user.getX() - target.x, 2) + Math.pow(user.getY() - target.y, 2));
        return distance < user.getAP() && GameManager.getActorAt(target.x, target.y) === null;
    }

    return {
        name: "Move",
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;
            user.setPosition(target.x, target.y);
            console.log(`${user.getName()} moves to (${target.x},${target.y}).`);
        },
    };
})();

export default Move;