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
    overflow-y: scroll;
    padding: 0;
`;

export const InvoiceListItem = styled(motion.li)`
    height: ${rem(135)};
    width: 100%;
`;

export const InvoiceLink = styled(Link)<LinkProps>`
    background-color: ${({theme}) => theme.invoiceBg};
    padding: ${rem(25)};
    display: grid;
    // continue grid
`;

export const InvoiceUid = styled(CustomizableTextItem)`
`;

export const SpanUid = styled.span`
    color: ${({theme}) => theme.general.uidHash};
`

export const InvoiceDate = styled(CustomizableTextItem)`    
`;

export const InvoiceName = styled(CustomizableTextItem)`
`;

export const InvoicePrice = styled(CustomizableTextItem)`
`;