import { Theme, ThemeTypes, Colors } from "./theme.model"

const defaultColors: Colors = {
    primary: '#135B4E',
    primaryLight: '#1c987c',
    primaryDark: '#0E4C3E',

    accent: '#2E75BB',
    accentLight: '#378ce1',
    accentDark: '#215587',

    background: '#F4F4F4',
    containerBackground: '#fff',
    divider: '#E5E5E5',
    unfocused: "#ddd",
    unfocusedIcon: "#666360",
    focused: "#2E75BB",
    disabled: "#666360",
    placeholder: "#777",

    title: '#0277bd',
    text1: '#111',
    text2: '#444',
    text3: 'gray',
    link: 'blue',

    success: "#00a152",
    info: "#5bc0de",
    warning: "#b2a300",
    danger: "#ab003c",

    icon: '#444',
}

export const themes: { [key in ThemeTypes]: Theme } = {
    light: {
        colors: {
            ...defaultColors,
        }
    },
    dark: {
        colors: {
            ...defaultColors,

            background: '#1F1E1F',
            containerBackground: '#2E2E34',
            divider: '#777',
            unfocused: "#777",
            unfocusedIcon: "#aaa",
            focused: "#00a152",

            title: '#1c987c',
            text1: '#fff',
            text2: '#D3CFC9',
            text3: '#ddd',
            link: 'deepskyblue',

            success: "#00e676",
            warning: "#ffea00",
            danger: "#f50057",

            icon: '#fff',
        }
    }
}