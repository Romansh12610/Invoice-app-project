import { styled } from "styled-components";
import FlexMixinInterface from "../interfaces/flexMixin";
import FontPropsInterface from "../interfaces/fontProps";
import { CustomizableTextItem } from "../shared/typographyStyles";
import { createFlexMixin } from "./GlobalStyles";
import rem from "../utilities/pxIntoRem";
import { motion } from 'framer-motion';
import checkmark from '../assets/icon-check.svg';
import { CustomHTMLButtonElement } from "../interfaces/filterTypes";
import { FilterActiveType } from '../interfaces/filterTypes';
import { Variants } from "framer-motion";

export const FilterWrapper = styled.div`
    margin-left: auto;
    position: relative;
`;

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

export const FilterList = styled(motion.ul)<{ $flexArgs: FlexMixinInterface }>`
    list-style: none;
    ${props => createFlexMixin(props.$flexArgs)};
    background-color: ${ ({theme}) => theme.filterListBg};
    color: ${ ({theme}) => theme.textColor};
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    top: 20px;
    width: clamp(${rem(80)}, 10vw, ${rem(120)});
    padding: ${rem(15)};
    border-radius: ${rem(10)};
    z-index: 100;
    border: ${rem(4)} solid ${({theme}) => theme.textColor};
    transition: background-color 300ms ease-in-out, color 300ms ease-in-out;

    display: flex;
    flex-flow: column nowrap;
    align-items: stretch;
`;

const FilterListItemWrapper = styled(motion.li)`
`;

const ListItemButton = styled.button<CustomHTMLButtonElement>`
    background-color: inherit;
    color: ${ ({theme}) => theme.textColor};
    font-weight: bold;
    cursor: pointer;
    
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: ${rem(8)};

    &:hover {
        & div {
            border: ${rem(2)} solid ${ ({theme}) => theme.general.purple};
        }
    };

    & > p {
        font-size: ${rem(17)};
        letter-spacing: 1.2px;
    }

` as React.FC<CustomHTMLButtonElement>;

const ListItemImage = styled.div<{ $checked: boolean }>`
    width: ${rem(16)};
    height: ${rem(16)};
    background-image: url(${props => props.$checked ? checkmark : ''});
    background-repeat: no-repeat;
    background-position: center;
    background-color: ${props => props.$checked ? props.theme.general.purple : props.theme.filterCheck};
    transition: all 300ms ease-in-out;
    border: 2px solid transparent;
    border-radius: ${rem(5)};
`;


// summary list item
interface ListItemProps {
    $checked: boolean;
    filterStatus: FilterActiveType;
    btnText: FilterActiveType;
    handleBtnClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    variants: Variants;
}

export const ListItem = (props: ListItemProps) => {
    return (
        <FilterListItemWrapper variants={props.variants}>
            <ListItemButton 
                onClick={props.handleBtnClick}
                data-filterstatus={props.filterStatus}
            >
                <ListItemImage $checked={props.$checked} />
                <p>{props.btnText}</p>
            </ListItemButton>
        </FilterListItemWrapper>
    )
};