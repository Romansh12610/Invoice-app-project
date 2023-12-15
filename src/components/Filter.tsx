import { useState } from 'react';
import { FilterWrapper, FilterButton, FilterList, FilterText, FilterListItem, ListItemButton } from '../styledComponents/FilterStyled';
import Icon from "../Icon/Icon";
import { useGlobalContext } from './ContextWrapper';
import { useTheme } from "styled-components";


export default function Filter() {

    const { orientation, filterStatus, handleFilterChange } = useGlobalContext();
    const colorTheme = useTheme();

    // open / closed list
    const [isOpen, setIsOpen] = useState(false);

    // filter listItems managing
    

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
            <FilterList
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
                        type='draft'    
                    >Draft</ListItemButton>
                </FilterListItem>
                <FilterListItem>
                    <ListItemButton
                        $checked={filterStatus.pending}
                        type='pending'
                    >Pending</ListItemButton>
                </FilterListItem>
                <FilterListItem>
                    <ListItemButton
                        $checked={filterStatus.paid}
                        type='paid'
                    >Paid</ListItemButton>
                </FilterListItem>
            </FilterList>}
        </FilterWrapper>
    )
}