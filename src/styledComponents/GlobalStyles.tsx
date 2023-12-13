import { createGlobalStyle, css } from 'styled-components';
import ThemeInterface from '../interfaces/styled';
import FlexMixinInterface from '../interfaces/flexMixin';
import FontMixinInterface from '../interfaces/fontMixin';
import rem from '../utilities/PxIntoRem';

export const styleTheme: ThemeInterface = {
    light: {
        bgColor: '#f9f9fb',
        textColor: '#0d0e17',
        textColorSecondary: '#888eaf'
    },
    dark: {
        bgColor: '#141624',
        textColor: '#ffffff',
    },
    general: {
        iconColor: '#c5c5c5',
        logoPurple: '#7b5cfa',
        logoPurpleLight: '#b9a7ff',
        green: '#33d7a0',
        greenLight: '#b3ffd9',
        headerBg: '#1e2139',
        orange: '#ff9100',
        orangeLight: '#ffe2ad',
        gray: '#909eeb',
        white: '#fff',
        black: '#000',
    }
}

const GlobalStyles = createGlobalStyle< { $isDark: boolean } >`
    body {
        min-height: 100vh;
        font-family: 'League Spartan', sans-serif;
        background-color: ${ ({ $isDark }) => $isDark ? styleTheme.dark.bgColor : styleTheme.light.bgColor};
        color: ${ ({ $isDark }) => $isDark ? styleTheme.dark.textColor : styleTheme.light.textColor};

        transition: all 400ms ease-in;
    }
`;

export const createFlexMixin = ($flexArgs: FlexMixinInterface) => css`
    display: flex;
    flex-direction: ${$flexArgs.direction ? $flexArgs.direction : 'row'};
    justify-content: ${$flexArgs.justify ? $flexArgs.justify : 'flex-start'};
    align-items: ${$flexArgs.alignItems ? $flexArgs.alignItems : 'flex-start'};
    align-content: ${$flexArgs.alignContent ? $flexArgs.alignContent : 'flex-start'};
`

export const createFontMixin = (fontArgs: FontMixinInterface) => css`
    font-size: ${rem(fontArgs.$size)};
    font-weight: ${fontArgs.$weight};
    letter-spacing: ${fontArgs.$letterSpacing ? rem(fontArgs.$letterSpacing) : 'normal'};
    line-height: ${fontArgs.$lineHeight ? fontArgs.$lineHeight : '1'};
`;

export default GlobalStyles;