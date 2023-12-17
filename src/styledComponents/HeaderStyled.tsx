import { styled } from "styled-components";
import rem from "../utilities/pxIntoRem";
import logo from '../assets/logo.svg';
import avatar from '../assets/image-avatar.jpg';
import { Link } from "react-router-dom";
import { svgBackgroundMixin } from "./GlobalStyles";

export const StyledHeader = styled.header`
    background-color: ${ ({ theme }) => theme.general.headerBg};
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: clamp(${rem(70)}, 10.5vw, ${rem(80)});
`;

export const LogoLink = styled(Link)`
    background-color: ${ ({ theme }) => theme.general.purple};
    height: 100%;
    width: clamp(${rem(72)}, 10.5vw, ${rem(80)});
    position: relative;
    border-radius: 0 ${rem(20)} ${rem(20)} 0;
    cursor: pointer;

    &::before {
        position: absolute;
        content: '';
        top: 50%;
        left: 0;
        width: 100%;
        height: 50%;
        background: ${ ({ theme }) => theme.general.purpleLight};
        border-radius: ${rem(38)} 0 ${rem(20)} 0;
    }

    &::after {
        ${svgBackgroundMixin(logo)};
    }
`;

export const ThemeButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: clamp(${rem(70)}, 12vw, ${rem(150)});
    margin-left: auto;
    background-color: inherit;
    border: none;
    cursor: pointer;

    &:hover svg {
        color: ${ ({theme}) => theme.general.white};
        transition: color 300ms ease-in;
    }
`;

export const AvatarWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-left: 1px solid ${ ({ theme }) => theme.general.gray};
    height: 100%;
    width: clamp(${rem(85)}, 10.5vw, ${rem(150)});
    position: relative;

    &::before {
        ${svgBackgroundMixin(avatar, 'center', true, true)};
    }
`;