import { FC } from 'react'
import { Heading, HStack, Spinner } from 'native-base'

import { LoadingPropTypes, LoadingProps } from './loading.type'

import { styles } from './Loading.style'

export const Loading: FC<LoadingProps> = ({ message = 'cargando' }) => {
    return (
        <HStack space={2} justifyContent='center'>
            <Spinner
                color='warning.500'
                size='lg'
                accessibilityLabel='Loading posts'
            />
            <Heading color='warning.500' fontSize='md'>
                {message}
            </Heading>
        </HStack>
    )
}

Loading.propTypes = LoadingPropTypes

export default Loading
