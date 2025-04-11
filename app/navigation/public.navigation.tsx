import { Suspense } from 'react'
import { StatusBar, useColorMode } from 'native-base'

import { RootStack } from '../navigator/rootNavigator'
import { Loading } from '../components/Loading/Loading'

import { useIntl } from '../hooks/useIntl'
import { customTheme } from '../utils/constants/theme.constant'

export const PublicNavigationTab = () => {
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
            <RootStack bg={bg} txt={txt} />
            <StatusBar backgroundColor={bg} barStyle={txt} />
        </Suspense>
    )
}

export default PublicNavigationTab
