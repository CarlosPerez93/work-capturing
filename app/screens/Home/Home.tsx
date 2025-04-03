import { Box, Text, useColorMode } from 'native-base'

export const Home = () => {
    const { colorMode } = useColorMode()
    return (
        <Box bg={colorMode === 'dark' ? 'dark.bg' : 'light.bg'} h={'full'}>
            <Text color={colorMode === 'dark' ? 'dark.text' : 'light.text'}>
                Home
            </Text>
        </Box>
    )
}

export default Home
