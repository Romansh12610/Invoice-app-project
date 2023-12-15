import { styled } from "styled-components";
import FlexMixinInterface from "../interfaces/flexMixin";
import FontPropsInterface from "../interfaces/fontProps";
import { CustomizableTextItem } from "../shared/typographyStyles";
import { createFlexMixin } from "./GlobalStyles";
import rem from "../utilities/PxIntoRem";
import { motion } from 'framer-motion';
import checkmark from '../assets/icon-check.svg';

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

export const ListItemButton = styled.button<{ $checked: boolean, type: "draft" | "pending" | "paid" }>`
    background-color: inherit;
    padding-left: ${rem(30)};

    &::before {
        width: ${rem(16)};
        height: ${rem(16)};
        background-color: ${props => props.$checked ? props.theme.filterCheck : props.theme.general.purple};
        background-image: ${props => props.$checked ? `url(${checkmark})` : ''};
        background-repeat: no-repeat;
        background-position: center;
    }
`

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