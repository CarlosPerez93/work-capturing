import { Box, Image, Text } from 'native-base'
import { styles } from './styles'

export const FileCard = () => {
    return (
        <Box style={styles.card}>
            <Box height='160' borderRadius='md'>
                <Image
                    size='100%'
                    alt='fallback text'
                    source={{
                        uri: 'https://i.pinimg.com/736x/31/90/21/31902191bb8d2bad5db452c1cbc7d726.jpg',
                    }}
                />
            </Box>

            <Text fontSize='lg' bold px='4' pb='0'>
                item1
            </Text>
            <Text fontSize='xs' bold px='4' pb='4'>
                dd mm yyyy
            </Text>
        </Box>
    )
}

export default FileCard
