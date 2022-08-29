import { View } from 'react-native'
import { styled } from '../../hooks/theme'

export const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.background};
    padding: 0px 16px;
`