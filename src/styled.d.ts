import 'styled-components';

import ThemeInterface from './interfaces/styled';

declare module 'styled-components' {
    export interface DefaultTheme extends ThemeInterface {}
}