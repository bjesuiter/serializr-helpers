module.exports = function (wallaby) {
    return {
        files: [
            'src/**/*.ts'
        ],

        tests: [
            'tests/**/*spec.ts'
        ],

        compilers: {
            '**/*.ts?(x)': wallaby.compilers.typeScript({
                isolatedModules: true
            })
        },

        testFramework: 'jest',

        env: {
            type: 'node',
            runner: 'node'  // or full path to any node executable
        }
    };
};
