import useIntl from '@/app/hooks/useIntl'
import { LANGS } from '@/app/utils/constants/language.constant'
import {
    Actionsheet,
    Box,
    Button,
    Center,
    Select,
    Text,
    useDisclose,
} from 'native-base'
import { useTranslation } from 'react-i18next'

import styles from './'

const { Content, Item } = Actionsheet

export const SelectLanguage = () => {
    const { i18n } = useTranslation()
    const { formatMessage } = useIntl()
    const { isOpen, onClose, onOpen } = useDisclose()
    const onChangeLang = (value: string) => i18n.changeLanguage(value)
    return (
        <Center>
            <Button onPress={onOpen}>here</Button>
            <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator>
                <Content>
                    <Box w='100%' h={60} px={4} justifyContent={'center'}>
                        <Text
                            fontSize='16'
                            color='gray.500'
                            _dark={{ color: 'gray.300' }}
                        >
                            {formatMessage({ id: 'language.selectLanguage' })}
                        </Text>
                    </Box>
                    {Object.values(LANGS).map(item => (
                        <Item
                            onPress={() => onChangeLang}
                            key={item.text}
                            children={formatMessage({ id: `language.${item.text}` })}
                        />
                    ))}
                </Content>
            </Actionsheet>
            {/*  <Select
                onValueChange={onChangeLang}
                placeholder={formatMessage({ id: 'language.selectLanguage' })}
            ></Select> */}
        </Center>
    )
}

export default SelectLanguage
