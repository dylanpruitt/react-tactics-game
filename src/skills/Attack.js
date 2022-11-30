const Attack = (() => {
    const targetIsValid = (user, target) => {
        if (user === null) throw new Error("user cannot be null");
        if (target === null) throw new Error("target cannot be null");
        return user.x === target.x;
    };

    return {
        targetIsValid: targetIsValid,
        use: (user, target) => {
            if (!targetIsValid(user, target)) return;

            console.log(`${user.name} attacks ${target.name}!`);
        },
    };
})();

export default Attack;