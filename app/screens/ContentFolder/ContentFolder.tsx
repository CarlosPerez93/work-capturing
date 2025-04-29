import { useEffect, useState } from 'react'
import { Box } from 'native-base'
import { Stack } from 'expo-router'
import { FlatList } from 'react-native'

import { FileCard } from '@/app/components/FilesCard/FileCard'

import { files } from '@/app/utils/mocks/files'

import { styles } from './styles'
import { accesFolder } from '@/app/utils/functions/functions'

export const ContentFolder = ({ ...props }) => {
    const folderName = props.route.params.params.folderName
    const [files, setFiles] = useState<string[]>([]);
    const renderItem = () => <FileCard />

    useEffect(() => {
        const fetchContentFolders = async () => {
            try {
                const foldersContent = await accesFolder(folderName);
                setFiles(foldersContent)
            } catch (err) {
                console.error("Error al cargar las carpetas :", err)
            }
        }
        fetchContentFolders();
    }, [folderName])
    return (
        <Box style={styles.container}>
            <Stack.Screen
                options={{
                    headerTitle: `${folderName}`,
                    headerTitleAlign: 'center',
                }}
            />
            <FlatList
                style={{ display: 'flex' }}
                data={files}
                renderItem={renderItem}
                keyExtractor={item => item.toString()}
                numColumns={2}
            />
        </Box>
    )
}

export default ContentFolder
