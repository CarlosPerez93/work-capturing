import { customTheme } from '@/app/utils/constants/theme.constant'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    card: {
        margin: 4,
        padding: 5,
        width: '48%',
        borderRadius: 10,
        backgroundColor: customTheme.colors.gray[700],
    },
    contImg: {
        padding: 5,
        borderRadius: 10,
    },
})

//data load for cards from  library JaOo21

/*     
    const [imageUris, setImageUris] = useState<string[]>([])
    const [loading, setLoading] = useState(true)
    const { formatMessage } = useIntl()
useEffect(() => {
        const loadImages = async () => {
            setLoading(true)
            try {
                // Construct the path to your image folder
                const folderUri =
                    FileSystem.documentDirectory +
                    'your_app_image_directory/' +
                    folderName // Ajusta la ruta

                const result = await FileSystem.readDirectoryAsync(folderUri)
                const imageFiles = result.filter(file =>
                    /\.(jpg|jpeg|png|gif)$/i.test(file)
                ) // Filtra archivos de imagen

                const uris = imageFiles.map(file => `${folderUri}/${file}`)
                setImageUris(uris)
            } catch (error) {
                console.error('Error loading images:', error)
                // Manejar el error (mostrar un mensaje al usuario, etc.)
            } finally {
                setLoading(false)
            }
        }

        loadImages()
    }, [folderName]) */
