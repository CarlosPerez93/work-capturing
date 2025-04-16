import useIntl from '../hooks/useIntl'
import { Home, About } from '../screens'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'

import { RootStackParamList } from '../utils/types/types.routes'
import { useNavigation } from '@react-navigation/native'

const { Navigator, Screen } = createStackNavigator<RootStackParamList>()

export function HomeStack({ ...props }) {
    const { bg, txt } = props
    const { formatMessage } = useIntl()
    console.log(txt)
    type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'about'>

    const navigation = useNavigation<HomeScreenNavigationProp>()

    return (
        <Navigator
            initialRouteName={
                formatMessage({ id: 'texts.main' }) as keyof RootStackParamList
            }
        >
            <Screen
                name={
                    formatMessage({ id: 'texts.main' }) as keyof RootStackParamList
                }
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
                name={
                    formatMessage({ id: 'texts.about' }) as keyof RootStackParamList
                }
            />
        </Navigator>
    )
}
