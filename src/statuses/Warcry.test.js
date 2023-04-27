import Warcry from "./Warcry";

test("attack modifier updates correctly", () => {
    let status = Warcry();
    expect(status.getAttackModifier()).toBe(1.5);
});