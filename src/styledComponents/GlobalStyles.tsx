import { createGlobalStyle, css } from 'styled-components';
import ThemeInterface from '../interfaces/styled';
import FlexMixinInterface from '../interfaces/flexMixin';
import FontMixinInterface from '../interfaces/fontMixin';
import rem from '../utilities/pxIntoRem';

export const styleTheme: {
    light: ThemeInterface,
    dark: ThemeInterface,
} = {
    light: {
        bgColor: '#eeeeee',
        textColor: '#0d0e17',
        textColorSecondary: '#888eaf',
        filterListBg: '#fff', 
        filterCheck: '#e0e4fa',
        invoiceBg: '#fff',
        invoiceBgSecondary: '#e6e6e6',
        totalBlockBg: '#373b53',
        editBtnBg: '#6573e0',
        editBtnColor: '#dddddd',
        formBg: '#ffffff',
        inputBorder: '#d0d5ff',
        selectOptionBg: '#ffffff',
        selectOptBorder: '#000000',
        selectOptHover: '#ffffff',
        selectOptBoxShadow: '#c4c4c4',
        selectItemListText: '#a0a0a0',
        selectTopWrapperBg: '#dbdada',
        backLinkHover: '#000',
        deleteBtnBg: '#6573e0',
        general: {
            iconColor: '#c5c5c5',
            purple: '#7b5cfa',
            purpleLight: '#b9a7ff',
            greenBg: '#79ffbc24', 
            greenLight: '#33d7a0',
            headerBg: '#1e2139',
            headerBorder: '#181d3a',
            orangeBg: '#ffb93724',
            orangeLight: '#ff9100',
            gray: '#9191916f',
            white: '#fff',
            black: '#000',
            uidHash: '#8283c0',
            deleteBtnBg: 'hsl(0,80%,63%)',
            markBtnBg: '#7b5cfa',
        }
    },
    dark: {
        bgColor: '#141624',
        textColor: '#fff',
        textColorSecondary: '#fff',
        filterListBg: '#3f4785',
        filterCheck: '#181d3a',
        invoiceBg: '#1f223b',
        invoiceBgSecondary: '#2d3155',
        totalBlockBg: '#0d0e17',
        editBtnBg: '#303b8d',
        editBtnColor: '#e0e4fb',
        formBg: '#131622',
        inputBorder: '#838bc2',
        selectOptionBg: '#292f5a',
        selectOptBorder: '#fff', 
        selectOptHover: '#16148d',
        selectItemListText: '#c9c9c9',
        selectTopWrapperBg: '#504ed47a',
        backLinkHover: '#7b5cfa',
        deleteBtnBg: '#838bc2',
        general: {
            iconColor: '#c5c5c5',
            purple: '#7b5cfa',
            purpleLight: '#b9a7ff',
            greenBg: '#79ffbc24', 
            greenLight: '#33d7a0',
            headerBg: '#1e2139',
            headerBorder: '#181d3a',
            orangeBg: '#ffb93724',
            orangeLight: '#ff9100',
            gray: '#9191916f',
            white: '#fff',
            black: '#000',
            uidHash: '#8283c0',
            deleteBtnBg: 'hsl(0,80%,63%)',
            markBtnBg: '#7b5cfa',
        }
    }
};

const GlobalStyles = createGlobalStyle< { $isDark: boolean } >`
    *, *::before, *::after {
        margin: 0;
        padding: 0;
    };

    a {
        text-decoration: none;
    };

    button {
        border: none;
        cursor: pointer;
    };

    fieldset {
        border: none;
    };

    input:focus {
        outline: none;
    };

    fieldset {
        min-width: 0;
    };

    body {
        min-height: 100vh;
        font-family: 'League Spartan', sans-serif;
        background-color: ${ ({ $isDark }) => $isDark ? styleTheme.dark.bgColor : styleTheme.light.bgColor};
        color: ${ ({ $isDark }) => $isDark ? styleTheme.dark.textColor : styleTheme.light.textColor};
        overflow-x: hidden;

        transition: all 300ms ease-in;
    }
`;

export const createFlexMixin = ($flexArgs: FlexMixinInterface) => css`
    display: flex;
    flex-direction: ${$flexArgs.direction ? $flexArgs.direction : 'row'};
    justify-content: ${$flexArgs.justify ? $flexArgs.justify : 'flex-start'};
    align-items: ${$flexArgs.alignItems ? $flexArgs.alignItems : 'flex-start'};
    align-content: ${$flexArgs.alignContent ? $flexArgs.alignContent : 'flex-start'};
    gap: ${$flexArgs.gap ? $flexArgs.gap : '0'}px;
`

export const createFontMixin = (fontArgs: FontMixinInterface) => css`
    font-size: ${rem(fontArgs.$size)};
    font-weight: ${fontArgs.$weight};
    letter-spacing: ${fontArgs.$letterSpacing ? `${fontArgs.$letterSpacing}px` : 'normal'};
    line-height: ${fontArgs.$lineHeight ? fontArgs.$lineHeight : '1'};
    transition: color 300ms ease-in-out;
`;

export const svgBackgroundMixin = (svgUrl: string, pos: 'right' | 'left' | 'center' = 'center', pxFormat: boolean = false, rounded: boolean = false, bgContain: 'auto' | 'contain' = 'contain') => css`
    position: absolute;
    top: calc(50% - (${pxFormat ? '32px' : '35%'} / 2));
    left: calc(${pos === 'center' ? 50 : pos === 'left' ? 25 : 75}% - (35% / 2));
    content: '';
    width: ${pxFormat ? '32px' : '35%'};
    height: ${pxFormat ? '32px' : '35%'};
    background: url(${svgUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: ${bgContain};
    border-radius: ${rounded ? '50%' : ''};
`;

export default GlobalStyles;