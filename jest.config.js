module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        // matches all .ts or .tsx files with min 1 char as filename
        "^.+\\.tsx?$": "ts-jest"
    },
    // testEnvironment: 'node' | 'jsdom' (default) |
    // can be overwritten by '@jest-environment jsdom' at a comment at the top of the file
    testEnvironment: 'node'
};
