import { Box, Button, Text, useColorMode, View, Modal, Input } from 'native-base'
import * as FileSystem from 'expo-file-system'
import { Alert, FlatList, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { MaterialIcons } from '@expo/vector-icons'

import {createFile,fetchFolders,accesFolder} from '../../utils/functions/functions'
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

   /*  const accesFolder=async (folderName:string)=>{
        const routerFolder=`${FileSystem.documentDirectory}/newStationWork/${folderName}`
        try{
            const folderContents = await FileSystem.readDirectoryAsync(routerFolder);
            setCurrentFolderContents(folderContents);
            console.log('Contenido de la carpeta', folderContents)
        }catch(error){
            console.error("Error :",error)
        }
    } */
    useEffect(() => {
        fetchFolders()
    }, [])

    const handleFolder = (folderName: string) =>
        navigation.navigate('folder', { params: { folderName } })

    return (
        <Box bg={bg} h={'full'}>
            <Text color={txt}>Areas de trabajo.</Text>
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
