import { styled } from "styled-components";
import rem from "../utilities/pxIntoRem";
import { motion } from "framer-motion";

export type FieldSetNameType = 'user-address' | 'client-address' | 'date-description';

export const Backdrop = styled(motion.div)`
    position: fixed;
    top: clamp(${rem(70)}, 10.5vw, ${rem(80)});
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #00000076;
    z-index: 98;
`;

export const MainWrapper = styled(motion.div)`
    background-color: ${({theme}) => theme.formBg};
    padding: ${rem(22)};
    position: fixed;
    top: clamp(${rem(70)}, 10.5vw, ${rem(80)});
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 99;
    transition: background-color 300ms ease-in-out;

    @media (min-width: 768px) {
        right: 40svw;
    }
`;

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({theme}) => theme.textColor};
    margin-bottom: ${rem(20)};
    transition: color 300ms ease-in-out;
`;

export const Form = styled.form`
    overflow-y: scroll;
    display: flex;
    flex-flow: nowrap column;
`;

export const Legend = styled.legend`
    font-size: ${rem(15)};
    color: ${({theme}) => theme.general.purple};
    grid-area: legend;
`;

// helpers
const gridAreaTemplates = (name: FieldSetNameType) => {
    switch (name){
        case 'user-address': {
        return  `'legend legend legend'
                'street street street'
                'city postCode country'`
        }
        case 'client-address': {
        return `'legend legend legend'
                'name name name'
                'email email email'
                'street street street'
                'city postCode country'`
        }
        case 'date-description': {
        return `'date period'
                'description description`
        }
    }
};

export const FieldSet = styled.fieldset<{ $name: FieldSetNameType }>`
    display: grid; // mb do mapping here
    grid-template-columns: repeat(${props => props.$name === 'user-address' ? '3' 
        : props.$name === 'client-address' ? '3' 
        : props.$name === 'date-description' ? '2'
        : '4'}, 31%);
    ;
    grid-template-areas: ${props => gridAreaTemplates(props.$name)};
    grid-auto-flow: row;
    grid-auto-rows: auto;
    row-gap: ${rem(15)};
    column-gap: ${rem(25)};
    justify-content: start;
    flex-direction: column;
    width: 90%;
`;

export const ItemsFieldSet = styled.fieldset`
    display: flex;
    justify-content: flex-start;
    gap: ${rem(15)};
`;

export const Label = styled.label`
    font-size: ${rem(15)};
    color: ${({theme}) => theme.textColorSecondary};
`;

export const Input = styled.input`
    background-color: ${({theme}) => theme.invoiceBg};
    border-radius: ${rem(5)};
    border: ${rem(2)} solid transparent;
    transition: border-color 300ms ease-in;
    color: ${({theme}) => theme.textColor};
    padding: ${rem(10)};

    &:focus {
        border-color: ${({theme}) => theme.general.purple};
    }
`;

export const StyledInputLabelWrapper = styled.div<{ $gridArea: string }>`
    grid-area: ${props => props.$gridArea};
    display: flex;
    flex-flow: column nowrap;
    gap: ${rem(10)};
`;