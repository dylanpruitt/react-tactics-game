import Actor from '../Actor';
import Attack from './Attack';

const USER = new Actor("test1", 0, 0);

test("use throws error for null user", () => {
    expect(() => Attack.use(null, USER)).toThrow(Error("user cannot be null"));
});

test("use throws error for null target", () => {
    expect(() => Attack.use(USER, null)).toThrow(Error("target cannot be null"));
});

test("expected targetIsValid behavior", () => {
    const VALID_TARGET   = new Actor("test2", 0, 0);
    const INVALID_TARGET = new Actor("test3", 1, 0);

    expect(Attack.targetIsValid(USER, VALID_TARGET)).toBe(true);
    expect(Attack.targetIsValid(USER, INVALID_TARGET)).toBe(false);
});

test("expected use behavior", () => {
    const logSpy         = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const VALID_TARGET   = new Actor("test2", 0, 0);

    Attack.use(USER, VALID_TARGET);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(`${USER.name} attacks ${VALID_TARGET.name}!`);
    logSpy.mockRestore();
});

test("does not execute use on invalid use case", () => {
    const logSpy         = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const INVALID_TARGET = new Actor("test2", 1, 0);

    Attack.use(USER, INVALID_TARGET);

    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
});