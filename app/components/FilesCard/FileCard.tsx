import { Box, Image, Text } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { styles } from './styles'
type FileCardProps = {
    name: string | null | undefined;
    dateFile: string
}

export const FileCard = ({ name, dateFile }: FileCardProps) => {
    console.log(name, dateFile)
    function getIconNameForFile(fileName: string): keyof typeof MaterialIcons.glyphMap {
        const ext = fileName.split('.').pop()?.toLowerCase();

        if (ext === 'pdf') {
            return 'picture-as-pdf'; // Asegúrate de que 'picture-as-pdf' esté en el glyphMap
        } else if (ext === 'doc' || ext === 'docx') {
            return 'description';
        } else if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') {
            return 'image';
        } else {
            return 'insert-drive-file';
        }
    }

    return (
        <Box style={styles.card}>
            <Box height='160' borderRadius='md'>
                <MaterialIcons
                    name={getIconNameForFile(name ?? "prueba.jpg")}
                    size={100}
                    color="white"
                />

            </Box>

            <Text fontSize='lg' bold px='4' pb='0'>
                {name}
            </Text>
            <Text fontSize='xs' bold px='4' pb='4'>
                {dateFile}
            </Text>
        </Box>
    )
}

export default FileCard
