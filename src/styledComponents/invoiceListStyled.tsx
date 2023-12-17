import rem from "../utilities/pxIntoRem";
import { createFlexMixin } from "./GlobalStyles";
import FlexMixinInterface from "../interfaces/flexMixin";
import { CustomizableTextItem } from "../shared/typographyStyles";
import { Link, LinkProps } from 'react-router-dom';
import { styled } from "styled-components";
import { motion } from "framer-motion";

export const InvoiceUl= styled(motion.ul)<{ $flexArgs: FlexMixinInterface }>`
    ${props => createFlexMixin(props.$flexArgs)};
    list-style: none;
    min-height: 100vh;
    width: 100%;
    padding: 0;
    background-color: ${({theme}) => theme.bgColor};
    transition: background-color 300ms ease-in-out;
`;

export const InvoiceListItem = styled(motion.li)`
    height: ${rem(135)};
    width: 100%;
`;

export const InvoiceLink = styled(Link)<LinkProps>`
    background-color: ${({theme}) => theme.invoiceBg};
    border-radius: ${rem(15)};
    transition: background-color 300ms ease-in-out;
    padding: ${rem(25)};
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: ${rem(30)} ${rem(20)} ${rem(30)};
    grid-template-areas:    'uid . name'
                            'date . .'
                            'price . status';
    align-items: center;
    row-gap: ${rem(5)};
`;

export const InvoiceUid = styled(CustomizableTextItem)`
    grid-area: uid;
    color: ${({theme}) => theme.textColor};
`;

export const SpanUid = styled.span`
    color: ${({theme}) => theme.general.uidHash};
`

export const InvoiceDate = styled(CustomizableTextItem)`
    grid-area: date;
    color: ${({theme}) => theme.textColor};
`;

export const InvoiceName = styled(CustomizableTextItem)`
    grid-area: name;
    justify-self: end;
    color: ${({theme}) => theme.textColorSecondary};
`;

export const InvoicePrice = styled(CustomizableTextItem)`
    grid-area: price;
    color: ${({theme}) => theme.textColorSecondary};
`;