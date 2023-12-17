import { styled } from "styled-components";
import { createFlexMixin } from "./GlobalStyles";
import FlexMixinInterface from "../interfaces/flexMixin";
import { CustomizableTextItem } from "../shared/typographyStyles";
import FontPropsInterface from "../interfaces/fontProps";
import rem from "../utilities/pxIntoRem";
import ButtonDefault from "../shared/buttons";
import { JustifyType } from "../shared/buttons";
import { svgBackgroundMixin } from "../styledComponents/GlobalStyles";
import plusIcon from '../assets/icon-plus.svg';


export const MainContainer = styled.main<{ $flexArgs: FlexMixinInterface }>`
    ${props => createFlexMixin(props.$flexArgs)};
    min-height: 100vh;
    margin-inline: 5svw;
`;

export const HeadingWrapper = styled.div<{$flexArgs: FlexMixinInterface}>`
    ${props => createFlexMixin(props.$flexArgs)};
    margin-block: ${rem(25)};
    width: 100%;
`;

export const TitleWrapper = styled.div<{ $flexArgs: FlexMixinInterface}>`
    ${props => createFlexMixin(props.$flexArgs)};
`;

export const HeadingTitle = styled.h1`
    color: ${({ theme }) => theme.textColor};
    font-size: clamp(1.4rem, 8vw, 2.8rem);
`;

export const HeadingSubtitle = styled(CustomizableTextItem)<FontPropsInterface>`
    color: ${({theme}) => theme.textColor};
`;

export const NewInvoiceButton = styled(ButtonDefault)<{$justify: JustifyType}>`
    background-color: ${ ({theme}) => theme.general.purple};
    color: ${ ({theme}) => theme.general.white};
    padding-right: ${rem(15)};
    margin-left: 2svw;

    &::before {
        ${svgBackgroundMixin(plusIcon, 'left', true, true, 'auto')};
        background-color: white;
    }
`

export const NewInvoiceText = styled(CustomizableTextItem)<FontPropsInterface>`
    padding-left: ${rem(28)};
`;