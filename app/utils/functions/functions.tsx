
import * as FileSystem from 'expo-file-system'
import { Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { launchCameraAsync } from 'expo-image-picker';


/**
 * Crea una carpeta nueva en la ruta especificada.
 * @param folderName - Nombre de la carpeta.
 * @param onComplete - Callback que se ejecuta al finalizar la operación.
 */
export const createFile = async (folderName: string, onComplete: () => void) => {
    const routeFolder = `${FileSystem.documentDirectory}/newStationWork/${folderName}`;
    try {
        const existFolder = await FileSystem.getInfoAsync(routeFolder);
        if (!existFolder.exists) {
            await FileSystem.makeDirectoryAsync(routeFolder, { intermediates: true });
            Alert.alert("Exito, carpeta creada correctamente");
            fetchFolders();
        } else {
            Alert.alert("Error, esta carpeta ya se encuentra creada con ese nombre");
        }
    } catch (error) {
        Alert.alert("Error, problemas al crear la carpeta")
        console.error('Comand of error: ', error)
    } finally {
        onComplete()
    }
}

/**
 * Lista de carpetas.
 */
export const fetchFolders = async (): Promise<string[]> => {
    const routeFolder = `${FileSystem.documentDirectory}/newStationWork`;
    try {
        const info = await FileSystem.getInfoAsync(routeFolder);
        if (info.exists) {

            const folderContents = await FileSystem.readDirectoryAsync(routeFolder);
            return folderContents;
        }
    } catch (error) {
        console.error('Error to list folder: ', error)
    }
    return [];
}

/**
 * Crea una carpeta nueva en la ruta especificada.
 * @param folderName - Nombre de la carpeta.
 */
export const accesFolder = async (folderName: string) => {
    if (!folderName || typeof folderName !== 'string' || folderName.trim() === '') {
        console.error('El nombre de la carpeta es inválido.');
        return [];
    }
    const routerFolder = `${FileSystem.documentDirectory}/newStationWork/${folderName}`
    try {
        const folderContents = await FileSystem.readDirectoryAsync(routerFolder);
        console.log('Contenido de la carpeta', folderContents)
        return folderContents || [];
    } catch (error) {
        console.error("Error :", error)
        return [];
    }
}


/**
 * Guarda los archivos en la carpeta
 * @param folderName - Nombre de la carpeta.
 * @param files - Archivo.
 */

export const saveFiles = async (folderName: string, files: any[]) => {
    try {
        await AsyncStorage.setItem(`@files_${folderName}`, JSON.stringify(files));
    } catch (error) {
        console.error('Error al guardar archivos:', error);
    }
};

/**
 * Carga los archivos que contiene la carpeta
 * @param folderName - Nombre de la carpeta.
 */

export const loadFiles = async (folderName: string) => {
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

/**
 * Carga los archivos
* @param folderName - Nombre de la carpeta.
* @param files - Archivo.
 */
export const handleUpload = async (folderName: string, files: any[]) => {

    try {
        const result = await DocumentPicker.getDocumentAsync({
            type: '*/*',
            copyToCacheDirectory: true,
        });

        if (result.assets) {
            const newFiles = [...files, { name: result.assets[0].name, dateFile: new Date('2025-06-12') }];

            await saveFiles(folderName, newFiles);
            return newFiles;
        }
        return [];
    } catch (error) {
        console.error('Error al seleccionar el archivo:', error);
    }
};

/**
 * Toma las fotos o las carga
* @param folderName - Nombre de la carpeta.
* @param files - Archivo.
 */

export const handleTakePhoto = async (files: any[]) => {
    try {
        const photo = await launchCameraAsync({ allowsEditing: true });
        if (!photo.canceled) {

            const newFiles = [...files, { name: photo.assets[0].fileName, dateFile: new Date('2025-06-12') }];
            return newFiles;
        }
        return []

    } catch (error) {
        console.error("Error al tomar foto:", error);
    }
};