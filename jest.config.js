module.exports = {
    preset: 'jest-expo',
    verbose: true,
    // preset: "react-native",
    setupFilesAfterEnv: ["@testing-library/jest-native/extend-expect"],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transformIgnorePatterns: [
        "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.|@expo-google-fonts/.|react-navigation|@react-navigation/.|@unimodules/.|unimodules|sentry-expo|native-base|react-native-svg)",
    ],
    transform: {
        '\\.[jt]sx?$': 'babel-jest',
    },
    // collectCoverage: true,
    // collectCoverageFrom: [
    //   "*/__tests__/*",
    //   "!*/coverage/*",
    //   "!*/node_modules/*",
    //   "!**/babel.config.js",
    //   "!**/jest.config.js"
    // ]
};