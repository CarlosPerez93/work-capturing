import { useFonts } from 'expo-font'
import { I18nextProvider } from 'react-i18next'
import { NativeBaseProvider, StatusBar, useColorMode } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import i18n from './i18n/config'
import { customTheme } from './utils/constants/theme.constant'
import { Exo, Poppins } from './utils/constants/fonts.constant'
import { colorModeManager } from './utils/constants/functions/colorMode.utils'
import NavigationDrawer from './components/NavigationDrawer'

export default function App() {
    const [loaded] = useFonts({ Exo, Poppins })
    const { colorMode } = useColorMode()

    const bg =
        colorMode === 'light'
            ? customTheme.colors.dark.bg
            : customTheme.colors.light.bg

    const txt =
        colorMode === 'light'
            ? customTheme.colors.dark.bg
            : customTheme.colors.light.bg
    return loaded ? (
        <I18nextProvider i18n={i18n}>
            <SafeAreaProvider>
                <NativeBaseProvider
                    theme={customTheme}
                    colorModeManager={colorModeManager}
                >
                    <NavigationDrawer />
                    <StatusBar backgroundColor={bg} />
                </NativeBaseProvider>
            </SafeAreaProvider>
        </I18nextProvider>
    ) : null
}
