import { useFonts } from 'expo-font'
import { I18nextProvider } from 'react-i18next'
import { NativeBaseProvider, StatusBar, useColorMode } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import HomeStackNavigation from './navigation/home.navigation'

import i18n from './i18n/config'
import { customTheme } from './utils/constants/theme.constant'
import { Exo, Poppins } from './utils/constants/fonts.constant'
import { colorModeManager, colorModeManagerBlack } from './utils/constants/functions/colorMode.utils'

export default function App() {
    const { colorMode } = useColorMode()
    const [loaded] = useFonts({ Exo, Poppins })
    const {
        colors: { dark, light },
    } = customTheme

    /*  const bg =
         colorMode === 'dark'
             ? customTheme.colors.dark.bg
             : customTheme.colors.light.bg */
    const bg = customTheme.colors.dark.bg

    const txt = colorMode === 'light' ? dark.darkContent : light.lightContent

    return loaded ? (
        <I18nextProvider i18n={i18n}>
            <SafeAreaProvider>
                <NativeBaseProvider
                    theme={customTheme}
                    colorModeManager={colorModeManagerBlack}//colorModeManager change two colors
                >
                    <StatusBar backgroundColor={bg} barStyle={txt} />
                    <HomeStackNavigation />
                </NativeBaseProvider>
            </SafeAreaProvider>
        </I18nextProvider>
    ) : null
}
