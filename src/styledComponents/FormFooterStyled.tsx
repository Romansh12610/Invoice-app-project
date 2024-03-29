import { styled } from "styled-components";
import rem from "../utilities/pxIntoRem";
import ButtonDefault from "../shared/buttons";
import { transitionMixin } from "./GlobalStyles";

export const FooterWrapper = styled.div`
    height: ${rem(80)};
    padding: ${rem(16)};
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-around;
    
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    border-top: 4px solid ${props => props.theme.footerBorder};
    padding-top: ${rem(20)};
    background-color: ${({theme}) => theme.footerBg};
`;

export const DiscardBtn = styled(ButtonDefault)`
    ${transitionMixin};
    background-color: ${({theme}) => theme.discardBtn};
    color: ${({theme}) => theme.general.white};

    &:hover, &:focus {
        background-color: ${({theme}) => theme.discardBtnHover};
    };
`;


export const SaveDraftBtn = styled(ButtonDefault)`
    ${transitionMixin};
    background-color: ${({theme}) => theme.general.saveDraftBtn};
    color: ${({theme}) => theme.general.white};

    &:hover, &:focus {
        background-color: ${({theme}) => theme.general.saveDraftBtnHover};
    }
`;


export const SaveSendBtn = styled(ButtonDefault)`
    ${transitionMixin};
    background-color: ${({theme}) => theme.general.saveSendBtn};
    color: ${({theme}) => theme.general.white};

    &:hover, &:focus {
        background-color: ${({theme}) => theme.general.saveSendBtnHover};
    }
`;