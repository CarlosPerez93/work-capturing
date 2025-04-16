import { Box, Button, Text, useColorMode, View, Modal, Input } from 'native-base'
import * as FileSystem from 'expo-file-system'
import { Alert, FlatList, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

export const Home = ({ ...props }) => {
    const { colorMode } = useColorMode()
    const [folders, setFolders] = useState<string[]>([])
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [folderName, setFolderName] = useState<string>('')
    const createFile = async () => {
        const routeFolder = `${FileSystem.documentDirectory}/newStationWork/${folderName}`
        try {
            const existFolder = await FileSystem.getInfoAsync(routeFolder)
            if (!existFolder.exists) {
                await FileSystem.makeDirectoryAsync(routeFolder, {
                    intermediates: true,
                })
                Alert.alert('Exito, carpeta creada correctamente')
                fetchFolders()
            } else {
                Alert.alert(
                    'Error, esta carpeta ya se encuentra creada con ese nombre'
                )
            }
        } catch (error) {
            Alert.alert('Error, problemas al crear la carpeta')
            console.error('Comand of error: ', error)
        } finally {
            setIsModalOpen(false)
        }
    }
    const fetchFolders = async () => {
        const routeFolder = `${FileSystem.documentDirectory}/newStationWork`
        try {
            const info = await FileSystem.getInfoAsync(routeFolder)
            if (info.exists) {
                const folderContents = await FileSystem.readDirectoryAsync(
                    routeFolder
                )
                setFolders(folderContents)
            }
        } catch (error) {
            console.error('Error to list folder: ', error)
        }
    }

    useEffect(() => {
        fetchFolders()
    }, [])
    return (
        <Box bg={colorMode === 'dark' ? 'dark.bg' : 'light.bg'} h={'full'}>
            <Text color={colorMode === 'dark' ? 'dark.text' : 'light.text'}>
                Areas de trabajo.
            </Text>
            <FlatList
                data={folders}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: 8,
                        }}
                    >
                        <MaterialIcons
                            name='folder'
                            size={24}
                            color={colorMode === 'dark' ? '#fff' : '#000'}
                        />
                        <Text
                            ml={2}
                            color={colorMode === 'dark' ? 'dark.text' : 'light.text'}
                        >
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
                            onPress={createFile}
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
