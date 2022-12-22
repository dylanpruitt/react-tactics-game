import Status from "./Status";

test("update decrements turnCount", () => {
    let test = Status();
    test.update(null);
    expect(test.getTurnCount()).toBe(1);
});