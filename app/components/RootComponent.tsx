import { Box } from 'native-base'

import { RootStack } from '../navigator/rootNavigator'

import { styles } from './styles'

export const Root = () => {
    return (
        <Box
            flex={1}
            w='100%'
            _light={styles._light}
            _dark={styles._dark}
            _web={styles._web}
        >
            <RootStack />
        </Box>
    )
}
