import React, { useEffect, useRef } from 'react';
import { FilterWrapper, FilterButton, FilterList, FilterText, ListItem } from '../styledComponents/FilterStyled';
import Icon from "../Icon/Icon";
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useTheme } from "styled-components";
import { FilterActiveType } from '../interfaces/filterTypes';
import { motion } from 'framer-motion';
import { filterListVariants, filterItemVariants } from '../utilities/variants/filterVariants';
import useCloseIfClickOutside from '../hooks/useCloseIfClickOutside';

export default function Filter() {

    const { orientation, filterStatus, setFilterStatus, dispatchAction } = useGlobalContext();
    const colorTheme = useTheme();

    function handleListOpenClick() {
        setIsOpen(currOpen => {
            if (currOpen === true) {
                return false;
            }
            else {
                return true;
            }
        });
    }

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
            payload: filterStatus,
        });
    }, [filterStatus]);

    // open / closed list logic
    const listRef = useRef<HTMLUListElement | null>(null);
    const btnRef = useRef<HTMLButtonElement | null>(null);

    // ref mb null
    const [isOpen, setIsOpen] = useCloseIfClickOutside([listRef, btnRef]);

    const { isFormOpen } = useGlobalContext().globalState;
    // if from open => filter tap closed
    useEffect(() => {
        if (isOpen && isFormOpen) {
            setIsOpen(false);
        }
    }, [isFormOpen]);

    return (
        <FilterWrapper>
            <FilterButton
                $flexArgs={{
                    direction: "row",
                    alignItems: "center"
                }}
                onClick={handleListOpenClick}
                ref={btnRef}
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
                ref={listRef}
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
                <ListItem 
                    filterStatus='draft'
                    btnText='draft'
                    handleBtnClick={handleFilterButtonClick}
                    $checked={filterStatus === 'draft'}
                    variants={filterItemVariants}
                />
                <ListItem 
                    filterStatus='pending'
                    btnText='pending'
                    handleBtnClick={handleFilterButtonClick}
                    $checked={filterStatus === 'pending'}
                    variants={filterItemVariants}
                />
                <ListItem 
                    filterStatus='paid'
                    btnText='paid'
                    handleBtnClick={handleFilterButtonClick}
                    $checked={filterStatus === 'paid'}
                    variants={filterItemVariants}
                />
            </FilterList>
        </FilterWrapper>
    )
}