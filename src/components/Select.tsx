import { Select, SelectText, SelectOptionList, SelectOption, SelectOptionButton, Label, StyledInputLabelWrapper, StyledSelectWrapper, SelectOptionText } from '../styledComponents/FormInvoiceStyled';
import { useGlobalContext } from './ContextWrapper';
import Icon from '../Icon/Icon';
import { useTheme } from 'styled-components';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { SelectItemVariants, SelectListVariants } from '../utilities/selectVariants';

// types
interface SelectWrapperProps {
    children: React.ReactNode;
}

interface SelectLabelProps {
    labelText: string;
} 

interface OptionProps {
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    paymentTerms: 1 | 7 | 14 | 30;
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
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    // if click outside & isOpen => close
    useEffect(() => {
        const handleClickOutside: handleClickOutsideType = (e) => {
            const target = e.target as HTMLElement;          
            if (dropdownRef.current && !dropdownRef.current.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside, true);

        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        }
    }, []);

    // handle open list click
    const handleOpenListClick: handleOpenType = (e) => {
        e.preventDefault();
        if (!isOpen) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
            e.currentTarget.blur();
        }
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
            <SelectWrapper ref={dropdownRef}>
                <Select
                    onClick={handleOpenListClick}
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
                <SelectOptionList
                    as={motion.ul}
                    id='select-list'
                    initial={false}
                    animate={isOpen ? 'open' : 'closed'}
                    variants={SelectListVariants}
                >
                    <Option 
                        paymentTerms={1} 
                        handleClick={(e) => handleSelectOptionClick(e)}
                        $top 
                    />
                    <Option 
                        paymentTerms={7}
                        handleClick={(e) => handleSelectOptionClick(e)} 
                    />
                    <Option 
                        paymentTerms={14} 
                        handleClick={(e) => handleSelectOptionClick(e)} 
                    />
                    <Option 
                        paymentTerms={30} 
                        handleClick={(e) => handleSelectOptionClick(e)} 
                        $bottom
                    />
                </SelectOptionList>
            </SelectWrapper>
        </StyledInputLabelWrapper>
    )
}


const Option = (props: OptionProps) => {

    return (
        <SelectOption
            $top={props.$top ? true : false}
            $bottom={props.$bottom ? true : false}
            variants={SelectItemVariants}
        >
            <SelectOptionButton
                $top={props.$top ? true : false}
                $bottom={props.$bottom ? true : false} 
                name='paymentTerms'
                value={props.paymentTerms}
                onClick={props.handleClick}
            >
                <SelectOptionText>
                    Net {props.paymentTerms} days
                </SelectOptionText>
            </SelectOptionButton>
        </SelectOption>
    )
};

const SelectWrapper = forwardRef<HTMLDivElement, SelectWrapperProps>(({ children }, ref) => {
    return (
        <StyledSelectWrapper
            ref={ref}
        >{children}</StyledSelectWrapper>
    )
});

export default SelectLabel;