import Log from './Log';

test("log() adds a new message", () => {
    Log.clear();
    Log.log("Test message");

    expect(Log.getMessages().length).toBe(1);
    expect(Log.getMessages()[0]).toEqual("Test message");
    Log.clear();
});

test("clear() removes all messages", () => {
    Log.log("Test");
    Log.log("Test 2");
    Log.clear();

    expect(Log.getMessages().length).toBe(0);
});