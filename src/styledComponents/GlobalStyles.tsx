import { createGlobalStyle } from 'styled-components';

type Colors = {
    bgColor: string;
    textColor: string;
    textColorSec?: string;
}

type Theme = {
    light: Colors;
    dark: Colors;
};

export const theme: Theme = {
    light: {
        bgColor: 'hsl(240,27%,98%)',
        textColor: 'hsl(231,28%,7%)',
        textColorSec: 'hsl(231,20%,61%)'
    },
    dark: {
        bgColor: 'hsl(231,30%,11%)',
        textColor: 'hsl(0,0%,100%)',
    }
}

const GlobalStyles = createGlobalStyle< { $isDark: boolean } >`
    :root {
        --bg-header: hsl(233,31%,17%);
        --logo-bg-violet: hsl(252,94%,67%);
        --light-green: hsl(150, 100%, 85%);
        --saturated-green: hsl(160,67%,52%);
        --light-orange: hsl(39, 100%, 84%);
        --saturated-orange: hsl(34,100%,50%);
        --font-main: font-family: 'League Spartan', sans-serif;
    }

    body {
        min-height: 100vh;
        font-family: var(--font-main);
        background-color: ${ ({ $isDark }) => $isDark ? theme.dark.bgColor : theme.light.bgColor};
        color: ${ ({ $isDark }) => $isDark ? theme.dark.textColor : theme.light.textColor}
    }
`;

export default GlobalStyles;