// metro.config.js
const {
    wrapWithReanimatedMetroConfig,
} = require('react-native-reanimated/metro-config')

const config = {
    resolver: {
        unstable_enablePackageExports: true,
    },
}
module.exports = wrapWithReanimatedMetroConfig(config)
