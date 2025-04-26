import { Flex } from 'native-base'

import SelectDarkMode from '../DarkMode'

import { HeaderProps } from './headerRootStack.type'

import { styles } from './styles'

export const HeaderRootStack = ({ bg }: HeaderProps) => (
    <Flex bg={bg} style={styles.header}>
        <SelectDarkMode bg={bg} />
    </Flex>
)
