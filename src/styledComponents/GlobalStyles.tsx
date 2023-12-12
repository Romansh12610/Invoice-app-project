import { createGlobalStyle } from 'styled-components';

type Colors = {
    bgColor: string;
    textColor: string;
    textColorSec?: string;
}

type Theme = {
    light: Colors;
    dark: Colors;
    general: {
        [col: string]: string;
    };
};

export const colorTheme: Theme = {
    light: {
        bgColor: 'hsl(240,27%,98%)',
        textColor: 'hsl(231,28%,7%)',
        textColorSec: 'hsl(231,20%,61%)'
    },
    dark: {
        bgColor: 'hsl(231,30%,11%)',
        textColor: 'hsl(0,0%,100%)',
    },
    general: {
        iconColor: 'hsl(0, 0%, 77.25490196078432%)',
    }
}

const GlobalStyles = createGlobalStyle< { $isDark: boolean } >`
    :root {
        --black: hsl(0, 0%, 0%);
        --white: hsl(0, 0%, 100%);
        --header-bg: hsl(233,31%,17%);
        --logo-violet-dark: hsl(252,94%,67%);
        --logo-violet-light: hsl(252.39669421487602, 100%, 76.27450980392156%);
        --light-green: hsl(150, 100%, 85%);
        --saturated-green: hsl(160,67%,52%);
        --light-orange: hsl(39, 100%, 84%);
        --saturated-orange: hsl(34,100%,50%);
        --gray: hsl(231,20%,61%);
        --light-gray: rgb(197, 197, 197);
        --font-main: font-family: 'League Spartan', sans-serif;
    }

    body {
        min-height: 100vh;
        font-family: var(--font-main);
        background-color: ${ ({ $isDark }) => $isDark ? colorTheme.dark.bgColor : colorTheme.light.bgColor};
        color: ${ ({ $isDark }) => $isDark ? colorTheme.dark.textColor : colorTheme.light.textColor}
    }
`;

export default GlobalStyles;