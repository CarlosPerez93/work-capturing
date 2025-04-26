import { Box } from 'native-base'
import { Stack } from 'expo-router'
import { FlatList } from 'react-native'

import { FileCard } from '@/app/components/FilesCard/FileCard'

import { files } from '@/app/utils/mocks/files'

import { styles } from './styles'

export const ContentFolder = ({ ...props }) => {
    const folderName = props.route.params.params.folderName

    const renderItem = () => <FileCard />
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
                keyExtractor={item => item._id.toString()}
                numColumns={2}
            />
        </Box>
    )
}

export default ContentFolder
