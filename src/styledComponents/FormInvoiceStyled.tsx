import { styled } from "styled-components";
/* import { createFlexMixin } from "./GlobalStyles";
import FlexMixinInterface from "../interfaces/flexMixin"; */
import rem from "../utilities/pxIntoRem";

export type FieldSetNameType = 'user-address' | 'client-address' | 'date-description' | 'items';

export const MainWrapper = styled.article`
    background-color: ${({theme}) => theme.invoiceBg};
    padding: ${rem(18)};
`

export const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    color: ${({theme}) => theme.general.white};
    margin-bottom: ${rem(20)};
`;

export const Form = styled.form`
`;

export const Legend = styled.legend`
    font-size: ${rem(15)};
    color: ${({theme}) => theme.general.purple};
    margin-bottom: ${rem(15)};
    grid-area: legend;
`;

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
    display: grid;
    grid-template-columns: ${props => props.$name === 'user-address' ? '3' 
        : props.$name === 'client-address' ? '3' 
        : props.$name === 'date-description' ? '2'
        : '4'
    };
    grid-template-rows: ${props => props.$name === 'user-address' ? '3' 
        : props.$name === 'client-address' ? '5' 
        : props.$name === 'date-description' ? '2'
        : '2'
    };
    grid-template-areas: ${props => gridAreaTemplates(props.$name)};
    grid-auto-flow: row;
    grid-auto-rows: auto;
    row-gap: ${rem(15)};
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
    border-radius: ${rem(8)};
    border: ${rem(2)} solid transparent;
    transition: border-color 350ms ease-in;

    &:focus {
        border-color: ${({theme}) => theme.general.purple};
    }
`;

export const InputLabelWrapper = styled.div<{ $gridArea: string }>`
    grid-area: ${props => props.$gridArea};
`;

export const Backdrop = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #1111113d;
`;

