import Actor from './Actor';
import Skill from './Skill';
import Attack from './Skill';

const USER = new Actor("test1", 0, 0);

test("use throws error for null user", () => {
    let skill = new Skill("");
    expect(() => skill.use(null, USER)).toThrow(Error("user cannot be null"));
});

test("use throws error for null target", () => {
    let skill = new Skill("");
    expect(() => skill.use(USER, null)).toThrow(Error("target cannot be null"));
});

test("derived skill overrides targetIsValid", () => {
    const VALID_TARGET   = new Actor("test2", 0, 0);
    const INVALID_TARGET = new Actor("test3", 1, 0);
    let   attack         = new Attack();

    expect(attack.targetIsValid(USER, VALID_TARGET)).toBe(true);
    expect(attack.targetIsValid(USER, INVALID_TARGET)).toBe(false);
});

test("derived skill overrides use", () => {
    const logSpy         = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const VALID_TARGET   = new Actor("test2", 0, 0);
    let   attack         = new Attack();

    attack.use(USER, VALID_TARGET);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(`${USER.name} attacks ${VALID_TARGET.name}!`);
    logSpy.mockRestore();
});

test("derived skill does not call on invalid use", () => {
    const logSpy         = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const INVALID_TARGET = new Actor("test2", 1, 0);
    let   attack         = new Attack();

    attack.use(USER, INVALID_TARGET);

    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
});