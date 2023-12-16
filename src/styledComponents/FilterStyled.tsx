import { styled, css } from "styled-components";
import FlexMixinInterface from "../interfaces/flexMixin";
import FontPropsInterface from "../interfaces/fontProps";
import { CustomizableTextItem } from "../shared/typographyStyles";
import { createFlexMixin } from "./GlobalStyles";
import rem from "../utilities/pxIntoRem";
import { motion } from 'framer-motion';
import checkmark from '../assets/icon-check.svg';
import { CustomHTMLButtonElement } from "../interfaces/globalContextInt";

export const FilterWrapper = styled.div`
    margin-left: auto;
    position: relative;
`;

export const FilterList = styled(motion.ul)<{ $flexArgs: FlexMixinInterface }>`
    list-style: none;
    ${props => createFlexMixin(props.$flexArgs)};
    background-color: ${ ({theme}) => theme.filterListBg};
    color: ${ ({theme}) => theme.textColor};
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 20px;
    width: clamp(${rem(80)}, 10vw, ${rem(150)});
    padding: ${rem(15)};
    border-radius: ${rem(10)};
`;

export const FilterListItem = styled(motion.li)`
`;

const svgBgCheckmarkMixin = css`
    background-image: url(${checkmark});
    background-repeat: no-repeat;
    background-position: center;
`; 

export const ListItemButton = styled.button<CustomHTMLButtonElement>`
    background-color: inherit;
    color: ${ ({theme}) => theme.textColor};
    font-weight: bold;
    padding-left: ${rem(24)};
    position: relative;
    cursor: pointer;

    &::before {
        content: '';
        width: ${rem(16)};
        height: ${rem(16)};
        display: block;
        background-color: ${props => props.$checked ? props.theme.general.purple : props.theme.filterCheck};
        position: absolute;
        top: 0;
        left: ${rem(-3)};
        border: ${rem(2)} solid transparent;
        border-radius: ${rem(5)};
        ${props => props.$checked ? svgBgCheckmarkMixin : '0'};
        transition: all 300ms ease-in-out;
    };

    &:hover {
        &::before {
            border: ${rem(2)} solid ${ ({theme}) => theme.general.purple};
        }
    }
` as React.FC<CustomHTMLButtonElement>;

export const FilterButton = styled.button<{ $flexArgs: FlexMixinInterface}>`
    background-color: inherit;
    width: fit-content;
    cursor: pointer;
    ${props => createFlexMixin(props.$flexArgs)};
`;

export const FilterText = styled(CustomizableTextItem)<FontPropsInterface>`
    color: ${ ({theme}) => theme.textColor};
    padding-right: ${rem(10)};
`;