import { styled } from "styled-components";
import { createFlexMixin } from "./GlobalStyles";
import FlexMixinInterface from "../interfaces/flexMixin";
import { CustomizableTextItem } from "../shared/typographyStyles";
import FontPropsInterface from "../interfaces/fontProps";
import rem from "../utilities/pxIntoRem";
import { btnDefaultStylesMixin } from "../shared/buttons";
import { JustifyType } from "../shared/buttons";
import { motion } from "framer-motion";
import { OrientationType } from "../interfaces/globalContextInt";

export const MainContainer = styled(motion.main)<{ $flexArgs: FlexMixinInterface }>`
    ${props => createFlexMixin(props.$flexArgs)};
    min-height: 100vh;
    margin-inline: 10vw;
`;

export const HeadingWrapper = styled(motion.div)<{$flexArgs: FlexMixinInterface, $orientation: OrientationType }>`
    ${props => createFlexMixin(props.$flexArgs)};
    margin-block: ${rem(25)};
    width: ${props => props.$orientation === 'desktop' ? `${rem(850)}` : '100%'};
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

export const NewInvoiceButton = styled(motion.button)<{$justify: JustifyType}>`
    ${btnDefaultStylesMixin};
    background-color: ${ ({theme}) => theme.general.purple};
    color: ${ ({theme}) => theme.general.white};
    padding-right: ${rem(15)};
    margin-left: 2vw;
    margin-left: 2svw;
    justify-content: center;
    height: ${rem(60)};
`;

export const NewInvoiceText = styled(CustomizableTextItem)<FontPropsInterface>`
    padding-left: 10px;
`;

export const NewInvoiceBtnCircleWithSvg = styled.div`
    background-color: white;
    width: ${rem(28)};
    height: ${rem(28)};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: ${rem(3)};
`;

export const InvoiceQuantityStyled = styled.span`
    font-weight: bold;
    font-size: clamp(${rem(24)}, 2.2vw, ${rem(28)});
    
    padding-inline: ${rem(10)};
    overflow: hidden;
    position: relative;
    display: inline-flex;
    align-items: flex-start;
    
    color: ${props => props.theme.general.confirmBtnBg};
    transition: box-shadow 150ms ease-in-out;

    &::before {
        content: '';
        display: inline-block;
        position: absolute;
        bottom: 0px;
        left: 1px;
        right: 1px;
        height: 1px;
        background-color: ${props => props.theme.general.confirmBtnBg};
    };


    &:hover {

        &::before {
            box-shadow: 0px 0px 3px 2px ${props => props.theme.general.confirmBtnBg};
        }
    }
`;