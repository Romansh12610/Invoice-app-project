import React, { useState } from 'react';
import { FilterWrapper, FilterButton, FilterList, FilterText, FilterListItem, ListItemButton } from '../styledComponents/FilterStyled';
import Icon from "../Icon/Icon";
import { useGlobalContext } from './ContextWrapper';
import { useTheme } from "styled-components";
import { FilterActiveType } from '../interfaces/globalContextInt';
import { motion } from 'framer-motion';
import { filterListVariants, filterItemVariants } from '../utilities/animationVariants';

export default function Filter() {

    const { orientation, filterStatus, handleFilterChange } = useGlobalContext();
    const colorTheme = useTheme();

    // open / closed list
    const [isOpen, setIsOpen] = useState(false);

    // filter event handling
    function handleFilterButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.currentTarget;
        const filterType = target.getAttribute('data-filtertype') as FilterActiveType;

        handleFilterChange(filterType);
    }

    return (
        <FilterWrapper>
            <FilterButton
                $flexArgs={{
                    direction: "row",
                    alignItems: "center"
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                <FilterText
                    $size="medium"
                    $weight="bold"
                >Filter {orientation === 'desktop' && 'by status'}</FilterText>
                <Icon 
                    name="arrow-down"
                    size={11}
                    color={colorTheme.general.purple}
                />
            </FilterButton>
            <FilterList
                as={motion.ul}
                initial={false}
                animate={isOpen ? 'visible' : 'hidden'}
                variants={filterListVariants}
                $flexArgs={{
                    direction: 'column',
                    justify: 'space-evenly',
                    alignItems: 'flex-start',
                    gap: '8'
                }}
            >    
                <FilterListItem
                    as={motion.li}
                    variants={filterItemVariants}
                >
                    <ListItemButton
                        $checked={filterStatus === 'draft'}
                        data-filtertype='draft'
                        onClick={handleFilterButtonClick}    
                    >Draft</ListItemButton>
                </FilterListItem>
                <FilterListItem
                    as={motion.li}
                    variants={filterItemVariants}
                >
                    <ListItemButton
                        $checked={filterStatus === 'pending'}
                        data-filtertype='pending'
                        onClick={handleFilterButtonClick}
                    >Pending</ListItemButton>
                </FilterListItem>
                <FilterListItem
                    as={motion.li}
                    variants={filterItemVariants}
                >
                    <ListItemButton
                        $checked={filterStatus === 'paid'}
                        data-filtertype='paid'
                        onClick={handleFilterButtonClick}
                    >Paid</ListItemButton>
                </FilterListItem>
            </FilterList>
        </FilterWrapper>
    )
}