import { Feather } from '@expo/vector-icons'
import { Box, Icon, useColorMode } from 'native-base'
import { styles } from './styles'

export const SelectDarkMode = ({ ...props }) => {
    const { colorMode, toggleColorMode } = useColorMode()

    const { bg } = props
    const nameIcon = colorMode === 'dark' ? 'sun' : 'moon'

    const renderIconTheme = () => (
        <Box bg={bg}>
            <Icon
                as={Feather}
                name={nameIcon}
                style={styles.icon}
                onPress={toggleColorMode}
            />
        </Box>
    )

    return renderIconTheme()
}

export default SelectDarkMode
