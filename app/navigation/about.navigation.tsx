import { Suspense } from 'react'
import { StatusBar, useColorMode } from 'native-base'

import { HomeStack } from '../navigator/homeStackNavigator'
import { Loading } from '../components/Loading/Loading'

import { useIntl } from '../hooks/useIntl'
import { customTheme } from '../utils/constants/theme.constant'
import { AboutStack } from '../navigator/aboutStackNavigator'

export const AboutStackNavigation = () => {
    const { formatMessage } = useIntl()
    const { colorMode } = useColorMode()
    const {
        colors: { dark, light },
    } = customTheme

    const bg = colorMode === 'dark' ? dark.bg : light.bg
    const txt = colorMode === 'light' ? 'dark-content' : 'light-content'
    return (
        <Suspense
            fallback={<Loading message={formatMessage({ id: 'texts.loading' })} />}
        >
            <AboutStack bg={bg} txt={txt} />
        </Suspense>
    )
}

export default AboutStackNavigation
