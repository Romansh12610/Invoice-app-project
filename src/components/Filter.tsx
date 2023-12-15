import React, { useState } from 'react';
import { FilterWrapper, FilterButton, FilterList, FilterText, FilterListItem, ListItemButton } from '../styledComponents/FilterStyled';
import Icon from "../Icon/Icon";
import { useGlobalContext } from './ContextWrapper';
import { useTheme } from "styled-components";
import { FilterUnionType } from '../interfaces/globalContextInt';


export default function Filter() {

    const { orientation, filterStatus, handleFilterChange } = useGlobalContext();
    const colorTheme = useTheme();

    // open / closed list
    const [isOpen, setIsOpen] = useState(false);

    // filter event handling
    function handleFilterButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.currentTarget;
        const filterType = target.getAttribute('data-filtertype') as FilterUnionType;

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

            {isOpen && 
            (<FilterList
                $flexArgs={{
                    direction: 'column',
                    justify: 'space-evenly',
                    alignItems: 'flex-start',
                    gap: '15'
                }}
            >    
                <FilterListItem>
                    <ListItemButton
                        $checked={filterStatus.draft}
                        data-filtertype='draft'
                        onClick={handleFilterButtonClick}    
                    >Draft</ListItemButton>
                </FilterListItem>
                <FilterListItem>
                    <ListItemButton
                        $checked={filterStatus.pending}
                        data-filtertype='pending'
                        onClick={handleFilterButtonClick}
                    >Pending</ListItemButton>
                </FilterListItem>
                <FilterListItem>
                    <ListItemButton
                        $checked={filterStatus.paid}
                        data-filtertype='paid'
                        onClick={handleFilterButtonClick}
                    >Paid</ListItemButton>
                </FilterListItem>
            </FilterList>)}
        </FilterWrapper>
    )
}