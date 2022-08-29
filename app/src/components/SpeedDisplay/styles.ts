import { Text, View } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.containerBackground};
    padding: 16px;
    border-radius: 8px;
    width: 100%;
    margin-bottom: 16px;
`

export const TitleText = styled(Text)`
    color: ${({ theme }) => theme.colors.text1};
    font-size: 14px;
    width: 100%;
`

export const SpeedText = styled(Text)`
    font-size: 48px;
    font-weight: bold;
    text-align: center;
    color: ${({ theme }) => theme.colors.text1};
`