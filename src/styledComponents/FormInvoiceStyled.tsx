import { styled, css } from "styled-components";
import rem from "../utilities/pxIntoRem";
import { motion } from "framer-motion";

// types

interface OptionProps {
    $top?: boolean,
    $bottom?: boolean,
}

// helpers

export const defaultInput = css`
    border-radius: ${rem(5)};
    line-height: 1.2;
    font-size: ${rem(20)};
    font-weight: 500;
    letter-spacing: ${rem(1)};
    padding: ${rem(15)};
    height: ${rem(25)};
    background-color: ${({theme}) => theme.invoiceBg};
    border: ${rem(2)} solid ${({theme}) => theme.inputBorder};
    transition: border-color 300ms ease-in;
    color: ${({theme}) => theme.textColor};
    
    &:focus {
        border-color: ${({theme}) => theme.general.purple};
    }
`;

const useTopOption = css`
    border-top-left-radius: ${rem(12)};
    border-top-right-radius: ${rem(12)};
    border-top-width: ${rem(2)};
`;

const useBottomOption = css`
    border-bottom-left-radius: ${rem(12)};
    border-bottom-right-radius: ${rem(12)};
    border-bottom-width: ${rem(2)};
`;

const customScrollBar = css`
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.general.purpleLight} transparent;

    &::-webkit-scrollbar {
        width: ${rem(8)};
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.general.purpleLight};
        border-radius: ${rem(20)};
    }
`;

// styles

export const MainWrapper = styled(motion.div)`
    background-color: ${({theme}) => theme.formBg};
    padding: ${rem(22)};
    position: fixed;
    top: clamp(${rem(70)}, 10.5vw, ${rem(80)});
    bottom: 0;
    left: 0;
    z-index: 99;
    transition: background-color 300ms ease-in-out;
    width: 90vw;
    transform: translateX(-100vw);

    @media (min-width: 768px) {
        width: ${rem(800)};
    }
`;

export const TopWrapper = styled.div`
    height: 12vh;
    padding-left: 5vw;
    z-index: 100;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    transition: background-color 200ms ease-in-out;
    background-color: ${({theme}) => theme.selectTopWrapperBg};
    padding-bottom: ${rem(15)};
`;

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({theme}) => theme.textColor};
    transition: color 300ms ease-in-out;
`;

export const StyledForm = styled.form`
    ${customScrollBar};
    overflow-y: scroll;
    display: flex;
    flex-flow: nowrap column;
    height: 70%;
    width: 100%;
    margin-top: calc(12vh - 5px);
`;

export const Legend = styled.legend<{ $items?: true }>`
    font-size: ${({$items}) => $items ? rem(26) : rem(18)};
    font-weight: bold;
    color: ${({theme, $items}) => $items ? theme.selectItemListText : theme.general.purple};
    grid-area: legend;
    margin-block: ${rem(20)};
    letter-spacing: ${({$items}) => $items ? '1px' : 'auto'};
`;

export const FieldSet = styled.fieldset`
    display: flex;
    flex-flow: column nowrap;
    width: 95%;
    gap: ${rem(15)};
`;

export const ItemsFieldSet = styled.fieldset`
    display: flex;
    gap: ${rem(15)};
`;

export const Label = styled.label`
    font-size: ${rem(18)};
    letter-spacing: ${rem(0.5)};
    font-weight: 500;
    color: ${({theme}) => theme.textColorSecondary};
    // for error correct displaying
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
`;

export const Input = styled.input<{ $total?: true, $showError?: boolean }>`
    ${defaultInput};
    background-color: ${({$total, theme}) => $total ? 'inherit' : theme.invoiceBg};

    border-color: ${({$showError, theme}) => $showError ? theme.general.error : theme.inputBorder};
`;


// select
export const Select = styled.button`
    ${defaultInput};
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
`;

export const SelectText = styled.p`
    font-weight: 500;
    font-size: ${rem(20)};
`;

export const SelectOptionList = styled(motion.ul)`
    list-style: none;
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    top: 110%;
    left: 0;
    right: 0;
    padding: 0;
    background-color: ${props => props.theme.selectOptionBg};
`;

export const SelectOption = styled(motion.li)< OptionProps >`
    border: ${rem(2)} solid ${({theme}) => theme.selectOptBorder};
    border-bottom-width: ${rem(1)};
    border-top-width: ${rem(1)};
    ${props => props.$top ? useTopOption : props.$bottom ? useBottomOption : ''};
`;

export const SelectOptionButton = styled.button< OptionProps >`
    padding: 0.5rem;
    transition: background-color 300ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    ${props => props.$top ? useTopOption : props.$bottom ? useBottomOption : ''};
    background-color: inherit;

    &:hover, &:focus {
       background-color: ${({theme}) => theme.selectOptHover};
    };

    &:hover p, &:focus p {
        transform: scale(1.15);
        font-weight: bold;
    }
`;

export const SelectOptionText = styled.p`
    font-size: ${rem(18)};
    font-weight: 500;
    letter-spacing: 1.5px;
    color: ${({theme}) => theme.textColor};
    transition: all 300ms ease-in-out;
`;

// items

export const ItemsAddButton = styled.button`
    width: max(50%, ${rem(200)});
    align-self: center;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    border-radius: ${rem(15)};
    background-color: ${({theme}) => theme.addBtnBg};
    flex: 1 1 auto;
    height: ${rem(50)};
    transition: all 300ms ease-in-out;

    & > p {
        color: ${({theme}) => theme.textColor};
        font-weight: bold;
        font-size: ${rem(18)};
        letter-spacing: 0.5px;
    }

    &:hover {
        background-color: ${({theme}) => theme.addBtnHover};
    }

    &:active {
        transform: scale(0.9);
    }
`;

export const TotalValue = styled.p`
    line-height: 1.2;
    font-size: ${rem(20)};
    font-weight: 500;
    letter-spacing: ${rem(1)};
    padding: ${rem(15)};
    height: ${rem(25)};
    border: ${rem(2)} solid ${({theme}) => theme.inputBorder};
    border-radius: ${rem(5)};
`;

export const RemoveButton = styled.button`
    height: ${rem(25)};
    background-color: inherit;
    align-self: center;
    padding-top: ${rem(15)};
    flex: 0.5 1 auto;
    min-width: ${rem(50)};
`;

// wrappers
export const StyledInputLabelWrapper = styled.div<{ $minWidth: number }>`
    display: flex;
    flex-flow: column nowrap;
    gap: ${rem(10)};
    // flex-child props
    flex: 1;
    min-width: ${({ $minWidth }) => rem($minWidth)};
`;

export const StyledSelectWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
`;

export const StyledFlexWrapper = styled.div<{ $col?: boolean }>`
    display: flex;
    flex-flow: ${(props) => props.$col ? 'column nowrap' : 'row wrap'};
    align-items: ${(props) => props.$col ? 'stretch' : 'start'};
    justify-content: center;
    gap: ${rem(15)};
    flex: 1 1 auto;
`;

// error styled
export const StyledError = styled.span`
    color: ${({theme}) => theme.general.error};
    font-size: ${rem(14)};
`;