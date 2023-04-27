import Move from './Move';
import Actor from '../actors/Actor';
import GameManager from '../GameManager';

test("actor cannot move further than ap allows", () => {
    let test = Actor("test", 1, 1);
    GameManager.addActor(test);
    Move.use(test, { x: 5, y: 5 });
    expect(test.getX()).toBe(1);
    expect(test.getY()).toBe(1);

    GameManager.removeActors((actor) => true);
});

test("actor moves on use call", () => {
    let test = Actor("test", 1, 1);
    GameManager.addActor(test);
    Move.use(test, { x: 2, y: 1 });
    expect(test.getX()).toBe(2);
    expect(test.getY()).toBe(1);

    GameManager.removeActors((actor) => true);
});

test("actor cannot move on tile with other actor", () => {
    let test = Actor("test", 1, 1);
    GameManager.addActor(test);
    GameManager.addActor(Actor("test", 2, 1));
    Move.use(test, { x: 2, y: 1 });
    expect(test.getX()).toBe(1);
    expect(test.getY()).toBe(1);

    GameManager.removeActors((actor) => true);
});