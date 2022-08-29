import { View } from "react-native";
import { styled } from "../../../hooks/theme";

export const Container = styled(View)`
    padding: 8px;
    padding-top: 12px;
    width: 100%;
`

export const SpeedProgressBarContainer = styled(View)`
    width: 100%;
    height: 4px;
    background-color: ${({ theme }) => theme.colors.disabled};
    border-radius: 1000px;
    overflow: hidden;
    `

interface SpeedProgressProps {
    progress: number;
    maxProgress: number;
}

export const SpeedProgressBar = styled(View) <SpeedProgressProps>`
    width: ${({ progress, maxProgress }) => `${progress / maxProgress * 100}%`};
    height: 100%;
    background-color: ${({ theme }) => theme.colors.success};
    border-radius: 1000px;
`
