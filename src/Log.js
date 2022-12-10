const Log = (() => {
    let messages = [];

    return {
        log: (msg) => messages.push(msg),
        getMessages: () => messages,
        clear: () => messages = [],
    };
})();

export default Log;