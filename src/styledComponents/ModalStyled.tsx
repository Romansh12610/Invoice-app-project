import { styled } from "styled-components";
import { transitionMixin } from "./GlobalStyles";
import rem from "../utilities/pxIntoRem";
import { motion } from "framer-motion";
import ButtonDefault from "../shared/buttons";

export const StyledWrapper = styled(motion.div)`
    ${transitionMixin};
    background-color: ${({theme}) => theme.modalBg};
    padding: ${rem(30)};
    width: clamp(${rem(150)}, 30vw, ${rem(600)});
    height: auto;
    border-radius: ${rem(20)};

    // layout
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    justify-content: center;

    // position
    position: fixed;
    left: calc(50% - 15vw);
    top: calc(50% - ${rem(100)});

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
    margin-top: ${rem(20)};
`;

export const BtnWrapper = styled.div`
    align-self: flex-end;
    margin-top: ${rem(25)};

    // own flex
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5vw;
`;

// btns
export const CancelBtn = styled(ButtonDefault)`
    background-color: ${({theme}) => theme.general.cancelBtn};
    color: ${({theme}) => theme.textColor};

    &:hover {
        background-color: ${({theme}) => theme.general.cancelBtnHover};
    }
`;

// types of btn;
export type TypesOfBtns = 'DELETE' | 'CHANGE_STATUS' | 'SAVE_CHANGES';

export const ActionBtn = styled(ButtonDefault)<{ $type: TypesOfBtns }>`
    background-color: ${({theme, $type}) => $type === 'DELETE' 
                        ? theme.general.deleteBtnBg 
                        : theme.addBtnBg};
    color: ${({theme}) => theme.textColor};

    &:hover {
        background-color:  ${({theme, $type}) => $type === 'DELETE' 
                        ? theme.general.deleteBtnHover 
                        : theme.addBtnHover};
    };
`;