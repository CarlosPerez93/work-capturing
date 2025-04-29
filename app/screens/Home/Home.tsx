import { Box, Button, Text, useColorMode, View, Modal, Input } from 'native-base'
import { FlatList, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import { createFile, fetchFolders, accesFolder } from '../../utils/functions/functions'
import { useNavigation } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/app/utils/types/types.routes'



export const Home = ({ ...props }) => {
    const { colorMode } = useColorMode()
    const { bg, txt } = props
    const [folders, setFolders] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>('')
    type FolderScreen = StackNavigationProp<RootStackParamList, 'folder'>
    const navigation = useNavigation<FolderScreen>()


    useEffect(() => {
        fetchFolders().then((folders) => setFolders(folders)).catch((error) => {
            console.error('Error al cargar carpetas:', error);
        });
    }, []);

    const handleFolder = (folderName: string) => {
        console.log(folderName, "entro")
        try {
            navigation.navigate('folder', { params: { folderName } });
        } catch (error) {
            console.error('Error al acceder a la carpeta:', error);
        }
    }

    const handleCreateFolder = () => {
        try {
            createFile(folderName, () => setIsModalOpen(false));
        } catch (error) {
            console.error('Error al crear carpeta:', error);
        }
    }
    return (
        <Box bg={bg} h={'full'} style={{ padding: 30 }}>
            <View style={{ display: "flex", height: '100%', marginTop: 5 }}>
                <Text color={txt} style={{ fontWeight: "900", fontSize: 25 }} >Areas de trabajo.</Text>
            </View>

            <FlatList
                data={folders}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => handleFolder(item)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 8,
                        }}
                    >
                        <MaterialIcons name='folder' size={24} color={txt} />
                        <Text ml={2} color={txt}>
                            {item}
                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View style={{ flex: 1 }}>
                <Button
                    onPress={() => setIsModalOpen(true)}
                    bg='transparent'
                    _pressed={{ bg: 'transparent' }}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                        alignSelf: 'center',
                        marginBottom: 60,
                    }}
                >
                    + Nueva Área de trabajo
                </Button>
            </View>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Crear nueva carpeta</Modal.Header>
                    <Modal.Body>
                        <Input
                            placeholder='Nombre de la carpeta'
                            value={folderName}
                            onChangeText={text => setFolderName(text)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onPress={handleCreateFolder}
                            isDisabled={!folderName.trim()}
                            bg='transparent'
                            _pressed={{ bg: 'transparent' }}
                        >
                            Crear
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </Box>
    )
}

export default Home
