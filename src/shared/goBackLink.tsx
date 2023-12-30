import { styled, useTheme, css } from "styled-components";
import { Link } from "react-router-dom";
import rem from "../utilities/pxIntoRem";
import Icon from "../Icon/Icon";
import { useGlobalContext } from "../components/ContextWrapper";

interface goBackLinkInterface {
    to: string;
}

const linkHoverState = css`
    border: ${rem(2)} solid ${({theme}) => theme.backLinkHover};
    box-shadow: 0 0 ${rem(3)} ${rem(3)} ${({theme}) => theme.backLinkHover};
`;

export const GoBackLinkWrapper = styled(Link)`
    display: block;
    width: max-content;
    margin-block: ${rem(20)};
    border: 2px solid transparent;
    border-radius: ${rem(15)};
    padding: 0.5rem;
    transition: border-color 200ms ease-in-out, box-shadow 200ms ease-in-out;

    &:hover {
        ${linkHoverState};
    }
`;

export const GoBackLinkText = styled.span`
    font-size: ${rem(18)};
    font-weight: 500;
    color: ${({theme}) => theme.textColor};
    padding-left: ${rem(10)};
`;

const GoBackLink = (props: goBackLinkInterface) => {

    const colorTheme = useTheme();
    const { globalState, dispatchAction } = useGlobalContext();
    const { isFormOpen } = globalState;

    return (
        <GoBackLinkWrapper to={props.to}
            onClick={() => {
                if (isFormOpen) {
                    dispatchAction({ type: 'closeForm' });
                } 
            }}
        >
            <Icon 
                name='arrow-left'
                size={11}
                color={colorTheme.general.purple}
            />
            <GoBackLinkText>Go back</GoBackLinkText>
        </GoBackLinkWrapper>
    );
}

export default GoBackLink;