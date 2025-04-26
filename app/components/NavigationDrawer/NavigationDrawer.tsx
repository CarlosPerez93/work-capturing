import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeStackNavigation from '../../navigation/home.navigation'
import AboutStackNavigation from '@/app/navigation/about.navigation'

import useIntl from '@/app/hooks/useIntl'
import { useColorMode } from 'native-base'
import { customTheme } from '@/app/utils/constants/theme.constant'

export const NavigationDrawer = () => {
    const { formatMessage } = useIntl()
    const { Navigator, Screen, Group } = createDrawerNavigator()
    const { colorMode } = useColorMode()
    const {
        colors: { dark, light },
    } = customTheme
    const bg = colorMode === 'dark' ? dark.bg : light.bg
    return (
        <Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: bg,
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                drawerPosition: 'right',
            }}
        >
            <Screen
                options={{
                    title: 'Home',
                }}
                component={HomeStackNavigation}
                name={formatMessage({ id: 'texts.main' })}
            />

            <Group screenOptions={{ drawerType: 'front' }}>
                <Screen
                    options={{
                        title: 'About',
                    }}
                    component={AboutStackNavigation}
                    name={formatMessage({ id: 'texts.about' })}
                />
            </Group>
        </Navigator>
    )
}

export default NavigationDrawer
