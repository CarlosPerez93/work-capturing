import { jwtDecode } from 'jwt-decode'
import AsyncStorage, {
    useAsyncStorage,
} from '@react-native-async-storage/async-storage'

import { key, payload } from './types'
import { JWT_KEY } from '../constants/environment.constant'

export const SaveItem = async ({ key = JWT_KEY, newItem }: payload) => {
    const { setItem } = useAsyncStorage(key)
    try {
        await setItem(newItem)
        return true
    } catch (error) {
        return false
    }
}

export const GetItem = async ({ key = JWT_KEY }: key) => {
    const { getItem } = useAsyncStorage(key)
    return await getItem()
}

export const RemoveItem = async ({ key = JWT_KEY }: key) => {
    const { removeItem } = useAsyncStorage(key)
    try {
        await removeItem()
        return true
    } catch (error) {
        return false
    }
}

export const IsValidToken = async () => {
    const { getItem } = useAsyncStorage(JWT_KEY)
    const token = await getItem()
    if (![undefined, null, ''].includes(token)) {
        try {
            const current: any = jwtDecode(token || '')
            return current.exp >= Math.round(new Date().getTime() / 1000)
        } catch (e) {
            return false
        }
    } else return false
}

export const clearData = async () => await AsyncStorage.clear()
