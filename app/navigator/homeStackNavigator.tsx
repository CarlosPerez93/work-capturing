import useIntl from '../hooks/useIntl'
import { Home, About, ContentFolder } from '../screens'
import { createStackNavigator } from '@react-navigation/stack'

import { RootStackParamList } from '../utils/types/types.routes'

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export function HomeStack({ ...props }) {
    const { bg, txt } = props
    const { formatMessage } = useIntl()

    return (
        <Navigator initialRouteName='home'>
            <Screen
                name='home'
                children={() => <Home bg={bg} txt={txt} />}
                options={{
                    title: formatMessage({ id: 'texts.main' }),
                    headerStyle: { backgroundColor: bg },
                    headerTintColor: txt,
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <Screen
                component={About}
                name='about'
                options={{
                    headerStyle: { backgroundColor: bg },
                    headerTintColor: txt,
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
            <Screen
                component={ContentFolder}
                name='folder'
                options={{
                    headerStyle: { backgroundColor: bg },
                    headerTintColor: txt,
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            />
        </Navigator>
    )
}
