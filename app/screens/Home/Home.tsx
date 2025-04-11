import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Box, Button, Text, useColorMode } from 'native-base'

import useIntl from '@/app/hooks/useIntl'
import { RootStackParamList } from '@/app/utils/types/types.routes'

export const Home = ({ ...props }) => {
    const { bg } = props
    const { formatMessage } = useIntl()
    const { colorMode } = useColorMode()

    type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'about'>
    const navigation = useNavigation<HomeScreenNavigationProp>()
    return (
        <Box bg={bg} h={'full'}>
            <Text color={colorMode === 'dark' ? 'dark.text' : 'light.text'}>
                {formatMessage({ id: 'texts.main' })}
            </Text>
            <Button
                onPress={() =>
                    navigation.navigate(
                        formatMessage({
                            id: 'texts.about',
                        }) as keyof RootStackParamList
                    )
                }
            >
                <Text color={colorMode === 'dark' ? 'dark.text' : 'light.text'}>
                    {formatMessage({ id: 'texts.about' })}
                </Text>
            </Button>
        </Box>
    )
}

export default Home
