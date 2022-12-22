import Actor from '../actors/Actor';
import Faction from '../actors/Faction';
import GameManager from '../GameManager';
import Attack from './Attack';

const USER = Actor("test1", 0, 0);

test("use throws error for null user", () => {
    expect(() => Attack.use(null, USER)).toThrow(Error("user cannot be null"));
});

test("use throws error for null target", () => {
    expect(() => Attack.use(USER, null)).toThrow(Error("target cannot be null"));
});

test("expected targetIsValid behavior", () => {
    GameManager.addActor(Actor("test2", 1, 0));
    const VALID_TARGET = { x: 1, y: 0 };
    const INVALID_TARGET = { x: 2, y: 0 };

    expect(Attack.targetIsValid(USER, VALID_TARGET)).toBe(true);
    expect(Attack.targetIsValid(USER, INVALID_TARGET)).toBe(false);

    GameManager.removeActors((actor) => true);
});

test("expected use behavior", () => {
    let test = Actor("test2", 1, 0); test.setFaction(Faction.ENEMY);
    GameManager.addActor(test);
    const VALID_TARGET = { x: 1, y: 0 };
    Attack.use(USER, VALID_TARGET);

    GameManager.removeActors((actor) => true);
});

test("does not execute use on invalid use case", () => {
    const logSpy = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const INVALID_TARGET = { x: 3, y: 3 };

    Attack.use(USER, INVALID_TARGET);

    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
});