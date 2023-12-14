import { styled } from "styled-components";
import { createFlexMixin } from "./GlobalStyles";
import FlexMixinInterface from "../interfaces/flexMixin";
import { CustomizableTextItem } from "../shared/typographyStyles";
import FontPropsInterface from "../interfaces/fontProps";


export const MainContainer = styled.main<{ $flexArgs: FlexMixinInterface }>`
    ${props => createFlexMixin(props.$flexArgs)};
    min-height: 100vh;
    margin-inline: 5svw;
`;

export const HeadingWrapper = styled.div< {$flexArgs: FlexMixinInterface} >`
    ${props => createFlexMixin(props.$flexArgs)};
`

export const HeadingTitle = styled.h1`
    color: ${({ theme }) => theme.textColor};
    font-size: clamp(1.4rem, 5vw, 2.5rem);
`;

export const HeadingSubtitle = styled(CustomizableTextItem)<FontPropsInterface>`
    color: ${ ({theme}) => theme.textColor};
`