module.exports = function () {
    return {
        files: [
            'tsconifg.json',
            'src/**/*.ts',
            '!src/**/*spec.ts'
        ],

        tests: [
            'src/**/*spec.ts'
        ],

        env: {
            type: 'node',
            runner: 'node'  // or full path to any node executable
        },

        testFramework: 'jest',
    };
};
