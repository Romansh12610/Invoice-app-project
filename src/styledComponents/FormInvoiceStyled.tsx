import { styled, css } from "styled-components";
import rem from "../utilities/pxIntoRem";
import { motion } from "framer-motion";

export type FieldSetNameType = 'userAddress' | 'clientAddress' | 'dateDescription';

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
`

export const Backdrop = styled(motion.div)`
    position: fixed;
    top: clamp(${rem(70)}, 10.5vw, ${rem(80)});
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #0000005e;
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
    ${customScrollBar};
    overflow-y: scroll;
    display: flex;
    flex-flow: nowrap column;
    height: 80%;
`;

export const Legend = styled.legend`
    font-size: ${rem(18)};
    font-weight: bold;
    color: ${({theme}) => theme.general.purple};
    grid-area: legend;
    margin-block: ${rem(20)};
`;

export const FieldSet = styled.fieldset<{ $name: FieldSetNameType }>`
    display: flex;
    flex-flow: column nowrap;
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
    color: ${({theme}) => theme.textColor};
`;

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

export const Input = styled.input`
    ${defaultInput};
`;

export const StyledInputLabelWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;
    gap: ${rem(10)};
    // flex-child props
    flex: 1;
    min-width: ${rem(140)};
`;

export const StyledFlexWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: ${rem(15)};
`;