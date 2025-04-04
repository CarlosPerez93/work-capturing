import { Flex, useColorMode } from 'native-base'
import { lazy, Suspense } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Loading } from '../components/Loading/Loading'
import { SelectLanguage } from '../components/Language'
import { SelectDarkMode } from '../components/DarkMode'

import { useIntl } from '../hooks/useIntl'

const Home = lazy(() => import('./../screens/Home'))
const About = lazy(() => import('./../screens/About'))

const Tab = createBottomTabNavigator<any>()
export type RootTabParamList = {
    home: { colorMode: string; myProp: string }
    about: { colorMode: string; anotherProp: string }
}
export const PublicNavigationTab = () => {
    const { formatMessage } = useIntl()
    const { colorMode } = useColorMode()
    const themeColor = colorMode === 'dark' ? 'dark' : 'light'

    return (
        <Suspense
            fallback={<Loading message={formatMessage({ id: 'texts.loading' })} />}
        >
            <Tab.Navigator
                initialRouteName={formatMessage({ id: 'texts.main' })}
                screenOptions={{
                    tabBarActiveTintColor: themeColor,
                    tabBarStyle: { position: 'absolute' },
                    headerShown: false,
                }}
            >
                <Tab.Screen
                    name={formatMessage({ id: 'texts.main' })}
                    component={Home}
                    initialParams={{ colorMode }}
                    options={{
                        header: () => (
                            <Flex direction='row' justifyContent={'space-between'}>
                                <SelectLanguage />
                                <SelectDarkMode />
                            </Flex>
                        ),
                        headerShown: true,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name='home'
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name={formatMessage({ id: 'texts.about' })}
                    component={About}
                    initialParams={{ colorMode }}
                    options={{
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons
                                name='information'
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tab.Navigator>
        </Suspense>
    )
}

export default PublicNavigationTab
