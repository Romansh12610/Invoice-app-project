import { styled } from "styled-components";
import rem from "../../utilities/pxIntoRem";
import { Link } from "react-router-dom";
// mixins
import { btnDefaultStylesMixin } from "../../shared/buttons";
import { transitionMixin } from "../../styledComponents/GlobalStyles";

// styled comps
const WrapperStyled = styled.div`
    width: max(20vw, ${rem(200)});
    height: ${rem(150)};
    padding: ${rem(25)};
    border-radius: ${rem(20)};
    background-color: ${({theme}) => theme.modalBg};
    ${transitionMixin};

    // position
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    // display
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    gap: ${rem(15)};

    &:hover {
        background-color: ${({theme}) => theme.modalBgHover};
    }
`;

const TitleText = styled.h3`
    font-size: ${rem(24)};
    letter-spacing: ${rem(2)};
    line-height: 1.2;
    color: ${props => props.theme.textColor};
    text-align: center;
`;

const ConfirmBtn = styled(Link)`
    ${btnDefaultStylesMixin};
    background-color: ${props => props.theme.general.confirmBtnBg};
    color: ${props => props.theme.textColor};
    transition: all 150ms ease-in-out;

    &:hover, &:focus {
        background-color: ${props => props.theme.general.confirmBtnHover};
        transform: scale(1.1);
    };

    &:active {
        transform: scale(0.9);
    };
`;

const ConfirmDeletion = () => {

    return (
        <WrapperStyled>
            <TitleText>Invoice was successfully deleted!</TitleText>
            <ConfirmBtn 
                to='/'
            >Confirm</ConfirmBtn>
        </WrapperStyled>
    )
};


export default ConfirmDeletion;