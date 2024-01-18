import { StyledHeader, LogoLink, ThemeButton, AvatarWrapper } from "../styledComponents/HeaderStyled";
import Icon from "../Icon/Icon";
import { useGlobalContext } from "./ContextWrapper";
import { useTheme } from "styled-components";

export default function Header() {

    const {
        theme, toggleTheme
    } = useGlobalContext();

    const colorTheme = useTheme();
    
    // rendering
    return (
        <StyledHeader>
            <LogoLink to='/' />
            <ThemeButton
                onClick={() => toggleTheme()}
            >
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