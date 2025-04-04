import { Feather } from '@expo/vector-icons'
import { Box, Icon, useColorMode } from 'native-base'
import { styles } from './styles'

export const SelectDarkMode = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const renderIconTheme = () => (
        <Box style={styles.box}>
            <Icon
                as={Feather}
                name={colorMode === 'dark' ? 'sun' : 'moon'}
                style={styles.icon}
                onPress={toggleColorMode}
            />
        </Box>
    )

    return renderIconTheme()
}

export default SelectDarkMode
