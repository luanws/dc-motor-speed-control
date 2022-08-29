import { FontAwesome } from '@expo/vector-icons'
import { View, TouchableOpacity } from "react-native"
import { styled } from "../../hooks/theme"

export const Container = styled(View)`
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    padding: 0px 32px; 
`

export const RotateButton = styled(TouchableOpacity)`
`

interface RotateIconProps {
    enabled: boolean
}

export const RotateIcon = styled(FontAwesome as any) <RotateIconProps>`
    color: ${({ theme, enabled }) => enabled ? theme.colors.success : theme.colors.disabled};
    padding: 16px;
    font-size: 24px;
`