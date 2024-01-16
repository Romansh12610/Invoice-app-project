import { styled } from "styled-components";
import { transitionMixin } from "./GlobalStyles";
import rem from "../utilities/pxIntoRem";
import { motion } from "framer-motion";
import ButtonDefault from "../shared/buttons";

export const StyledWrapper = styled(motion.div)`
    ${transitionMixin};
    background-color: ${({theme}) => theme.modalBg};
    padding: ${rem(30)};

    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: center;

    &:hover {
        background-color: ${({theme}) => theme.modalBgHover};
    }
` ;

export const TitleText = styled.h3`
    color: ${({theme}) => theme.textColor};
    font-size: ${rem(30)};
    letter-spacing: ${rem(-0.5)};
    margin-top: ${rem(10)};
`;

export const ParText = styled.p`
    color: ${({theme}) => theme.textColor};
    font-size: ${rem(16)};
`;

export const BtnWrapper = styled.div`
    align-self: flex-end;
`;

// btns
export const CancelBtn = styled(ButtonDefault)`
    background-color: ${({theme}) => theme.discardBtn};

    &:hover {
        background-color: ${({theme}) => theme.discardBtnHover};
    }
`;

// types of btn;
export type TypesOfBtns = 'DELETE' | 'CHANGE_STATUS' | 'SAVE_CHANGES';

export const ActionBtn = styled(ButtonDefault)<{ $type: TypesOfBtns }>`
    background-color: ${({theme, $type}) => $type === 'DELETE' 
                        ? theme.deleteBtnBg 
                        : theme.addBtnBg};

    &:hover {
        background-color:  ${({theme, $type}) => $type === 'DELETE' 
                        ? theme.deleteBtnHover 
                        : theme.addBtnHover};
    };
`;