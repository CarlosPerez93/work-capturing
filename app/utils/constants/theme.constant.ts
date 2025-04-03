// theme.ts
import { extendTheme } from 'native-base'

export const customTheme = extendTheme({
    colors: {
        primary: {
            50: '#E3F2FD',
            100: '#BBDEFB',
            200: '#90CAF9',
            300: '#64B5F6',
            400: '#42A5F5',
            500: '#2196F3',
            600: '#1E88E5',
            700: '#1976D2',
            800: '#1565C0',
            900: '#0D47A1',
        },
        dark: {
            bg: '#121212',
            text: '#FFFFFF',
            card: '#1E1E1E',
        },
        light: {
            bg: '#FFFFFF',
            text: '#000000',
            card: '#F0F0F0',
        },
    },
    components: {
        Button: {
            baseStyle: {
                borderRadius: 'md',
            },
            defaultProps: {
                colorScheme: 'primary',
            },
        },
        Text: {
            baseStyle: (props: any) => ({
                color: props.colorMode === 'dark' ? 'dark.text' : 'light.text',
            }),
        },
        View: {
            baseStyle: (props: any) => ({
                bg: props.colorMode === 'dark' ? 'dark.bg' : 'light.bg',
            }),
        },
        Box: {
            baseStyle: (props: any) => ({
                bg: props.colorMode === 'dark' ? 'dark.card' : 'light.card',
            }),
        },
    },
})
