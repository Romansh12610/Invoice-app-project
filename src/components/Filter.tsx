import React, { useState, useEffect } from 'react';
import { FilterWrapper, FilterButton, FilterList, FilterText, FilterListItem, ListItemButton } from '../styledComponents/FilterStyled';
import Icon from "../Icon/Icon";
import { useGlobalContext } from './ContextWrapper';
import { useTheme } from "styled-components";
import { FilterActiveType } from '../interfaces/filterTypes';
import { motion } from 'framer-motion';
import { filterListVariants, filterItemVariants } from '../utilities/filterVariants';

export default function Filter() {

    const { orientation, filterStatus, setFilterStatus, dispatchAction } = useGlobalContext();
    const colorTheme = useTheme();

    // open / closed list
    const [isOpen, setIsOpen] = useState(false);

    // event handler on filterType change
    function handleFilterButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.currentTarget;
        const currFilterStatus = target.getAttribute('data-filterstatus') as FilterActiveType;

        // set new filter type
        setFilterStatus(prevFilterStatus => {
            if (prevFilterStatus !== currFilterStatus) {
                return currFilterStatus;
            } else {
                return 'all';
            }
        });
    }

    useEffect(() => {
        dispatchAction({
            type: 'filter',
            payload: {
                filterStatus,
            }
        });
    }, [filterStatus]);

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
                    customStyle={{
                        transform: isOpen ? 'rotate(180deg)' : '',
                        transition: 'transform 250ms ease-in-out'
                    }}
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
                        data-filterstatus='draft'
                        onClick={handleFilterButtonClick}    
                    >Draft</ListItemButton>
                </FilterListItem>
                <FilterListItem
                    as={motion.li}
                    variants={filterItemVariants}
                >
                    <ListItemButton
                        $checked={filterStatus === 'pending'}
                        data-filterstatus='pending'
                        onClick={handleFilterButtonClick}
                    >Pending</ListItemButton>
                </FilterListItem>
                <FilterListItem
                    as={motion.li}
                    variants={filterItemVariants}
                >
                    <ListItemButton
                        $checked={filterStatus === 'paid'}
                        data-filterstatus='paid'
                        onClick={handleFilterButtonClick}
                    >Paid</ListItemButton>
                </FilterListItem>
            </FilterList>
        </FilterWrapper>
    )
}