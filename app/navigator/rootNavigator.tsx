import useIntl from '../hooks/useIntl'
import { Home, About } from '../screens'
import { createStackNavigator } from '@react-navigation/stack'

import { HeaderRootStack } from '../components/HeaderRootStack/HeaderRootStack'

import { RootStackParamList } from '../utils/types/types.routes'

const Stack = createStackNavigator<RootStackParamList>()

export function RootStack({ ...props }) {
    const { bg, txt } = props
    const { formatMessage } = useIntl()

    const config = {
        headerStyle: { backgroundColor: bg, bg: txt },
        header: () => <HeaderRootStack bg={bg} />,
    }

    return (
        <Stack.Navigator
            screenOptions={config}
            initialRouteName={
                formatMessage({ id: 'texts.main' }) as keyof RootStackParamList
            }
        >
            <Stack.Screen
                name={
                    formatMessage({ id: 'texts.main' }) as keyof RootStackParamList
                }
                children={() => <Home bg={bg} txt={txt} />}
                options={{ title: formatMessage({ id: 'texts.main' }) }}
            />
            <Stack.Screen
                component={About}
                name={
                    formatMessage({ id: 'texts.about' }) as keyof RootStackParamList
                }
            />
        </Stack.Navigator>
    )
}
