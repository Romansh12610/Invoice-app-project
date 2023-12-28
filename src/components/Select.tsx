import { Select, SelectText, SelectOptionList, SelectOption, SelectOptionButton, Label, StyledInputLabelWrapper, StyledSelectWrapper } from '../styledComponents/FormInvoiceStyled';
import { useGlobalContext } from './ContextWrapper';
import Icon from '../Icon/Icon';
import { useTheme } from 'styled-components';
import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { SelectItemVariants, SelectListVariants } from '../utilities/selectVariants';

// types
interface SelectLabelProps {
    labelText: string;
} 

interface OptionProps {
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    paymentTerms: '1' | '7' | '14' | '30';
    $top?: boolean;
    $bottom?: boolean;
}

type handleOpenType = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;

type handleClickOutsideType = (e: MouseEvent) => void;

// component code
const SelectLabel = (props: SelectLabelProps) => {

    const [isOpen, setIsOpen] = useState(false);
    const { newInvoice, handleInvoiceChange } = useGlobalContext();
    const colorTheme = useTheme();

    // list ref to handle outside clicks
    const listRef = useRef<HTMLUListElement | null>(null);
    const openBtnRef = useRef<HTMLButtonElement | null>(null);

    // if click outside & isOpen => close
    useEffect(() => {
        const handleClickOutside: handleClickOutsideType = (e) => {
            const target = e.target as HTMLElement;
            if (isOpen && listRef.current && !listRef.current.contains(target) && !listRef.current.contains(openBtnRef.current)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, []);

    // handle open list click
    const handleOpenListClick: handleOpenType = (e) => {
        e.preventDefault();
        setIsOpen(prevOpen => !prevOpen);
    };

    // handle selectOption click
    const handleSelectOptionClick: OptionProps['handleClick'] = (e) => {
        e.preventDefault();
        handleInvoiceChange(e, 'newInvoice');
        setIsOpen(false);
    };

    return (
        <StyledInputLabelWrapper $minWidth={270}>
            <Label>{props.labelText}</Label>
            <SelectWrapper>
                <Select
                    ref={openBtnRef}
                    as={motion.button}
                    onClick={handleOpenListClick}
                    animate={isOpen ? 'open' : 'closed'}
                    aria-label='Select payment terms'
                    aria-expanded={isOpen}
                    aria-controls='select-list'
                >
                    <SelectText>Net {newInvoice.paymentTerms} Days</SelectText>
                    <Icon 
                        name="arrow-down"
                        size={11}
                        color={colorTheme.general.purple}
                        customStyle={{
                            transform: isOpen ? 'rotate(180deg)' : '',
                            transition: 'transform 250ms ease-in-out'
                        }}
                    />
                </Select>
                <AnimatePresence>
                    {isOpen && (
                        <SelectOptionList
                            ref={listRef}
                            as={motion.ul}
                            id='select-list'
                            initial={false}
                            exit='closed'
                            animate='open'
                            variants={SelectListVariants}
                        >
                            <Option 
                                paymentTerms='1' 
                                handleClick={(e) => handleSelectOptionClick(e)}
                                $top 
                            />
                            <Option 
                                paymentTerms='7' 
                                handleClick={(e) => handleSelectOptionClick(e)} 
                            />
                            <Option 
                                paymentTerms='14' 
                                handleClick={(e) => handleSelectOptionClick(e)} 
                            />
                            <Option 
                                paymentTerms='30' 
                                handleClick={(e) => handleSelectOptionClick(e)} 
                                $bottom
                            />
                        </SelectOptionList>
                    )}
                
                </AnimatePresence>
            </SelectWrapper>
        </StyledInputLabelWrapper>
    )
}


const Option = (props: OptionProps) => {

    return (
        <SelectOption
            $top={props.$top ? true : false}
            $bottom={props.$bottom ? true : false}
            initial={false}
            animate='open'
            exit='closed'
            variants={SelectItemVariants}
        >
            <SelectOptionButton
                $top={props.$top ? true : false}
                $bottom={props.$bottom ? true : false} 
                name='paymentTerms'
                value={props.paymentTerms}
                onClick={props.handleClick}
            >
                Net {props.paymentTerms} days
            </SelectOptionButton>
        </SelectOption>
    )
};

const SelectWrapper = ({ children }: { children: React.ReactNode}) => {
    return (
        <StyledSelectWrapper>{children}</StyledSelectWrapper>
    )
}

export default SelectLabel;