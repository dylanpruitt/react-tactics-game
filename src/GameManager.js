import { Actor } from './Actor.js';

const GameManager = (() => {
    let actors = [];

    const addActor = (actor) => {
        if (actor === null || actor === undefined) throw new Error("actor cannot be null or undefined");
        if (getActorAt(actor.x, actor.y) !== null) throw new Error("another actor is already at this x, y");
        actors.push(actor);
    }

    const getActorAt = (x, y) => {
        let actorAtPosition = null;
        actors.forEach((actor) => {
            if (actor.x === x && actor.y === y) actorAtPosition = actor;
        });

        return actorAtPosition;
    }

    const removeActors = (predicate) => {
        let remainingActors = [];
        actors.forEach((actor) => {
            if (!predicate(actor))
                remainingActors.push(actor);
        });

        actors = remainingActors;
    }

    return {
        retrieveActors: (predicate) => {
            try {
                return actors.filter((actor) => predicate(actor));
            } catch (error) {
                console.log(`${error.name} : ${error.message}`);
                return [];
            }
        },
        getActorAt: getActorAt,
        addActor: addActor,
        addActors: (newActors) => {
            if (newActors === null || newActors === undefined) throw new Error("newActors cannot be null or undefined");
            newActors.forEach((actor) => {
                addActor(actor);
            });
        },
        removeActors: removeActors,
    };
})();

export default GameManager;