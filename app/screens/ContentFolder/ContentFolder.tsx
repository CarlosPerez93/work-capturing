import { useEffect, useState } from 'react'
import { Box, Button, Icon, useDisclose, Actionsheet } from 'native-base'
import { Stack } from 'expo-router'
import { FlatList } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { FileCard } from '../../components/FilesCard/FileCard'
import { launchCameraAsync } from 'expo-image-picker';


import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles'

type PropsFiles = {
    name: string | null | undefined;
    dateFile: Date;
}

export const ContentFolder = ({ ...props }) => {
    const folderName = props.route.params.params.folderName
    const [files, setFiles] = useState<PropsFiles[]>([]);
    const { isOpen, onOpen, onClose } = useDisclose();
    const [selectedFile, setSelectedFile] = useState<any>(null);

    const saveFiles = async (folderName: string, files: any[]) => {
        try {
            await AsyncStorage.setItem(`@files_${folderName}`, JSON.stringify(files));
        } catch (error) {
            console.error('Error al guardar archivos:', error);
        }
    };

    const loadFiles = async (folderName: string) => {
        try {
            const filesStr = await AsyncStorage.getItem(`@files_${folderName}`);

            if (filesStr) {
                return JSON.parse(filesStr);
            }
            return [];
        } catch (error) {
            console.error('Error al cargar archivossss:', error);
            return [];
        }
    };


    const handleUpload = async () => {

        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            if (result.assets) {
                const newFiles = [...files, { name: result.assets[0].name, dateFile: new Date('2025-06-12') }];
                setFiles(newFiles);
                console.log(result.assets[0])
                await saveFiles(folderName, newFiles);
            }
        } catch (error) {
            console.error('Error al seleccionar el archivo:', error);
        }
    };


    // Función para tomar fotos con la cámara
    const handleTakePhoto = async () => {
        try {
            const photo = await launchCameraAsync({ allowsEditing: true });
            if (!photo.canceled) {
                console.log(photo.assets[0].fileName, "fotos")
                const newFiles = [...files, { name: photo.assets[0].fileName, dateFile: new Date('2025-06-12') }];
                console.log("datos actuales", newFiles)
                setFiles(newFiles);

            }
            onClose();
        } catch (error) {
            console.error("Error al tomar foto:", error);
        }
    };
    useEffect(() => {
        const fetchFiles = async () => {

            const storedFiles = await loadFiles(folderName);

            setFiles(storedFiles);
        };
        fetchFiles();
    }, [folderName]);

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
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <FileCard name={item.name} dateFile='12/06/2025' />
                )}
                numColumns={2}
            />
            <Box position="absolute" bottom={20} right={20.5} style={{ backgroundColor: 'transparent' }}>
                <Button

                    borderRadius="full"
                    style={{ backgroundColor: 'transparent' }}
                    _pressed={{ bg: "white" }}
                    onPress={onOpen}
                >
                    <Icon as={MaterialIcons} name="add" color="white" size={50} style={{ backgroundColor: 'black' }} />
                </Button>
                <Actionsheet isOpen={isOpen} onClose={onClose}>
                    <Actionsheet.Content>
                        <Actionsheet.Item onPress={handleUpload}>
                            📂 Subir Archivos
                        </Actionsheet.Item>
                        <Actionsheet.Item onPress={handleTakePhoto}>
                            📸 Tomar Foto
                        </Actionsheet.Item>
                    </Actionsheet.Content>
                </Actionsheet>
            </Box>

        </Box>
    )
}

export default ContentFolder
