import { styled, useTheme } from "styled-components";
import { Link } from "react-router-dom";
import rem from "../utilities/pxIntoRem";
import Icon from "../Icon/Icon";
import { useGlobalContext } from "../components/ContextWrapper";

interface goBackLinkInterface {
    to: string;
}

export const GoBackLinkWrapper = styled(Link)`
    font-size: ${rem(16)};
    font-weight: 500;
    color: ${({theme}) => theme.textColor};
    display: block;
    width: max-content;
    margin-block: ${rem(20)};
    border: 2px solid transparent;
    border-radius: ${rem(15)};
    padding: 0.5rem;
    transition: border-color 250ms ease-in-out;

    &:hover {
        border: 2px solid ${({theme}) => theme.general.purple};
    }
`;

export const GoBackLinkText = styled.span`
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