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



    const fectDataFolder = async () => {
        const dataFolders = await fetchFolders();
        if (Array.isArray(dataFolders)) {
            console.log(dataFolders, "datafolder")
            setFolders(dataFolders);

        } else {
            console.error("fetchFolders no devolvió un array válido");
        }
    }


    const handleFolder = (folderName: string) => {

        try {
            navigation.navigate('folder', { params: { folderName } });
        } catch (error) {
            console.error('Error al acceder a la carpeta:', error);
        }
    }

    const handleCreateFolder = async () => {
        try {
            await createFile(folderName, () => setIsModalOpen(false));
            console.log(folders)
        } catch (error) {
            console.error('Error al crear carpeta:', error);
        }
    }


    useEffect(() => {
        fectDataFolder();
        console.log(folders, "carpetas")
    }, []);
    const pr = [
        "1", "2", "3"
    ]
    return (
        <Box bg={bg} h={'full'} style={{ padding: 30 }}>
            <View style={{ display: "flex", marginTop: 5, }}>
                <Text color={txt} style={{ fontWeight: "900", fontSize: 20 }} >Areas de trabajo.</Text>
            </View>

            <View style={{ flex: 1, }}>
                <FlatList
                    data={folders}
                    keyExtractor={(item, index) => index.toString()}

                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => handleFolder(item)}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginVertical: 8,
                                backgroundColor: "#3A3737",
                                height: 50,
                                borderRadius: 13,
                                padding: 5
                            }}

                        >

                            <MaterialIcons name='folder' size={34} color={txt} style={{}} />
                            <Text ml={2} color={txt} style={{ fontWeight: "800", fontSize: 15, color: "white" }}>
                                {item}
                            </Text>

                        </TouchableOpacity>

                    )}
                />
            </View>
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
