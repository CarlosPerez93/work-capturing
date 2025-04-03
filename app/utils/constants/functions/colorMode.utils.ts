import type { StorageManager } from 'native-base'

import { GetItem, SaveItem } from '../../storage'
import { COLOR_KEY as key } from '../../constants/environment.constant'

export const colorModeManager: StorageManager = {
    get: async () => {
        try {
            const color = await GetItem({ key })
            return color === 'dark' ? 'dark' : 'light'
        } catch (e) {
            return 'light'
        }
    },
    set: async (newItem: any) => await SaveItem({ key, newItem }),
}
