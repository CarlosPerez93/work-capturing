import { Box, Switch, useColorMode } from 'native-base'

export const SelectDarkMode = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const isChecked = colorMode === 'dark'

    return (
        <Box w='1/4' maxH={50} maxW={50}>
            <Switch onToggle={toggleColorMode} isChecked={isChecked} />
        </Box>
    )
}

export default SelectDarkMode
