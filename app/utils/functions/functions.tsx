
import * as FileSystem from 'expo-file-system'
import { Alert } from 'react-native'


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
<<<<<<< HEAD
=======

>>>>>>> main
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
