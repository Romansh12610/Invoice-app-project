import { StyledHeader, LogoLink, ThemeButton, AvatarWrapper } from "../styledComponents/HeaderStyled";
import Icon from "../Icon/Icon";
import { useGlobalContext } from "./ContextWrapper";
import { useTheme } from "styled-components";

export default function Header() {

    const {
        theme,
    } = useGlobalContext();

    const colorTheme = useTheme();

    return (
        <StyledHeader>
            <LogoLink to='/' />
            <ThemeButton>
                <Icon 
                    name={theme === 'light' ? 'moon' : 'sun'}
                    size={20}
                    color={colorTheme.general.iconColor}
                />
            </ThemeButton>
            <AvatarWrapper />
        </StyledHeader>
    )
}