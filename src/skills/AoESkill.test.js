import GameManager from "../GameManager";
import AoESkill from "./AoESkill";

const TEST_ACTORS = [
    { name: "Ray", x: 2, y: 2 },
    { name: "Dylan", x: 1, y: 1 },
    { name: "Clara", x: 3, y: 1 },
    { name: "Jon", x: 3, y: 3 },
    { name: "Jack", x: 4, y: 3 },
];

GameManager.addActors(TEST_ACTORS);

test("AoE hits everyone in range", () => {
    const logSpy = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const test = AoESkill("test");
    const raymond = GameManager.getActorAt(2, 2);
    test.use(raymond, { x: 2, y: 2 });

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledTimes(4);
    expect(logSpy).toHaveBeenCalledWith(`Ray was tagged!`);

    const expected = [["Ray was tagged!"], ["Dylan was tagged!"], ["Clara was tagged!"], ["Jon was tagged!"]];
    expect(logSpy.mock.calls).toEqual(expected);
    expect(logSpy.mock.calls).not.toContainEqual([
        "Jack"
    ]);
    logSpy.mockRestore();
});

test("AoE does not fire on target out of range", () => {
    const logSpy = jest.spyOn(global.console, "log"); // taken from https://dev.to/zirkelc/how-to-test-console-log-5fhd
    const test = AoESkill("test");
    const raymond = GameManager.getActorAt(2, 2);
    test.use(raymond, { x: 5, y: 2 });

    expect(logSpy).not.toHaveBeenCalled();
    logSpy.mockRestore();
});