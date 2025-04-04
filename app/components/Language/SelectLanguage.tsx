import { Box, Select } from 'native-base'
import { useTranslation } from 'react-i18next'

import useIntl from '@/app/hooks/useIntl'
import { LANGS } from '@/app/utils/constants/language.constant'

import { styles } from './Styles'

const { Item } = Select

export const SelectLanguage = () => {
    const { i18n } = useTranslation()
    const { formatMessage } = useIntl()

    const onChangeLang = (value: string) => i18n.changeLanguage(value)

    return (
        <Box maxH={50} style={styles.box}>
            <Select
                style={styles.select}
                onValueChange={onChangeLang}
                placeholder={formatMessage({ id: 'language.selectLanguage' })}
            >
                {Object.values(LANGS).map(item => (
                    <Item
                        key={item.text}
                        value={item.value}
                        label={formatMessage({ id: `language.${item.text}` })}
                    />
                ))}
            </Select>
        </Box>
    )
}

export default SelectLanguage
