import { Box, Text, useColorMode } from 'native-base'

export const About = () => {
    const { colorMode } = useColorMode()
    const bgColor = colorMode === 'dark' ? 'dark.bg' : 'light.bg'
    return (
        <Box bg={bgColor} h={'full'}>
            <Text>About</Text>
        </Box>
    )
}

export default About
