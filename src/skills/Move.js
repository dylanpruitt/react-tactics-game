const Move = (() => {
    const targetIsValid = (user, target) => {
        let distance = Math.sqrt(Math.pow(user.x - target.x, 2) + Math.pow(user.y - target.y, 2));
        return distance < user.ap;
    }

    return {
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;
            user.x = target.x;
            user.y = target.y;
            console.log(`${user.name} moves to (${target.x},${target.y}).`);
        },
    };
})();

export default Move;