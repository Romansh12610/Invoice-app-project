import { StyledHeader, LogoLink, LogoImg,ThemeButton, AvatarWrapper } from "../styledComponents/HeaderStyled";
import Icon from "../Icon/Icon";
import { useGlobalContext } from '../hooks/useGlobalContext';
import { useTheme } from "styled-components";
import logo from '../assets/logo.svg';

export default function Header() {

    const {
        theme, toggleTheme
    } = useGlobalContext();

    const colorTheme = useTheme();
    
    // rendering
    return (
        <StyledHeader>
            <LogoLink to='/'>
                <LogoImg src={logo} />
            </LogoLink>
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